import React, { useState } from "react";
import { Form, Radio, RadioChangeEvent } from "antd";
import { EWind } from "../enum";
import PointIntput from "./PointInput";

const windOptions = [
    { label: '東', value: 0 },
    { label: '南', value: 1 },
    { label: '西', value: 2 },
    { label: '北', value: 3 }
];

//TODO all option change to windList
const WinningForm: React.FC = () => {

    const [winner, setWinner] = useState<number>(0);
    const [loser, setLoser] = useState<string[]>([]);

    const onChangeWinner = (e: RadioChangeEvent) => {
        setWinner(e.target.value);
    };

    const onChangeLoser = (e: RadioChangeEvent) => {
        setLoser(e.target.value);
    };

    const loserOptions = windOptions.filter(option => option.value !== winner);

    return (
        <>
            <Form.Item
                label={'胡牌'}
                name={'winner'}
            >
                <Radio.Group
                    onChange={onChangeWinner}
                    value={[winner]}
                    options={windOptions}
                />
            </Form.Item>
            <Form.Item
                label={'放槍'}
                name={'loser'}
            >
                <Radio.Group
                    onChange={onChangeLoser}
                    value={loser}
                    options={loserOptions}
                />
            </Form.Item>
            <PointIntput />
        </>
    )
};

export default WinningForm;