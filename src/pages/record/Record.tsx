import React, { useState, useEffect, useMemo } from "react";
import { Radio, RadioChangeEvent, Typography, Form, Space, message, Breadcrumb, Divider, Row, Col, Button, List, Modal, Tag } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import './record.css';
import WinningForm from "./WinningForm";
import SelfDrawnForm from "./SelfDrawnForm";
import DrawForm from "./DrawForm";
import FakeForm from "./FakeForm";
import { useNavigate } from "react-router-dom";
import PlayerList from "./PlayerList";
import RecordList from "./RecordList";
import { EEndType, ERoundStatus } from "../enum";
import { OEndType } from "../option";
import { windLabelMap } from "../enumMap";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { fetchRound, selectCurrentRound } from "redux/mahjong";
import { IPostRecord, deleteLastRecord, postRecord, postResetCurrentRound } from "apis/mahjong";

const { Text } = Typography;

const breadcrumbItems: ItemType[] = [
    {
        title: '局'
    },
    {
        title: '新增局'
    }
];

interface IRecordForm {
    endType: EEndType;
    winner: string;
    losers: string;
    point: string;
};

const Record: React.FC = () => {
    const [form] = Form.useForm();
    const [endType, setEndType] = useState<EEndType>(EEndType.WINNING);
    const [recordSubmitDisabled, setRecordSubmitDisabled] = useState<boolean>(true);
    const [isDeleteLastRecordModalOpen, setIsDeleteLastRecordModalOpen] = useState<boolean>(false);
    const [isResetCurrentRoundModalOpen, setIsResetCurrentRoundModalOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentRound = useAppSelector(selectCurrentRound);
    const { status, round, circle, dealer, dealerCount, players, records, venue } = currentRound;

    const isRoundEmpty = (status: ERoundStatus) => {
        return status === ERoundStatus.EMPTY;
    };

    const renderForm = () => {
        return (
            <>
                {<>
                    {endType === EEndType.WINNING && <WinningForm players={players} submitDisabled={recordSubmitDisabled} />}
                    {endType === EEndType.SELF_DRAWN && <SelfDrawnForm players={players} submitDisabled={recordSubmitDisabled} />}
                    {endType === EEndType.DRAW && <DrawForm />}
                    {endType === EEndType.FAKE && <FakeForm />}
                </>}
            </>
        )
    };

    const renderVenue = venue.map((record, index) => {
        const { winner } = record;
        return (
            <Tag key={`venueTag_${index}`} color='blue'>
                {index + 1}. {winner}
            </Tag>
        )
    });

    const renderPlayerList = useMemo(() => {
        return (
            <PlayerList
                currentRound={currentRound}
            />
        )
    }, [currentRound]);

    const recordsListDatas = records.map((record, index) => {
        const { circle, dealer, dealerCount, winner, losers, endType, point } = record;
        const winnerNode = <Tag color='cyan'>{winner}</Tag>;
        const loserNode = <Tag color='red'>{losers}</Tag>
        const pointNode = <Tag color='magenta'>{point}台</Tag>
        let event: React.ReactNode;
        switch (endType) {
            case EEndType.WINNING: {
                event = <>{winnerNode}<Tag color='orange'>胡</Tag>{loserNode}{pointNode}</>;
                break;
            }
            case EEndType.SELF_DRAWN: {
                event = <>{winnerNode}<Tag color='purple'>自摸</Tag>{pointNode}</>;
                break;
            }
            case EEndType.DRAW: {
                event = <Tag color='yellow'>流局</Tag>
                break;
            }
            case EEndType.FAKE: {
                break;
            }
        };
        return (
            <List.Item style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {index + 1}
                <Divider type='vertical' />
                <Tag color='blue'>{windLabelMap[circle]}風{windLabelMap[dealer]}局</Tag>
                <Tag color='purple'>連{dealerCount}</Tag>
                {event}
            </List.Item>
        );
    });

    const showDeleteLastRecordModal = () => {
        setIsDeleteLastRecordModalOpen(true);
    };

    const onDeleteLastRecordModalOk = async () => {
        setIsDeleteLastRecordModalOpen(false);
        await deleteLastRecord(round.uid);
        dispatch(fetchRound());
        setRecordSubmitDisabled(true);
    };

    const onDeleteLastRecordModalCancel = () => {
        setIsDeleteLastRecordModalOpen(false);
    };

    const showResetCurrentRoundModal = () => {
        setIsResetCurrentRoundModalOpen(true);
    };

    const onResetCurrentRoundModalOk = async () => {
        setIsResetCurrentRoundModalOpen(false);
        await postResetCurrentRound();
    };

    const onResetCurrentRoundModalCancel = () => {
        setIsResetCurrentRoundModalOpen(false);
    };

    const onEndTypeChange = (e: RadioChangeEvent) => {
        setEndType(e.target.value);
        form.resetFields();
    };

    const onCheckForm = () => {
        switch (endType) {
            case EEndType.WINNING: {
                const values = form.getFieldsValue(['winner', 'losers', 'point']);
                const allFieldsHaveValue = Object.values(values).every(value => !!value);
                setRecordSubmitDisabled(!allFieldsHaveValue);
                break;
            }
            case EEndType.SELF_DRAWN: {
                const values = form.getFieldsValue(['winner', 'point']);
                const allFieldsHaveValue = Object.values(values).every(value => !!value);
                setRecordSubmitDisabled(!allFieldsHaveValue);
                break;
            }
            case EEndType.DRAW: {
                break;
            }
            case EEndType.FAKE: {
                break;
            }
        };
    };

    const onSubmit = async (value: IRecordForm) => {
        value.endType = endType;
        const transformedValue: IPostRecord = {
            ...value,
            losers: [value.losers],
            point: parseInt(value.point)
        };
        if (endType === EEndType.WINNING) {
            transformedValue.losers = [value.losers];
        }
        if (endType === EEndType.SELF_DRAWN) {
            transformedValue.losers = Object.values(players).filter(player => player.name !== value.winner).map(item => item.name)
        };
        if (endType === EEndType.DRAW) {
            transformedValue.winner = '';
            transformedValue.losers = [];
        };
        await postRecord(round.uid, transformedValue)
            .then(res => {
                message.success(`新增Record成功`);
                dispatch(fetchRound());
            })
            .catch(err => {
                console.error(err);
            });
        setEndType(EEndType.WINNING);
        form.resetFields();
    };

    useEffect(() => {
        dispatch(fetchRound())
            .then(async res => {
                const { status } = res.payload;
                if (status === ERoundStatus.EMPTY) {
                    navigate('/round');
                };

            })
    }, [dispatch, navigate]);

    return (
        <>
            <Row className='record'>
                <Col span={6}>
                    <Breadcrumb items={breadcrumbItems} />
                </Col>
                <Col className='info' span={18}>
                    <Text className='title' style={{ fontSize: '24px' }}>
                        {`${windLabelMap[circle]}風${windLabelMap[dealer]}局`}
                    </Text>
                    <Divider type='vertical' />
                    <Space>
                        <Text>
                            連莊:{isRoundEmpty(status) ? 0 : dealerCount}
                        </Text>
                        <Text>
                            局數:{isRoundEmpty(status) ? 0 : records.length}
                        </Text>
                        <Text>
                            流局數:{isRoundEmpty(status) ? 0 : players.east.draw}
                        </Text>
                    </Space>
                </Col>

                <Col span={24}>
                    繳東:{renderVenue}
                </Col>

                <Col span={24}>
                    {!isRoundEmpty(status) && renderPlayerList}
                </Col>
            </Row>

            {status === ERoundStatus.IN_PROGRESS &&
                <>
                    <Space className='endType-list'>
                        <Radio.Group
                            onChange={onEndTypeChange}
                            value={endType}
                            options={OEndType}
                            defaultValue={EEndType.WINNING}
                        />
                    </Space>
                    <Form
                        form={form}
                        className='record-form'
                        onFinish={onSubmit}
                        onFieldsChange={onCheckForm}
                    >
                        <Space
                            direction='vertical'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            {!isRoundEmpty(status) && renderForm()}
                        </Space>
                    </Form>
                </>
            }

            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                    status !== ERoundStatus.EMPTY && records.length > 0 &&
                    <>
                        <Button type='primary' danger onClick={showDeleteLastRecordModal}>
                            刪除上一筆
                        </Button>
                        <Modal
                            title='刪除紀錄'
                            open={isDeleteLastRecordModalOpen}
                            onOk={onDeleteLastRecordModalOk}
                            onCancel={onDeleteLastRecordModalCancel}
                        >
                            <div>確定要刪除以下紀錄嗎?</div>
                            <div>{recordsListDatas[recordsListDatas.length - 1]}</div>
                        </Modal>
                    </>
                }
                {status === ERoundStatus.END &&
                    <>
                        <Button type='primary' onClick={showResetCurrentRoundModal}>
                            儲存並重置
                        </Button>
                        <Modal
                            title='儲存並重置'
                            open={isResetCurrentRoundModalOpen}
                            onOk={onResetCurrentRoundModalOk}
                            onCancel={onResetCurrentRoundModalCancel}
                        >
                            確定要儲存並重置嗎?
                        </Modal>
                    </>
                }
            </Space>
            <RecordList recordsListDatas={recordsListDatas} />
        </>
    )
};

export default Record;