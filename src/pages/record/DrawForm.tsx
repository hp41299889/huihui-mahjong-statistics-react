import React from "react";
import { Form, Button } from "antd";

const DrawForm: React.FC = () => {
    return (
        <>
            流局
            <Form.Item>
                <Button htmlType='submit' type='primary'>
                    Submit
                </Button>
            </Form.Item>
        </>
    )
};

export default DrawForm;