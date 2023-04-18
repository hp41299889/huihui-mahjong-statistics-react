import React, { useEffect, useState } from 'react';
import { Col, Descriptions, Form, Row, Select } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { fetchPlayers, selectPlayers } from 'redux/mahjong';
import { getPlayer } from 'apis/mahjong';
import { percent } from 'utils/math';

interface IDatas {
    rounds: number,
    records: number,
    wins: number,
    selfDrawns: number,
    loses: number,
    drawn: number,
    fake: number
};

const PlayerSearch: React.FC = () => {
    const dispatch = useAppDispatch();
    const players = useAppSelector(selectPlayers);
    const [datas, setDatas] = useState<IDatas>();

    const onChange = async (value: string) => {
        const { data } = (await getPlayer(value)).data;
        setDatas(data);
        console.log(data);

    };

    const selectOptions = players.map(player => {
        return {
            value: player.name,
            label: player.name
        };
    });

    useEffect(() => {
        dispatch(fetchPlayers());
    }, [dispatch]);

    return (
        <Row>
            <Col span={24}>
                <Form>
                    <Form.Item label='搜尋玩家' name='name'>
                        <Select
                            showSearch
                            onChange={onChange}
                            options={selectOptions}
                        />
                    </Form.Item>
                </Form>
            </Col>

            {datas?.rounds &&
                <Col span={24}>
                    <Descriptions title={`__統計資料`} bordered column={3} size='small'>
                        <Descriptions.Item label='將數'>{datas.rounds}</Descriptions.Item>
                        <Descriptions.Item label='成績'>成績</Descriptions.Item>
                        {/* 勝率是每將是贏或輸的比率 */}
                        <Descriptions.Item label='勝率'>勝率</Descriptions.Item>
                        <Descriptions.Item span={3} label='局數'>{datas.records}</Descriptions.Item>
                        <Descriptions.Item label='胡牌'>{datas.wins}</Descriptions.Item>
                        <Descriptions.Item label='胡牌率'>{percent(datas.wins / datas.records * 100)}</Descriptions.Item>
                        <Descriptions.Item label='自摸'>{datas.selfDrawns}</Descriptions.Item>
                        <Descriptions.Item label='自摸率'>{percent(datas.selfDrawns / datas.records * 100)}</Descriptions.Item>
                        <Descriptions.Item label='放槍'>{datas.loses}</Descriptions.Item>
                        <Descriptions.Item label='放槍率'>{percent(datas.loses / datas.records * 100)}</Descriptions.Item>
                        <Descriptions.Item label='流局'>{datas.drawn}</Descriptions.Item>
                        <Descriptions.Item label='流局率'>{percent(datas.drawn / datas.records * 100)}</Descriptions.Item>
                        <Descriptions.Item label='詐胡'>{datas.fake}</Descriptions.Item>
                        <Descriptions.Item label='詐胡率'>{percent(datas.fake / datas.records * 100)}</Descriptions.Item>
                    </Descriptions>
                </Col>
            }
        </Row>
    )
};

export default PlayerSearch;