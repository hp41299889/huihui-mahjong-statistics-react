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
import { OEndType, OWind } from "../option";
import { windLabelMap } from "../enumMap";
import { useAppSelector } from "../../redux/hook";
import { selectRecordFormSubmitDisabled } from "../../redux/mahjong";

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
    const recordFormSubmitDisabled = useAppSelector(selectRecordFormSubmitDisabled);

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
        value.endType = endType;
        console.log(value);
        if (endType === EEndType.SELF_DRAWN) {
            value.loser = OWind.filter(item => item !== value.winner)
        };
        mahjongApi.post(`/record/${round.roundUid}`, value)
            .then(res => {
                if (res.data.status === 'success') {
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
                        })
                } else {

                }
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
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={recordFormSubmitDisabled}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
};

export default Record;