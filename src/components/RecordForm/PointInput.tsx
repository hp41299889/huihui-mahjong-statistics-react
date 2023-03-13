import React, { useState } from "react";
import { Form, Input } from "antd";

const PointIntput: React.FC = () => {
    const [point, setPoint] = useState(0);

    return (
        <>
            <Form.Item
                label={'台'}
                name={'point'}
            >
                <Input
                    inputMode='numeric'
                    type='number'
                />
            </Form.Item>
        </>
    )
};
export default PointIntput;