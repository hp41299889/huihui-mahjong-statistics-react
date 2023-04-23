import React from "react";
import { Typography, Space, Table, } from "antd";
import { IPlayers } from "../interface";
import { EWind } from "../enum";
import { OWindLabel } from "../option";
import { ColumnsType } from "antd/es/table";

const { Text } = Typography;

interface IProps {
    players: IPlayers;
    dealer: EWind;
};

interface IColumn {
    key: string;
    total: number;
    east: number;
    south: number;
    west: number;
    north: number;
};

const PlayerList: React.FC<IProps> = (props) => {
    const { players, dealer } = props;

    const columns: ColumnsType<IColumn> = [
        {
            title: '',
            dataIndex: 'key',
            rowScope: 'row'
        },
        {
            title: '胡',
            dataIndex: 'win',
        },
        {
            title: '自摸',
            dataIndex: 'selfDrawn',
        },
        {
            title: '放槍',
            dataIndex: 'lose',
        },
        {
            title: '詐胡',
            dataIndex: 'fake'
        },
        {
            title: '小計',
            dataIndex: 'amount'
        }
    ];

    return (
        <>
            <Table />
            {
                OWindLabel.map((wind, index) => (
                    <Space key={`${wind.value}_${players[wind.value]}`}>
                        {
                            wind.value === dealer
                                ? <Space direction='vertical'>
                                    <Text style={{ color: 'red' }}>{OWindLabel[index].label}</Text>
                                    <Text style={{ color: 'red' }}>{players[wind.value]?.name}</Text>
                                </Space>
                                : <Space direction='vertical'>
                                    <Text>{OWindLabel[index].label}</Text>
                                    <Text>{players[wind.value]?.name}</Text>
                                </Space>
                        }
                    </Space>
                ))
            }
        </>
    )
};

export default PlayerList;