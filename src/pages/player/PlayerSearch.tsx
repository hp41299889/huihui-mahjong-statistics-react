import { Button, Form, Input } from 'antd';
import React from 'react';
import { mahjongApi } from '../../utils/request';

const PlayerSearch: React.FC = () => {
    const onSubmit = (value: any) => {
        console.log(value);
        mahjongApi.get(`/player/${value.name}`)
            .then((res) => {
                console.log(res);

            })

    };

    return (
        <Form
            onFinish={onSubmit}
        >
            <Form.Item name='name'>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' type='primary'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};

export default PlayerSearch;