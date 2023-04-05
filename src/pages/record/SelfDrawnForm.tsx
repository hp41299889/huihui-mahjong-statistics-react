import React, { useState } from "react";
import { Form, Radio, RadioChangeEvent } from "antd";
// import { windOptions } from "../../option";
import { EWind } from "../enum";
import PointIntput from "./PointInput";
import { IPlayers } from "../interface";

interface IProps {
    players: IPlayers;
};

const SelfDrawnForm: React.FC<IProps> = (props) => {
    const { players } = props;
    const [winner, setWinner] = useState<EWind>(EWind.EAST);

    const onChangeWinner = (e: RadioChangeEvent) => {
        setWinner(e.target.value);
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

    return (
        <>
            <Form.Item label={'自摸'} name='winner'>
                <Radio.Group
                    onChange={onChangeWinner}
                    value={winner}
                    options={winnerOptions}
                />
            </Form.Item>
            <PointIntput />
        </>
    )
};

export default SelfDrawnForm;