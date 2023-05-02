import React, { useState, useEffect, useMemo } from "react";
import { Radio, RadioChangeEvent, Typography, Form, Space, message, Breadcrumb, Divider, Row, Col, Button, List, Modal } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import './record.css';
import WinningForm from "./WinningForm";
import SelfDrawnForm from "./SelfDrawnForm";
import DrawForm from "./DrawForm";
import FakeForm from "./FakeForm";
import { useNavigate } from "react-router-dom";
import PlayerList from "./PlayerList";
import { EEndType, ERoundStatus } from "../enum";
import { OEndType } from "../option";
import { windLabelMap } from "../enumMap";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { fetchRound, selectCurrentRound } from "redux/mahjong";
import { IPostRecord, deleteLastRecord, postRecord, postResetCurrentRound } from "apis/mahjong";
import { IAddRecord } from "pages/interface";

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

//TODO 整理前後端API格式，應該不需要送風圈風局和連莊，已經在後端計算
//TODO 切換endtype時可能要重置選項
const Record: React.FC = () => {
    const [form] = Form.useForm();
    const [endType, setEndType] = useState<EEndType>(EEndType.WINNING);
    const [recordSubmitDisabled, setRecordSubmitDisabled] = useState<boolean>(true);
    const [isDeleteLastRecordModalOpen, setIsDeleteLastRecordModalOpen] = useState(false);
    const [isResetCurrentRoundModalOpen, setIsResetCurrentRoundModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentRound = useAppSelector(selectCurrentRound);
    const { status, round, circle, dealer, dealerCount, players, records } = currentRound;

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

    const renderPlayerList = useMemo(() => {
        return (
            <PlayerList
                currentRound={currentRound}
            />
        )
    }, [currentRound]);

    const recordsListDatas = records.map((record, index) => {
        const { circle, dealer, dealerCount, winner, losers, endType, point } = record;
        let item = `${index + 1}. ${windLabelMap[circle]}風${windLabelMap[dealer]}局:連莊${dealerCount};`;
        switch (endType) {
            case EEndType.WINNING: {
                item += `${winner}胡${losers[0]}${point}台`;
                break;
            }
            case EEndType.SELF_DRAWN: {
                item += `${winner}自摸${point}台`;
                break;
            }
            case EEndType.DRAW: {
                item += `流局`;
                break;
            }
            case EEndType.FAKE: {
                break;
            }
        };
        return item;
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
                    <Text>
                        連莊:{isRoundEmpty(status) ? 0 : dealerCount}
                    </Text>
                    <Text>
                        局數:{isRoundEmpty(status) ? 0 : records.length}
                    </Text>
                    <Text>
                        流局數:{isRoundEmpty(status) ? 0 : players.east.draw}
                    </Text>
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
                            title='刪除Record'
                            open={isDeleteLastRecordModalOpen}
                            onOk={onDeleteLastRecordModalOk}
                            onCancel={onDeleteLastRecordModalCancel}
                        >
                            <p>確定要刪除以下Record嗎?</p>
                            <p>{recordsListDatas[0]}</p>
                        </Modal>
                    </>
                }
                {status === ERoundStatus.END &&
                    <>
                        <Button type='primary' onClick={showResetCurrentRoundModal}>
                            重置Round
                        </Button>
                        <Modal
                            title='重置Round'
                            open={isResetCurrentRoundModalOpen}
                            onOk={onResetCurrentRoundModalOk}
                            onCancel={onResetCurrentRoundModalCancel}
                        >
                            確定要重置嗎?
                        </Modal>
                    </>
                }
            </Space>
            <List
                size='small'
                dataSource={recordsListDatas}
                bordered
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </>
    )
};

export default Record;