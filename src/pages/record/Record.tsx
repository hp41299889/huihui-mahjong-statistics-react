import React, { useState, useEffect, useMemo } from "react";
import { Layout, Radio, RadioChangeEvent, Typography, Form, Space, message, Breadcrumb, Divider, Row, Col } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import './record.css';
import { mahjongApi } from "../../utils/request";
import WinningForm from "./WinningForm";
import SelfDrawnForm from "./SelfDrawnForm";
import DrawForm from "./DrawForm";
import FakeForm from "./FakeForm";
import { useNavigate } from "react-router-dom";
import PlayerList from "./PlayerList";
import { ICurrentRound } from "../interface";
import { EEndType } from "../enum";
import { OEndType } from "../option";
import { windLabelMap } from "../enumMap";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { fetchRound, selectCurrentRound } from "redux/mahjong";
import { postRecord } from "apis/mahjong";

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
    loser: string[];
    point: number;
};

//TODO 整理前後端API格式，應該不需要送風圈風局和連莊，已經在後端計算
//TODO 切換endtype時可能要重置選項
const Record: React.FC = () => {
    const dispatch = useAppDispatch();
    const [endType, setEndType] = useState<EEndType>(EEndType.WINNING);
    const navigator = useNavigate();
    const currentRound = useAppSelector(selectCurrentRound);

    const renderForm = useMemo(() => {
        return (
            <>
                {currentRound.roundUid && <>
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
    };

    const onSubmit = async (value: IRecordForm) => {
        console.log(value);

        value.endType = endType;
        // if(endType === EEndType.WINNING) {
        //     value.loser = [value.loser];
        // }
        if (endType === EEndType.SELF_DRAWN) {
            value.loser = Object.values(currentRound.players).filter(player => player.name !== value.winner).map(item => item.name)
        };
        if (endType === EEndType.DRAW) {
            value.winner = '';
            value.loser = [];
        };
        await postRecord(currentRound.roundUid, value)
            .then(res => {
                message.success(`新增Record成功`);
                mahjongApi.get('/round')
                    .then(res => {
                        const { data }: { data: ICurrentRound } = res.data;
                        if (data.roundUid) {
                            dispatch(fetchRound());
                        } else {
                            navigator('/round');
                        };
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            })

    };
    useEffect(() => {
        dispatch(fetchRound());
    }, [dispatch]);

    return (
        <>
            <Row className='record'>
                <Col span={6}>
                    <Breadcrumb items={breadcrumbItems} />
                </Col>
                <Col className='info' span={18}>
                    <Text className='title' style={{ fontSize: '24px' }}>
                        {`${windLabelMap[currentRound.circle]}風${windLabelMap[currentRound.dealer]}局`}
                    </Text>
                    <Divider type='vertical' />
                    <Text>
                        連莊:{currentRound.dealerCount}
                    </Text>
                    <Text>
                        局數:{currentRound.dealerCount}
                    </Text>
                    <Text>
                        流局數:{currentRound.drawCount}
                    </Text>
                </Col>
                <Col span={24}>
                    {renderPlayerList}
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
                    {renderForm}
                </Space>
            </Form>
        </>
    )
};

export default Record;