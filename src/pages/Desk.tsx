import React from "react";
import { Button, Form } from 'antd';
import PlayerForm from "../components/PlayerForm";
import './desk.css';

const Desk: React.FC = () => {
    const onSubmit = (values: any) => {
        console.table(values);
        console.log(values);
    };

    return (
        <Form
            id='desk-form'
            name='desk-form'
            onFinish={onSubmit}
        >
            <div className='form-top'>
                <PlayerForm
                    position='north'
                    positionTitle='North'
                />
            </div>
            <div className='form-middle-area'>
                <div className='form-middle'>
                    <PlayerForm
                        position='west'
                        positionTitle='West'
                    />
                </div>
                <div className='form-middle'>
                    <PlayerForm
                        position='east'
                        positionTitle='East'
                    />
                </div>
            </div>
            <div className='form-bottom'>
                <PlayerForm
                    position='south'
                    positionTitle='South'
                />
            </div>
            <Form.Item
                className='form-button-area'
            >
                <Button htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};

export default Desk;