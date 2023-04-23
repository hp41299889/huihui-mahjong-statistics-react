import React from "react";
import { Form, Input } from "antd";
import { useAppDispatch } from "../../redux/hook";
import { setRecordFormSubmitDisabled } from "../../redux/mahjong";

const PointIntput: React.FC = () => {
    const dispatch = useAppDispatch();

    const onPointChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value) {
            dispatch(setRecordFormSubmitDisabled(false));
        } else {
            dispatch(setRecordFormSubmitDisabled(true));
        };
    };

    return (
        <Form.Item
            label={'台'}
            name={'point'}
        >
            <Input
                inputMode='numeric'
                type='number'
                onChange={onPointChange}
            />
        </Form.Item>
    )
};
export default PointIntput;