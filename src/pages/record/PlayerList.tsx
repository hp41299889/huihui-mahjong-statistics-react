import React from "react";
import { Typography, Space, } from "antd";
import { IPlayerList } from "../interface";
import { OWindLabel } from "../option";

const { Text } = Typography;

const PlayerList: React.FC<IPlayerList> = (props) => {
    const { players, dealer } = props;

    return (
        <>
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