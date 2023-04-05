import React, { useState, useEffect } from "react";
import { Button, Form, Input, Layout, Row, Col, Select } from "antd";
import { useNavigate } from 'react-router-dom';
import { mahjongApi } from "../../utils/request";
import { IPlayer } from "../interface";

const Round: React.FC = () => {
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const navigate = useNavigate();

    const onSubmit = (value: any) => {
        mahjongApi.post('/round', value)
            .then(res => {
                navigate('/record')
            })
            .catch(err => {
                console.log(err);
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
        mahjongApi.get('/player')
            .then(res => {
                setPlayers(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Layout>
            <Form
                onFinish={onSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label='底' name='base'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='台' name='point'>
                            <Input />
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
                    <Button htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </Layout>
    )
};
export default Round;