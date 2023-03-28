import React, { useState } from "react";
import { Form, Radio, RadioChangeEvent } from "antd";
import { EWind } from "../enum";
import PointIntput from "./PointInput";
import { IPlayer, IWinningForm } from "../interface";

//TODO all option change to windList
const WinningForm: React.FC<IWinningForm> = (props) => {
    const { players } = props;
    const [winner, setWinner] = useState<string>('');
    const [loser, setLoser] = useState<string>('');
    const windPlayerMap = {
        [EWind.EAST]: players.east?.name,
        [EWind.SOUTH]: players.south?.name,
        [EWind.WEST]: players.west?.name,
        [EWind.NORTH]: players.north?.name,
    };

    const onChangeWinner = (e: RadioChangeEvent) => {
        setWinner(e.target.value);
    };

    const onChangeLoser = (e: RadioChangeEvent) => {
        setLoser(e.target.value);
    };

    const winnerOptions = [
        { label: windPlayerMap[EWind.EAST], value: windPlayerMap[EWind.EAST] },
        { label: windPlayerMap[EWind.SOUTH], value: windPlayerMap[EWind.SOUTH] },
        { label: windPlayerMap[EWind.WEST], value: windPlayerMap[EWind.WEST] },
        { label: windPlayerMap[EWind.NORTH], value: windPlayerMap[EWind.NORTH] },
    ];

    const loserOptions = winnerOptions.filter(option => option.label !== winner);

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