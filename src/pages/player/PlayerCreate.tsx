import React, { useState } from 'react';
import { Breadcrumb, Button, Form, Input, Layout, message } from "antd";
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

import { postPlayer } from 'apis/mahjong';

interface IFormValue {
    name: string;
};

const breadcrumbItems: ItemType[] = [
    {
        title: '玩家'
    },
    {
        title: '新增玩家'
    }
];

const PlayerCreate: React.FC = () => {
    const [form] = Form.useForm();
    const [formSubmitDisabled, setFormSubmitDisabled] = useState<boolean>(true);

    const onFormSubmitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setFormSubmitDisabled(false);
        } else {
            setFormSubmitDisabled(true);
        };
    };

    const onFormSubmit = async (value: IFormValue) => {
        await postPlayer(value)
            .then(res => {
                if (res.data.status === 'success') {
                    message.success(`新增Player：${value.name}成功！`);
                    form.resetFields();
                } else {
                    message.error(`新增Player：${value.name}失敗！`);
                    message.error(res.data.data);
                };
            })
            .catch(err => {
                message.error(`新增Player：${value.name}失敗！`);
                console.error(err);
            });
    };

    return (
        <Layout>
            <Breadcrumb
                items={breadcrumbItems}
            />
            <Form
                form={form}
                onFinish={onFormSubmit}
            >
                <Form.Item
                    label='名稱'
                    name='name'
                >
                    <Input
                        onChange={onFormSubmitChange}
                        placeholder='點擊輸入玩家名稱'
                    />
                </Form.Item>
                <Form.Item
                    style={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={formSubmitDisabled}
                    >
                        送出
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
};

export default PlayerCreate;