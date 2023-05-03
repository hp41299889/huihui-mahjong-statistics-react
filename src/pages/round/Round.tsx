import React, { useEffect, useState } from "react";
import { Button, Form, Input, Layout, Row, Col, Select, Breadcrumb } from "antd";
import { useNavigate } from 'react-router-dom';
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import { EDeskType, ERoundStatus } from "pages/enum";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { fetchStatistics, fetchRound, selectStatistics } from "redux/mahjong";
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

const Round: React.FC = () => {
    const [form] = Form.useForm();
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    const dispatch = useAppDispatch();
    const statistics = useAppSelector(selectStatistics);
    const navigate = useNavigate();
    console.log(statistics);


    const playerSelectOptions = Object.keys(statistics).map(player => ({ value: player, label: player }));

    const onEastChange = (value: string) => {
        if (form.getFieldValue('south') === value) form.setFieldValue('south', null);
        if (form.getFieldValue('west') === value) form.setFieldValue('west', null);
        if (form.getFieldValue('north') === value) form.setFieldValue('north', null);
    };

    const onSouthChange = (value: string) => {
        if (form.getFieldValue('east') === value) form.setFieldValue('east', null);
        if (form.getFieldValue('west') === value) form.setFieldValue('west', null);
        if (form.getFieldValue('north') === value) form.setFieldValue('north', null);
    };

    const onWestChange = (value: string) => {
        if (form.getFieldValue('east') === value) form.setFieldValue('east', null);
        if (form.getFieldValue('south') === value) form.setFieldValue('south', null);
        if (form.getFieldValue('north') === value) form.setFieldValue('north', null);
    };

    const onNorthChange = (value: string) => {
        if (form.getFieldValue('east') === value) form.setFieldValue('east', null);
        if (form.getFieldValue('south') === value) form.setFieldValue('south', null);
        if (form.getFieldValue('west') === value) form.setFieldValue('west', null);
    };

    const onCheckForm = () => {
        const values = form.getFieldsValue(['east', 'south', 'west', 'north']);
        const uniqueValues = new Set(Object.values(values));
        const hasDuplicates = uniqueValues.size !== Object.keys(values).length;
        const allFieldsHaveValue = Object.values(values).every(value => !!value);
        setSubmitDisabled(!allFieldsHaveValue || hasDuplicates);
    };

    const onSubmit = async (value: IFormValue) => {
        await postRound(value)
            .then(res => {
                navigate('/record');
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        dispatch(fetchRound())
            .then(res => {
                const { status } = res.payload;
                if (status === ERoundStatus.IN_PROGRESS || status === ERoundStatus.END) {
                    navigate('/record');
                } else {
                    dispatch(fetchStatistics());
                };
            });
    }, [dispatch, navigate]);

    return (
        <Layout>
            <Breadcrumb items={breadcrumbItems} />
            <Form
                form={form}
                onFinish={onSubmit}
                onFieldsChange={onCheckForm}
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
                            <Select
                                options={playerSelectOptions}
                                onChange={onEastChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='南' name='south'>
                            <Select
                                options={playerSelectOptions}
                                onChange={onSouthChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='西' name='west'>
                            <Select
                                options={playerSelectOptions}
                                onChange={onWestChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='北' name='north'>
                            <Select
                                options={playerSelectOptions}
                                onChange={onNorthChange}
                            />
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
                        disabled={submitDisabled}
                    >
                        送出
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
};
export default Round;