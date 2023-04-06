import React, { useState } from "react";
import { Form, Radio, RadioChangeEvent } from "antd";
import { EWind } from "../enum";
import PointIntput from "./PointInput";
import { IWinningForm } from "../interface";

const WinningForm: React.FC<IWinningForm> = (props) => {
    const { players } = props;
    const [winner, setWinner] = useState<EWind>(EWind.EAST);
    const [loser, setLoser] = useState<EWind>(EWind.SOUTH);

    const onChangeWinner = (e: RadioChangeEvent) => {
        setWinner(e.target.value);
    };

    const onChangeLoser = (e: RadioChangeEvent) => {
        setLoser(e.target.value);
    };

    const windPlayerMap = {
        [EWind.EAST]: players.east?.name,
        [EWind.SOUTH]: players.south?.name,
        [EWind.WEST]: players.west?.name,
        [EWind.NORTH]: players.north?.name,
    };

    const winnerOptions = [
        { label: windPlayerMap[EWind.EAST], value: EWind.EAST },
        { label: windPlayerMap[EWind.SOUTH], value: EWind.SOUTH },
        { label: windPlayerMap[EWind.WEST], value: EWind.WEST },
        { label: windPlayerMap[EWind.NORTH], value: EWind.NORTH },
    ];

    const loserOptions = winnerOptions.filter(option => option.value !== winner);

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