import React, { useState, useEffect } from "react";
import { Button, Form, Input, Layout, Row, Col, Select } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const apiUrl = `http://${process.env.HUIHUI_MAHJONG_API_BASE_URL}`;
interface IPlayer {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

const Round: React.FC = () => {
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const navigate = useNavigate();
    const onSubmit = (value: any) => {
        axios.post(`http://10.200.25.179:8080/round`, value)
            .then(res => {
                navigate('/record');
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
        axios.get(`http://10.200.25.179:8080/player`)
            .then(res => {
                setPlayers(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
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
                        <Form.Item label='東' name='eastName'>
                            {renderPlayerSelectOption()}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='南' name='southName'>
                            {renderPlayerSelectOption()}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='西' name='westName'>
                            {renderPlayerSelectOption()}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='北' name='northName'>
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