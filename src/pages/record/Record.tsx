import React, { useState, useEffect } from "react";
import { Layout, Radio, RadioChangeEvent, Typography, Form, Button } from "antd";
import { mahjongApi } from "../../utils/request";
import './record.css';
import WinningForm from "./WinningForm";
import SelfDrawnForm from "./SelfDrawnForm";
import DrawForm from "./DrawForm";
import FakeForm from "./FakeForm";
import { EEndType, EWindLabel, EWind } from "../../enum";
import { IRecordForm } from "../../interface";
interface IEndType {
    label: string;
    value: EEndType;
};

interface IWindList {
    key: EWind;
    label: EWindLabel;
}

export const endTypeOptions: IEndType[] = [
    { label: '胡', value: EEndType.WINNING },
    { label: '摸', value: EEndType.SELF_DRAWN },
    { label: '流', value: EEndType.DRAW },
    { label: '詐', value: EEndType.FAKE }
];
export const windList: IWindList[] = [
    { key: EWind.EAST, label: EWindLabel.EAST },
    { key: EWind.SOUTH, label: EWindLabel.SOUTH },
    { key: EWind.WEST, label: EWindLabel.WEST },
    { key: EWind.NORTH, label: EWindLabel.NORTH }
];

const Record: React.FC = () => {

    const [endType, setEndType] = useState<EEndType>(EEndType.WINNING);
    const [circleNum, setCircleNum] = useState<number>(0);
    const [roundNum, setRoundNum] = useState<number>(0);
    const [dealerNum, setDealerNum] = useState<number>(0);
    const [dealerCount, setDealerCount] = useState<number>(0);
    const [roundId, setRoundId] = useState<string>('');
    const [players, setPlayers] = useState<string[]>([]);

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
                    {windList.map((wind, index) => (
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            key={`${wind.key}_${players[index]}`}
                        >
                            {index === dealerNum && <>
                                <span style={{ color: 'red' }}>{wind.label}</span>
                                <span style={{ color: 'red' }}> {players[index]}</span>
                            </>}
                            {index !== dealerNum && <>
                                <span>{wind.label}</span>
                                <span>{players[index]}</span>
                            </>}
                        </div>
                    ))}
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
        //TODO POST loser要是陣列後端才不會解析錯誤，圈數及莊家計算有誤，reload仍必須與資料庫同步
        value.endType = endType;
        value.dealer = windList[dealerNum].key;
        value.dealerCount = dealerCount;
        value.circle = windList[circleNum].key;
        if (value.endType === EEndType.WINNING) {
            //非常之古怪 Enum問題，暫時用any強制加上陣列
            value.loser = [value.loser];
        };

        mahjongApi.post(`/record/${roundId}`, value)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
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
    };

    const findIndex = (input: string) => {
        const index = windList.findIndex(wind => wind.key === input);
        return index;
    };

    useEffect(() => {
        mahjongApi.get('/round')
            .then(res => {
                console.log(res.data);

                const { uid, players, circle, wind, dealerCount } = res.data.data;
                console.log('circle index', findIndex(circle));
                console.log('wind index', findIndex(wind));
                if (findIndex(wind) + 1 === 4) {
                    setCircleNum(findIndex(circle) + 1);
                    setDealerNum(0);
                } else {
                    setCircleNum(findIndex(circle));
                    setDealerNum(findIndex(wind) + 1);
                };
                setRoundId(uid);
                setPlayers(players);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Layout>
            <Typography.Title className='title'>
                {windList[circleNum].label}風{windList[dealerNum].label}局
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