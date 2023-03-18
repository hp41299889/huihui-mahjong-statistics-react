import React, { useState } from "react";
import { Form, Radio, RadioChangeEvent } from "antd";
import { EWind } from "../../enum";
import { windOptions } from "../../option";
import PointIntput from "./PointInput";

//TODO all option change to windList
const WinningForm: React.FC = () => {

    const [winner, setWinner] = useState<EWind>(EWind.EAST);
    const [loser, setLoser] = useState<EWind[]>([]);

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