import { Typography } from "antd";
import { IRecordForm } from "../../interface";
import { EWindLabel } from "../../enum";
import './playerList.css';

interface IPlayerList {
    dealerNum: number;
};

const windList = [
    'east',
    'south',
    'west',
    'north'
];

const windLabelList: EWindLabel[] = [
    EWindLabel.EAST,
    EWindLabel.SOUTH,
    EWindLabel.WEST,
    EWindLabel.NORTH
];

const PlayerList = (props: IPlayerList) => {
    const { dealerNum } = props;
    const renderPlayerList = (dealerNum: number) => {
        windList.forEach((value, index) => {
            return (
                <div className={`player ${dealerNum === index ? 'dealer' : ''}`}>
                    <Typography.Text className='wind'>{windLabelList[index]}</Typography.Text>
                    <Typography.Text className='player-name'>霖</Typography.Text>
                </div>
            )
        });
    };

    return (
        <>
            {renderPlayerList(dealerNum)}
        </>
    )
};

export default PlayerList;