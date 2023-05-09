import React, { useState } from "react";
import { Typography, Table, Button, Modal, } from "antd";
import { ICurrentRound } from "../interface";
import { EWind } from "../enum";
import { ColumnsType } from "antd/es/table";
import { deleteCurrentRound } from "apis/mahjong";
import { useAppDispatch } from "redux/hook";
import { fetchCurrentRound } from "redux/mahjong";

const { Text } = Typography;

interface IProps {
    currentRound: ICurrentRound;
};

interface IColumn {
    key: string | React.ReactNode;
    uKey: number;
    win: number;
    selfDrawn: number;
    lose: number;
    fake: number;
    amount: number;
};

const PlayerList: React.FC<IProps> = (props) => {
    const { currentRound } = props;
    const { east, south, west, north } = currentRound.players;
    const [isDeleteCurrentRoundModal, setIsDeleteCurrentRoundModal] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const showDeleteCurrentRoundModal = () => {
        setIsDeleteCurrentRoundModal(true);
    };

    const onDeleteLastRecordModalCancel = () => {
        setIsDeleteCurrentRoundModal(false);
    };

    const onDeleteLastRecordModalOk = async () => {
        setIsDeleteCurrentRoundModal(false);
        await deleteCurrentRound();
        await dispatch(fetchCurrentRound());
    };

    const columns: ColumnsType<IColumn> = [
        {
            title: <>
                <Button
                    type='primary'
                    danger
                    onClick={showDeleteCurrentRoundModal}
                >
                    刪除這將
                </Button>
                <Modal
                    title='刪除這將'
                    open={isDeleteCurrentRoundModal}
                    onOk={onDeleteLastRecordModalOk}
                    onCancel={onDeleteLastRecordModalCancel}
                />
            </>,
            dataIndex: 'key',
            rowScope: 'row',
            width: 80
        },
        {
            key: 'playerList_column_win',
            title: '胡',
            dataIndex: 'win',
            align: 'right'
        },
        {
            key: 'playerList_column_selfDrawn',
            title: '自摸',
            dataIndex: 'selfDrawn',
            align: 'right'
        },
        {
            key: 'playerList_column_lose',
            title: '放槍',
            dataIndex: 'lose',
            align: 'right'
        },
        {
            key: 'playerList_column_fake',
            title: '詐胡',
            dataIndex: 'fake',
            align: 'right'
        },
        {
            key: 'playerList_column_amount',
            title: '小計',
            dataIndex: 'amount',
            align: 'right'
        }
    ];

    const data: IColumn[] = [
        {
            key: <Text
                key='playerList_data_east'
                style={currentRound.dealer === EWind.EAST ? { color: 'red' } : {}}>
                {`${east.name}`}
            </Text>,
            uKey: 0,
            win: east.win,
            selfDrawn: east.selfDrawn,
            lose: east.lose,
            fake: east.fake,
            amount: east.amount
        },
        {
            key: <Text
                key='playerList_data_south'
                style={currentRound.dealer === EWind.SOUTH ? { color: 'red' } : {}}>
                {`${south.name}`}
            </Text>,
            uKey: 1,
            win: south.win,
            selfDrawn: south.selfDrawn,
            lose: south.lose,
            fake: south.fake,
            amount: south.amount
        },
        {
            key: <Text
                key='playerList_data_west'
                style={currentRound.dealer === EWind.WEST ? { color: 'red' } : {}}>
                {`${west.name}`}
            </Text>,
            uKey: 2,
            win: west.win,
            selfDrawn: west.selfDrawn,
            lose: west.lose,
            fake: west.fake,
            amount: west.amount
        },
        {
            key: <Text
                key='playerList_data_north'
                style={currentRound.dealer === EWind.NORTH ? { color: 'red' } : {}}>
                {`${north.name}`}
            </Text>,
            uKey: 3,
            win: north.win,
            selfDrawn: north.selfDrawn,
            lose: north.lose,
            fake: north.fake,
            amount: north.amount
        }
    ];

    return (
        <Table
            size='small'
            dataSource={data}
            columns={columns}
            rowKey={(row) => `playerList_row_${row.uKey}`}
            pagination={false}
            style={{
                width: '100%'
            }}
        />
    )
};

export default PlayerList;