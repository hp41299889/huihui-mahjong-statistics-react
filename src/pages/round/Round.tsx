import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Round: React.FC = () => {
    const navigate = useNavigate();
    const onSubmit = (value: any) => {
        console.log(value);

        axios.post('http://localhost:8080/round', value)
            .then(res => {
                console.log(res);
                navigate('/record');
            })
            .catch(err => {
                console.log(err);
            })
    };
    return (
        <>
            <Form
                onFinish={onSubmit}
            >
                <Form.Item label='底' name='base'>
                    <Input />
                </Form.Item>
                <Form.Item label='台' name='point'>
                    <Input />
                </Form.Item>
                <Form.Item label='東' name='eastId'>
                    <Input />
                </Form.Item>
                <Form.Item label='南' name='southId'>
                    <Input />
                </Form.Item>
                <Form.Item label='西' name='westId'>
                    <Input />
                </Form.Item>
                <Form.Item label='北' name='northId'>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
};
export default Round;