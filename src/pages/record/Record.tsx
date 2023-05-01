import React, { useState, useEffect, useMemo } from "react";
import { Radio, RadioChangeEvent, Typography, Form, Space, message, Breadcrumb, Divider, Row, Col } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import './record.css';
import WinningForm from "./WinningForm";
import SelfDrawnForm from "./SelfDrawnForm";
import DrawForm from "./DrawForm";
import FakeForm from "./FakeForm";
import { useNavigate } from "react-router-dom";
import PlayerList from "./PlayerList";
import { EEndType } from "../enum";
import { OEndType } from "../option";
import { windLabelMap } from "../enumMap";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { fetchRound, selectCurrentRound } from "redux/mahjong";
import { IPostRecord, postRecord } from "apis/mahjong";

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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentRound = useAppSelector(selectCurrentRound);
    const { round, circle, dealer, dealerCount, players, records } = currentRound;
    console.log(currentRound);


    const renderForm = useMemo(() => {
        return (
            <>
                {<>
                    {endType === EEndType.WINNING && <WinningForm players={currentRound.players} />}
                    {endType === EEndType.SELF_DRAWN && <SelfDrawnForm players={currentRound.players} />}
                    {endType === EEndType.DRAW && <DrawForm />}
                    {endType === EEndType.FAKE && <FakeForm />}
                </>}
            </>
        )
    }, [endType, currentRound]);

    const renderPlayerList = useMemo(() => {
        return (
            <PlayerList
                currentRound={currentRound}
            />
        )
    }, [currentRound]);

    const onChangeEndType = (e: RadioChangeEvent) => {
        setEndType(e.target.value);
        form.resetFields();
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
            transformedValue.losers = Object.values(currentRound.players).filter(player => player.name !== value.winner).map(item => item.name)
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
            .then(res => {
                const { round } = res.payload;
                const { uid } = round;
                if (!uid) {
                    navigate('/round');
                };
            }).catch(err => {

            });
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
                        連莊:{dealerCount}
                    </Text>
                    <Text>
                        局數:{records.length}
                    </Text>
                    <Text>
                        流局數:{players.east.draw}
                    </Text>
                </Col>
                <Col span={24}>
                    {round.uid &&
                        renderPlayerList
                    }
                </Col>
            </Row>
            <Space className='endType-list'>
                <Radio.Group
                    onChange={onChangeEndType}
                    value={endType}
                    options={OEndType}
                    defaultValue={EEndType.WINNING}
                />
            </Space>
            <Form
                form={form}
                className='record-form'
                onFinish={onSubmit}
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
                    {round.uid && renderForm}
                </Space>
            </Form>
        </>
    )
};

export default Record;