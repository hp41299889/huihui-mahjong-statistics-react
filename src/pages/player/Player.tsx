import { Button, Form, Input, Layout } from "antd";
import { mahjongApi } from "../../utils/request";
import { useNavigate } from "react-router-dom";

const Player = () => {
    const navigate = useNavigate();
    const onSubmit = (value: any) => {
        console.log(value);
        mahjongApi.post('/player', value)
            .then(res => {
                console.log(res.data);
                navigate('/player');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Layout>
            <Form
                onFinish={onSubmit}
            >
                <Form.Item
                    label='名稱(一個字)'
                    name='name'
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
};

export default Player;