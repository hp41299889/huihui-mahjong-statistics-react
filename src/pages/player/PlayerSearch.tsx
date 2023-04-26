import React, { useEffect, useState } from 'react';
import { Col, Descriptions, Form, Row, Select, Table } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { fetchPlayers, selectPlayers } from 'redux/mahjong';
import { getPlayer } from 'apis/mahjong';
import { percent } from 'utils/math';
import { ColumnsType } from 'antd/es/table';

interface IDatas {
    rounds: number;
    records: number;
    win: number;
    selfDrawn: number;
    beSelfDrawn: number;
    lose: number;
    draw: number;
    fake: number;
    amount: number;
};

interface IPlayerStatistics {
    east: IDatas
    south: IDatas
    west: IDatas
    north: IDatas
};

interface IColumn {
    key: string;
    total: number;
    east: number;
    south: number;
    west: number;
    north: number;
};

const columns: ColumnsType<IColumn> = [
    {
        title: '',
        dataIndex: 'key',
        rowScope: 'row'
    },
    {
        title: '總計',
        dataIndex: 'total',
    },
    {
        title: '東',
        dataIndex: 'east',
    },
    {
        title: '南',
        dataIndex: 'south',
    },
    {
        title: '西',
        dataIndex: 'west',
    },
    {
        title: '北',
        dataIndex: 'north',
    },
];
//TODO 用redux
const PlayerSearch: React.FC = () => {
    const dispatch = useAppDispatch();
    const players = useAppSelector(selectPlayers);
    const [playerStatistics, setPlayerStatistics] = useState<IPlayerStatistics>({
        east: {
            rounds: 0,
            records: 0,
            win: 0,
            lose: 0,
            selfDrawn: 0,
            beSelfDrawn: 0,
            draw: 0,
            fake: 0,
            amount: 0
        },
        south: {
            rounds: 0,
            records: 0,
            win: 0,
            lose: 0,
            selfDrawn: 0,
            beSelfDrawn: 0,
            draw: 0,
            fake: 0,
            amount: 0
        },
        west: {
            rounds: 0,
            records: 0,
            win: 0,
            lose: 0,
            selfDrawn: 0,
            beSelfDrawn: 0,
            draw: 0,
            fake: 0,
            amount: 0
        },
        north: {
            rounds: 0,
            records: 0,
            win: 0,
            lose: 0,
            selfDrawn: 0,
            beSelfDrawn: 0,
            draw: 0,
            fake: 0,
            amount: 0
        }
    });

    const data: IColumn[] = [
        {
            key: '將數',
            total: Object.values(playerStatistics).reduce((p, c) => c.rounds),
            east: playerStatistics.east.rounds,
            south: playerStatistics.south.rounds,
            west: playerStatistics.west.rounds,
            north: playerStatistics.north.rounds,
        },
        {
            key: '局數',
            total: Object.values(playerStatistics).reduce((p, c) => c.records),
            east: playerStatistics.east.records,
            south: playerStatistics.south.records,
            west: playerStatistics.west.records,
            north: playerStatistics.north.records
        },
        {
            key: '胡牌',
            total: Object.values(playerStatistics).reduce((p, c) => c.wins),
            east: playerStatistics.east.win,
            south: playerStatistics.south.win,
            west: playerStatistics.west.win,
            north: playerStatistics.north.win,
        },
        {
            key: '自摸',
            total: Object.values(playerStatistics).reduce((p, c) => c.selfDrawns),
            east: playerStatistics.east.selfDrawn,
            south: playerStatistics.south.selfDrawn,
            west: playerStatistics.west.selfDrawn,
            north: playerStatistics.north.selfDrawn,
        },
        {
            key: '放槍',
            total: Object.values(playerStatistics).reduce((p, c) => c.loses),
            east: playerStatistics.east.lose,
            south: playerStatistics.south.lose,
            west: playerStatistics.west.lose,
            north: playerStatistics.north.lose
        },
        {
            key: '被自摸',
            total: Object.values(playerStatistics).reduce((p, c) => c.loses),
            east: playerStatistics.east.beSelfDrawn,
            south: playerStatistics.south.beSelfDrawn,
            west: playerStatistics.west.beSelfDrawn,
            north: playerStatistics.north.beSelfDrawn,
        },
        {
            key: '小計',
            total: 0,
            east: playerStatistics.east.amount,
            south: playerStatistics.south.amount,
            west: playerStatistics.west.amount,
            north: playerStatistics.north.amount,
        }
    ];

    const onChange = async (value: string) => {
        const { data } = (await getPlayer(value)).data;
        console.log(data);
        setPlayerStatistics(data);
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

            <Col span={24}>
                <Table columns={columns} dataSource={data} size='small' pagination={false} />
            </Col>
        </Row>
    )
};

export default PlayerSearch;