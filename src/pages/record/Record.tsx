import React, { useState, useEffect } from "react";
import { Layout, Radio, RadioChangeEvent, Typography, Form, Button } from "antd";
import axios from "axios";
import './record.css';
import WinningForm from "./WinningForm";
import SelfDrawnForm from "./SelfDrawnForm";
import DrawForm from "./DrawForm";
import FakeForm from "./FakeForm";
import { EEndType, EWindLabel, EWind } from "../../enum";
import { IRecordForm } from "../../interface";
import { windOptions } from "../../option";


interface IEndType {
    label: string;
    value: EEndType;
};

interface Iplayer {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

const endTypeOptions: IEndType[] = [
    { label: '胡', value: EEndType.WINNING },
    { label: '摸', value: EEndType.SELF_DRAWN },
    { label: '流', value: EEndType.DRAW },
    { label: '詐', value: EEndType.FAKE }
];

const windLabelList: EWindLabel[] = [
    EWindLabel.EAST,
    EWindLabel.SOUTH,
    EWindLabel.WEST,
    EWindLabel.NORTH
];

const windList = [
    EWind.EAST,
    EWind.SOUTH,
    EWind.WEST,
    EWind.NORTH
];

const Record: React.FC = () => {

    const [endType, setEndType] = useState<EEndType>(EEndType.WINNING);
    const [circleNum, setCircleNum] = useState<number>(0);
    const [roundNum, setRoundNum] = useState<number>(0);
    const [dealerNum, setDealerNum] = useState<number>(0);
    const [dealerCount, setDealerCount] = useState<number>(0);
    const [roundId, setRoundId] = useState<string>('');
    const [players, setPlayers] = useState<Iplayer[]>([]);

    const renderForm = (endType: EEndType) => {
        switch (endType) {
            case 'winning': {
                return <WinningForm />
            }

            case 'self-drawn': {
                return <SelfDrawnForm />
            }

            case 'draw': {
                return <DrawForm />
            }

            case 'fake': {
                return <FakeForm />
            }
        };
    };

    const renderPlayerList = (dealerNum: number) => {
        if (players.length < 1) {
            return null;
        } else {
            return (
                <>
                    {windOptions.map((wind, index) => (
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            key={`${wind.value}_${players[index].name}`}
                        >
                            {index === dealerNum && <>
                                <span style={{ color: 'red' }}>{wind.label}</span>
                                <span style={{ color: 'red' }}> {players[index].name}</span>
                            </>}
                            {index !== dealerNum && <>
                                <span>{wind.label}</span>
                                <span>{players[index].name}</span>
                            </>}

                        </div>
                    ))
                    }
                </>
            )
        };
    };

    const onChangeEndType = (e: RadioChangeEvent) => {
        setEndType(e.target.value);
    };
    const isDealerContinue = async (props: IRecordForm) => {
        if (props.winner === props.dealer) {
            return true;
        };
        if (props.endType === EEndType.DRAW) {
            return true;
        };
        if (props.endType === EEndType.FAKE) {
            return true;
        }
        return false;
    };
    const onSubmit = async (value: IRecordForm) => {
        value.endType = endType;
        value.dealer = windList[dealerNum];
        if (await isDealerContinue(value)) {
            setDealerCount(preDealerCount => preDealerCount + 1);
        } else {
            if (roundNum === 3) {
                setCircleNum(preCircleNum => preCircleNum + 1);
                setDealerNum(0);
                setRoundNum(0);
            } else {
                setRoundNum(preRoundNum => preRoundNum + 1);
                setDealerNum(preDealerNum => preDealerNum + 1);
                setDealerCount(0);
            };
        };
        console.log(value);
        console.log(players);
    };


    useEffect(() => {
        axios.get('http://localhost:8080/round')
            .then(res => {
                const { uid, player } = res.data.data;
                setRoundId(uid);
                setPlayers(player);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Layout>
            <Typography.Title className='title'>
                {windLabelList[circleNum]}風{windLabelList[roundNum]}局
            </Typography.Title>
            <Typography.Text className='dealer-count'>連莊:{dealerCount}</Typography.Text>
            <div className='player-list'>
                {renderPlayerList(dealerNum)}
            </div>
            <div className='endType-list'>
                <Radio.Group
                    onChange={onChangeEndType}
                    value={endType}
                    options={endTypeOptions}
                    defaultValue={'winning'}
                />
            </div>
            <Form
                className='record-form'
                onFinish={onSubmit}
            >
                {renderForm(endType)}
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
};

export default Record;