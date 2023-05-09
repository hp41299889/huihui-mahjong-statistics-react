import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Select, Table } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { fetchStatistics, selectStatistics } from 'redux/mahjong';
import { ColumnsType } from 'antd/es/table';
import { IPlayerStatistics } from 'pages/interface';

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
        align: 'right'
    },
    {
        title: '東',
        dataIndex: 'east',
        align: 'right'
    },
    {
        title: '南',
        dataIndex: 'south',
        align: 'right'
    },
    {
        title: '西',
        dataIndex: 'west',
        align: 'right'
    },
    {
        title: '北',
        dataIndex: 'north',
        align: 'right'
    },
];

const PlayerSearch: React.FC = () => {
    const dispatch = useAppDispatch();
    const statistics = useAppSelector(selectStatistics);
    const [playerStatistics, setPlayerStatistics] = useState<IPlayerStatistics>({
        id: 0,
        name: '',
        createdAt: new Date(),
        winds: {
            east: {
                round: 0,
                record: 0,
                win: 0,
                lose: 0,
                selfDrawn: 0,
                beSelfDrawn: 0,
                draw: 0,
                fake: 0,
                amount: 0
            },
            south: {
                round: 0,
                record: 0,
                win: 0,
                lose: 0,
                selfDrawn: 0,
                beSelfDrawn: 0,
                draw: 0,
                fake: 0,
                amount: 0
            },
            west: {
                round: 0,
                record: 0,
                win: 0,
                lose: 0,
                selfDrawn: 0,
                beSelfDrawn: 0,
                draw: 0,
                fake: 0,
                amount: 0
            },
            north: {
                round: 0,
                record: 0,
                win: 0,
                lose: 0,
                selfDrawn: 0,
                beSelfDrawn: 0,
                draw: 0,
                fake: 0,
                amount: 0
            },
        }
    });

    const data: IColumn[] = [
        {
            key: '將數',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.round : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.round : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.round : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.round : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.round : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.round : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.round : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.round : 0,
        },
        {
            key: '局數',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.record : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.record : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.record : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.record : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.record : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.record : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.record : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.record : 0,
        },
        {
            key: '胡牌',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.win : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.win : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.win : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.win : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.win : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.win : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.win : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.win : 0,
        },
        {
            key: '自摸',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.selfDrawn : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.selfDrawn : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.selfDrawn : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.selfDrawn : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.selfDrawn : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.selfDrawn : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.selfDrawn : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.selfDrawn : 0,
        },
        {
            key: '放槍',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.lose : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.lose : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.lose : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.lose : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.lose : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.lose : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.lose : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.lose : 0,
        },
        {
            key: '被自摸',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.beSelfDrawn : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.beSelfDrawn : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.beSelfDrawn : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.beSelfDrawn : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.beSelfDrawn : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.beSelfDrawn : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.beSelfDrawn : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.beSelfDrawn : 0,
        },
        {
            key: '流局',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.draw : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.draw : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.draw : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.draw : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.draw : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.draw : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.draw : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.draw : 0,
        },
        {
            key: '詐胡',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.fake : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.fake : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.fake : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.fake : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.fake : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.fake : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.fake : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.fake : 0,
        },
        {
            key: '小計',
            total: [
                playerStatistics.winds.east ? playerStatistics.winds.east.amount : 0,
                playerStatistics.winds.south ? playerStatistics.winds.south.amount : 0,
                playerStatistics.winds.west ? playerStatistics.winds.west.amount : 0,
                playerStatistics.winds.north ? playerStatistics.winds.north.amount : 0,
            ].reduce((acc, value) => acc + value, 0),
            east: playerStatistics.winds.east ? playerStatistics.winds.east.amount : 0,
            south: playerStatistics.winds.south ? playerStatistics.winds.south.amount : 0,
            west: playerStatistics.winds.west ? playerStatistics.winds.west.amount : 0,
            north: playerStatistics.winds.north ? playerStatistics.winds.north.amount : 0,
        }
    ];

    const onChange = async (value: string) => {
        setPlayerStatistics(statistics[value]);
    };

    const selectOptions = statistics ? Object.keys(statistics).map(player => ({ value: player, label: player })) : [];

    useEffect(() => {
        dispatch(fetchStatistics());
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