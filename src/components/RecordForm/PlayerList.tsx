import { Typography } from "antd";

const PlayerList = () => {
    return (
        <>
            <div className='player'>
                <Typography.Text className='wind'>東</Typography.Text>
                <Typography.Text className='player-name'>霖</Typography.Text>
            </div>
            <div className='player'>
                <Typography.Text className='wind'>南</Typography.Text>
                <Typography.Text className='player-name'>樺</Typography.Text>
            </div>
            <div className='player'>
                <Typography.Text className='wind'>西</Typography.Text>
                <Typography.Text className='player-name'>丁</Typography.Text>
            </div>
            <div className='player'>
                <Typography.Text className='wind'>北</Typography.Text>
                <Typography.Text className='player-name'>呆</Typography.Text>
            </div>
        </>
    )
};

export default PlayerList;