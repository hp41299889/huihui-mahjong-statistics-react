import React from "react";
import { Form, Typography, Input } from 'antd';
import './playerForm.css';

interface IPositionForm {
    positionTitle: string;
    position: string;
}

const PlayerForm: React.FC<IPositionForm> = (props: IPositionForm) => {
    const { positionTitle, position } = props;
    return (
        <Form.Item
            className='player-form'
        >
            <Typography.Title>{positionTitle}</Typography.Title>
            <Input.Group>
                <Form.Item
                    label='名字'
                    name={[position, 'name']}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='戰績'
                    name={[position, 'balance']}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='最高連莊數'
                    name={[position, 'highestContinousDealer']}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='胡牌數'
                    name={[position, 'wins']}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='自摸數'
                    name={[position, 'selfDrawnWins']}
                >
                    <Input />
                </Form.Item>
            </Input.Group>
        </Form.Item>
    )
};

export default PlayerForm;