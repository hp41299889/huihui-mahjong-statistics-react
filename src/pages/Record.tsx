import React, { useState, useEffect } from "react";
import { Layout, Radio, RadioChangeEvent, Typography, Form, Button } from "antd";
import './record.css';
import WinningForm from "../components/RecordForm/WinningForm";
import SelfDrawnForm from "../components/RecordForm/SelfDrawnForm";
import DrawForm from "../components/RecordForm/DrawForm";
import FakeForm from "../components/RecordForm/FakeForm";
import { EEndType, EWindLabel, EWind } from "../enum";

interface IRecordForm {
    endType: EEndType;
    winner: EWind;
    loser: EWind | EWind[];
    point: number;
    dealer: EWind;
    dealerCount: number;
    circle: EWind;
}

interface IEndType {
    label: string;
    value: EEndType
};

const endTypeOptions: IEndType[] = [
    { label: '胡', value: EEndType.WINNING },
    { label: '摸', value: EEndType.SELF_DRAWN },
    { label: '流', value: EEndType.DRAW },
    { label: '詐', value: EEndType.FAKE }
];

const windList: EWindLabel[] = [
    EWindLabel.EAST,
    EWindLabel.SOUTH,
    EWindLabel.WEST,
    EWindLabel.NORTH
];

const Record: React.FC = () => {

    const [endType, setEndType] = useState<EEndType>(EEndType.WINNING);
    const [circleNum, setCircleNum] = useState(0);
    const [roundNum, setRoundNum] = useState(0);
    const [dealerCount, setDealerCount] = useState(0);
    const [] = useState();

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

    const onChangeEndType = (e: RadioChangeEvent) => {
        setEndType(e.target.value);
    };
    const dealerContinue = () => {
        setDealerCount(preDealerCount => preDealerCount + 1);
    };
    const onSubmit = (value: IRecordForm) => {
        console.log(value);
    };

    return (
        <Layout>
            <Typography.Title className='title'>
                {windList[circleNum]}風{windList[roundNum]}局
            </Typography.Title>
            <Typography.Text className='dealer-count'>連莊:{dealerCount}</Typography.Text>
            <div className='player-list'>
                <div className='player'>
                    <Typography.Text className='wind'>東</Typography.Text>
                    <Typography.Text className='player-name'>霖</Typography.Text>
                </div>
                <div className='player'>
                    <Typography.Text className='wind'>南</Typography.Text>
                    <Typography.Text className='player-name'>樺</Typography.Text>
                </div>
                <div className='player'>
                    <Typography.Text className='wind dealer'>西</Typography.Text>
                    <Typography.Text className='player-name dealer'>丁</Typography.Text>
                </div>
                <div className='player'>
                    <Typography.Text className='wind'>北</Typography.Text>
                    <Typography.Text className='player-name'>呆</Typography.Text>
                </div>
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