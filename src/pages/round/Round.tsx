import React, { useEffect } from "react";
import { Button, Form, Input, Layout, Row, Col, Select, Breadcrumb } from "antd";
import { useNavigate } from 'react-router-dom';
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import { EDeskType } from "pages/enum";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { fetchPlayers, fetchRound, selectPlayers } from "redux/mahjong";
import { postRound } from "apis/mahjong";

const breadcrumbItems: ItemType[] = [
    {
        title: '將'
    },
    {
        title: '新增將'
    }
];

const deskTypeOption = [
    {
        label: '電動', value: EDeskType.AUTO
    },
    {
        label: '手動', value: EDeskType.MANUAL
    }
];

interface IFormValue {
    deskType: EDeskType;
    base: number;
    point: number;
    east: string;
    south: string;
    west: string;
    north: string;
};

//TODO 選擇東南西北要有防呆防止選到同一個玩家
const Round: React.FC = () => {
    const dispatch = useAppDispatch();
    const players = useAppSelector(selectPlayers);
    const navigate = useNavigate();

    const onSubmit = async (value: IFormValue) => {
        await postRound(value)
            .then(res => {
                navigate('/record');
            })
            .catch(err => {
                console.error(err);
            });
    };

    const renderPlayerSelectOption = () => (
        <Select
            options={players.map(player => ({
                value: player.name,
                label: player.name
            }))}
        />
    );

    useEffect(() => {
        dispatch(fetchRound())
            .then(res => {
                if (res.payload.roundUid) {
                    navigate('/record');
                };
            });
        dispatch(fetchPlayers());
    }, [dispatch, navigate]);

    return (
        <Layout>
            <Breadcrumb items={breadcrumbItems} />
            <Form
                onFinish={onSubmit}
                initialValues={{
                    base: 100,
                    point: 20,
                    deskType: EDeskType.AUTO
                }}
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Row>
                    <Col span={8}>
                        <Form.Item label='底' name='base'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='台' name='point'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='桌子' name='deskType'>
                            <Select
                                options={deskTypeOption}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item label='東' name='east'>
                            {renderPlayerSelectOption()}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='南' name='south'>
                            {renderPlayerSelectOption()}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='西' name='west'>
                            {renderPlayerSelectOption()}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='北' name='north'>
                            {renderPlayerSelectOption()}
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    style={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}>
                    <Button
                        htmlType='submit'
                        type='primary'
                    >
                        送出
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
};
export default Round;