import React, { useState, useEffect, useMemo } from "react";
import { Layout, Radio, RadioChangeEvent, Typography, Form, Button, Space, message } from "antd";
import { mahjongApi } from "../../utils/request";
import './record.css';
import WinningForm from "./WinningForm";
import SelfDrawnForm from "./SelfDrawnForm";
import DrawForm from "./DrawForm";
import FakeForm from "./FakeForm";
import { useNavigate } from "react-router-dom";
import PlayerList from "./PlayerList";
import { IRound, IRecordForm } from "../interface";
import { EEndType, EWind, EDeskType } from "../enum";
import { OEndType } from "../option";
import { windLabelMap } from "../enumMap";

const { Text, Title } = Typography;

//TODO 切換endtype時可能要重置選項
const Record: React.FC = () => {
    const [round, setRound] = useState<IRound>({
        roundUid: '',
        deskType: EDeskType.AUTO,
        base: 0,
        point: 0,
        players: {
            east: { name: '' },
            south: { name: '' },
            west: { name: '' },
            north: { name: '' }
        },
        circle: EWind.EAST,
        dealer: EWind.EAST,
        dealerCount: 0
    });
    const [endType, setEndType] = useState<EEndType>(EEndType.WINNING);
    const navigator = useNavigate();

    const renderForm = useMemo(() => {
        return (
            <Space>
                {endType === EEndType.WINNING && <WinningForm players={round.players} />}
                {endType === EEndType.SELF_DRAWN && <SelfDrawnForm players={round.players} />}
                {endType === EEndType.DRAW && <DrawForm />}
                {endType === EEndType.FAKE && <FakeForm />}
            </Space>
        )
    }, [endType, round.players]);

    const onChangeEndType = (e: RadioChangeEvent) => {
        setEndType(e.target.value);
    };

    const onSubmit = async (value: IRecordForm) => {
        //整理post data
        value.endType = endType;
        if (endType === EEndType.SELF_DRAWN) {
            value.loser = Object.values(round.players).filter(player => player.name !== value.winner).map(item => item.name)
        };
        if (endType === EEndType.DRAW) {
            value.winner = '';
            value.loser = [];
        };
        mahjongApi.post(`/record/${round.roundUid}`, value)
            .then(res => {
                message.success(`新增Record成功`);
                mahjongApi.get('/round')
                    .then(res => {
                        const { data }: { data: IRound } = res.data;
                        if (data.roundUid) {
                            setRound(data);
                        } else {
                            navigator('/round');
                        };
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        mahjongApi.get('/round')
            .then(res => {
                const { data }: { data: IRound } = res.data;
                if (data.roundUid) {
                    setRound(data);
                } else {
                    navigator('/round');
                };
            })
            .catch(err => {
                console.log(err);
            })
    }, [navigator]);

    return (
        <Layout>
            <Title className='title'>
                {`${windLabelMap[round.circle]}風${windLabelMap[round.dealer]}局`}
            </Title>
            <Text className='dealer-count'>
                連莊:{round.dealerCount}
            </Text>
            <Space className='player-list'>
                <PlayerList
                    players={round.players}
                    dealer={round.dealer}
                />
            </Space>
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
                {round.players.north.name && renderForm}
            </Form>
        </Layout>
    )
};

export default Record;