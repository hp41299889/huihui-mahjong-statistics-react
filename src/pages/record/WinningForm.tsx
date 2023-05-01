import React, { useMemo, useState } from "react";
import { Form, Radio, RadioChangeEvent, Button, Input } from "antd";
import { IPlayers } from "../interface";

interface IProps {
    players: IPlayers;
};

const WinningForm: React.FC<IProps> = (props) => {
    const { players } = props;
    const [winner, setWinner] = useState<string>('');
    const [loser, setLoser] = useState<string[]>(['']);
    const [formSubmitDisabled, setFormSubmitDisabled] = useState<boolean>(true);

    const onWinnerChange = (e: RadioChangeEvent) => {
        setWinner(e.target.value);
    };

    const onLoserChange = (e: RadioChangeEvent) => {
        setLoser([e.target.value]);
    };

    const onPointChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value) {
            setFormSubmitDisabled(false);
        } else {
            setFormSubmitDisabled(true);
        };
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
                onChange={onLoserChange}
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
                    onChange={onWinnerChange}
                    value={winner}
                    options={winnerOptions}
                />
            </Form.Item>
            <Form.Item
                label={'放槍'}
                name={'losers'}
            >
                {renderLoserRadio}
            </Form.Item>
            <Form.Item
                label={'台'}
                name={'point'}
            >
                <Input
                    inputMode='numeric'
                    type='number'
                    onChange={onPointChange}
                />
            </Form.Item>
            <Form.Item
                style={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                <Button
                    htmlType='submit'
                    type='primary'
                    disabled={formSubmitDisabled}
                >
                    送出
                </Button>
            </Form.Item>
        </>
    )
};

export default WinningForm;