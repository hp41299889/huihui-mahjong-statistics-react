import React, { useState } from "react";
import { Form, Radio, RadioChangeEvent, Button } from "antd";
import PointIntput from "./PointInput";
import { IPlayers } from "../interface";
import { selectRecordFormSubmitDisabled } from "redux/mahjong";
import { useAppSelector } from "redux/hook";

interface IProps {
    players: IPlayers;
};

const SelfDrawnForm: React.FC<IProps> = (props) => {
    const { players } = props;
    const [winner, setWinner] = useState<string>('');
    const recordFormSubmitDisabled = useAppSelector(selectRecordFormSubmitDisabled);

    const onChangeWinner = (e: RadioChangeEvent) => {
        setWinner(e.target.value);
    };

    const winnerOptions = [
        { label: players.east.name, value: players.east.name },
        { label: players.south.name, value: players.south.name },
        { label: players.west.name, value: players.west.name },
        { label: players.north.name, value: players.north.name },
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
            <Form.Item>
                <Button htmlType='submit' type='primary' disabled={recordFormSubmitDisabled}>
                    Submit
                </Button>
            </Form.Item>
        </>
    )
};

export default SelfDrawnForm;