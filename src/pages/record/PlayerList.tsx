import React from "react";
import { Typography, Space, } from "antd";
import { IPlayerList } from "../interface";
import { OWind } from "../option";

const { Text } = Typography;

const PlayerList: React.FC<IPlayerList> = (props) => {
    const { players, dealer } = props;
    return (
        <>
            {
                OWind.map((wind, index) => (
                    <Space key={`${wind.value}_${players[wind.value]}`}>
                        {
                            wind.value === dealer
                                ? <Space direction='vertical'>
                                    <Text style={{ color: 'red' }}>{OWind[index].label}</Text>
                                    <Text style={{ color: 'red' }}>{players[wind.value]?.name}</Text>
                                </Space>
                                : <Space direction='vertical'>
                                    <Text>{OWind[index].label}</Text>
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