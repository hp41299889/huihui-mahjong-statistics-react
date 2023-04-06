import { Button, Form, Input, Layout, message } from "antd";
import { mahjongApi } from "../../utils/request";
import { useNavigate } from "react-router-dom";

interface IPlayerFormValue {
    name: string;
};

const PlayerCreate: React.FC = () => {
    const navigate = useNavigate();
    const onSubmit = (value: IPlayerFormValue) => {
        mahjongApi.post('/player', value)
            .then(res => {
                if (res.data.status === 'success') {
                    message.success(`新增Player：${value.name}成功！`);
                    navigate('/player/create');
                } else {
                    message.error(`新增Player：${value.name}失敗！`);
                };
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
                <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
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

export default PlayerCreate;