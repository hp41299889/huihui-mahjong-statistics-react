import React, { useMemo, useState } from "react";
import { Form, Radio, RadioChangeEvent } from "antd";
import PointIntput from "./PointInput";
import { IWinningForm } from "../interface";

const WinningForm: React.FC<IWinningForm> = (props) => {
    const { players } = props;
    const [winner, setWinner] = useState<string>('');
    const [loser, setLoser] = useState<string>('');

    const onChangeWinner = (e: RadioChangeEvent) => {
        setWinner(e.target.value);
    };

    const onChangeLoser = (e: RadioChangeEvent) => {
        setLoser(e.target.value);
    };

    const winnerOptions = [
        { label: players.east.name, value: players.east.name },
        { label: players.south.name, value: players.south.name },
        { label: players.west.name, value: players.west.name },
        { label: players.north.name, value: players.north.name },
    ];

    const loserOptions = winnerOptions.filter(option => option.value !== winner);

    const renderLoserRadio = useMemo(() => {
        return (
            <Radio.Group
                onChange={onChangeLoser}
                value={loser}
                options={loserOptions}
            />
        )
    }, [loser, loserOptions]);

    return (
        <>
            <Form.Item
                label={'胡牌'}
                name={'winner'}
            >
                <Radio.Group
                    onChange={onChangeWinner}
                    value={winner}
                    options={winnerOptions}
                />
            </Form.Item>
            <Form.Item
                label={'放槍'}
                name={'loser'}
            >
                {renderLoserRadio}
            </Form.Item>
            <PointIntput />
        </>
    )
};

export default WinningForm;