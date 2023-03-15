import React, { useState } from "react";
import { Form, Radio, RadioChangeEvent } from "antd";
import { windOptions } from "../../option";
import { EWind } from "../../enum";
import PointIntput from "./PointInput";

const SelfDrawnForm: React.FC = () => {
    const [winner, setWinner] = useState(EWind.EAST);

    const onChangeWinner = (e: RadioChangeEvent) => {
        setWinner(e.target.value);
    };

    return (
        <>
            <Form.Item label={'自摸'}>
                <Radio.Group
                    onChange={onChangeWinner}
                    value={winner}
                    options={windOptions}
                />
            </Form.Item>
            <PointIntput />
        </>
    )
};

export default SelfDrawnForm;