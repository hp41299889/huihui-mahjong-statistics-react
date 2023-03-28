import React, { useState, useEffect } from "react";
import { Layout, Radio, RadioChangeEvent, Typography, Form, Button, Space } from "antd";
import { mahjongApi } from "../../utils/request";
import './record.css';
import WinningForm from "./WinningForm";
import SelfDrawnForm from "./SelfDrawnForm";
import DrawForm from "./DrawForm";
import FakeForm from "./FakeForm";
import { useNavigate } from "react-router-dom";
import PlayerList from "./PlayerList";
import { IRound, IPlayer, IRecordForm } from "../interface";
import { EWindLabel, EEndType, EWind } from "../enum";
import { OWind, OEndType } from "../option";
import { windLabelMap } from "../enumMap";

const { Text, Title } = Typography;


const Record: React.FC = () => {
    const [round, setRound] = useState<IRound>({
        roundUid: '',
        base: 0,
        players: {
            east: { name: '' },
            south: { name: '' },
            west: { name: '' },
            north: { name: '' }
        },
        point: 0,
        circle: EWind.EAST,
        dealer: EWind.EAST,
        deskType: ''
    });
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [circleNum, setCircleNum] = useState<number>(0);
    const [circle, setCircle] = useState<EWind>(EWind.EAST);
    const [dealer, setDealer] = useState<EWind>(EWind.EAST);

    const [dealerNum, setDealerNum] = useState<number>(0);
    const [dealerCount, setDealerCount] = useState<number>(0);
    const [endType, setEndType] = useState<EEndType>(EEndType.WINNING);

    const RenderForm: React.FC = () => (
        <Space>
            {endType === EEndType.WINNING && <WinningForm players={round.players} />}
            {endType === EEndType.SELF_DRAWN && <SelfDrawnForm />}
            {endType === EEndType.DRAW && <DrawForm />}
            {endType === EEndType.FAKE && <FakeForm />}
        </Space>
    );

    const onChangeEndType = (e: RadioChangeEvent) => {
        setEndType(e.target.value);
    };

    const isDealerContinue = async (value: IRecordForm) => {
        if (value.winner === players[dealerNum].name) return true;
        if (value.endType === EEndType.DRAW) return true;
        if (value.endType === EEndType.FAKE) return true;
        return false;
    };

    const isNextCircle = async (value: IRecordForm) => {
        if (value.dealer === EWind.NORTH) return true;
        return false;
    };

    const findNextWind = (currentWind: EWind) => {
        const index = OWind.findIndex(wind => wind.value === currentWind)
        return OWind[index + 1];
    }

    const onSubmit = async (value: IRecordForm) => {
        value.dealer = OWind[dealerNum].value;
        console.log(value);
        if (await isDealerContinue(value)) {
            setDealerCount(pre => pre + 1);
        } else {
            setDealerCount(0);
            if (await isNextCircle(value)) {
                setCircleNum(pre => pre + 1);
                setDealerNum(0);
            } else {
                setDealerNum(pre => pre + 1);
            };
        };
    };

    useEffect(() => {
        mahjongApi.get('/round')
            .then(res => {
                const { data }: { data: IRound } = res.data;
                setRound(data);
                // setPlayers(data.players);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Layout>
            <Title className='title'>
                {`${windLabelMap[circle]}風${windLabelMap[dealer]}局`}
            </Title>
            <Text className='dealer-count'>
                連莊:{dealerCount}
            </Text>
            <Space className='player-list'>
                <PlayerList
                    players={round.players}
                    dealer={dealer}
                />
            </Space>
            <Space className='endType-list'>
                <Radio.Group
                    onChange={onChangeEndType}
                    value={endType}
                    options={OEndType}
                    defaultValue={'winning'}
                />
            </Space>
            <Form
                className='record-form'
                onFinish={onSubmit}
            >
                <RenderForm />
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