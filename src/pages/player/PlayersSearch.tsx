// import React, { useEffect, useState } from 'react';
// import { Button, Col, Form, Row, Select, Space } from 'antd';
// import { useAppDispatch, useAppSelector } from 'redux/hook';
// import { selectStatistics, fetchStatistics } from 'redux/mahjong';
// // import { getPlayer } from 'apis/mahjong';

// interface IDatas {
//     rounds: number,
//     records: number,
//     wins: number,
//     selfDrawns: number,
//     loses: number,
//     drawn: number,
//     fake: number
// };

const PlayersSearch: React.FC = () => {
    //     const dispatch = useAppDispatch();
    //     const players = useAppSelector(selectStatistics);
    //     const [datas, setDatas] = useState<IDatas>();

    //     const onChange = async (value: string) => {
    //         // const { data } = (await getPlayer(value)).data;
    //         // setDatas(data);
    //         // console.log(data);
    //     };

    //     // const selectOptions = players.map(player => {
    //     //     return {
    //     //         value: player.name,
    //     //         label: player.name
    //     //     };
    //     // });

    //     useEffect(() => {
    //         dispatch(fetchStatistics());
    //     }, [dispatch]);

    return (
        <></>
        // <Row>
        //             <Col span={24}>
        //                 <Form>
        //                     <Space.Compact style={{ display: 'flex', justifyContent: 'space-around' }}>
        //                         <Form.Item label='東' name='east'>
        //                             <Select
        //                                 style={{ borderRadius: '3px' }}
        //                                 showSearch
        //                                 // onChange={onChange}
        //                                 options={[]}
        //                             />
        //                         </Form.Item>
        //                         <Form.Item label='南' name='south'>
        //                             <Select
        //                                 style={{ borderRadius: '3px' }}
        //                                 showSearch
        //                                 // onChange={onChange}
        //                                 options={[]}
        //                             />
        //                         </Form.Item>
        //                         <Form.Item label='西' name='west'>
        //                             <Select
        //                                 style={{ borderRadius: '3px' }}
        //                                 showSearch
        //                                 // onChange={onChange}
        //                                 options={[]}
        //                             />
        //                         </Form.Item>
        //                         <Form.Item label='北' name='north'>
        //                             <Select
        //                                 style={{ borderRadius: '3px' }}
        //                                 showSearch
        //                                 // onChange={onChange}
        //                                 options={[]}
        //                             />
        //                         </Form.Item>
        //                     </Space.Compact>
        //                     <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
        //                         <Button htmlType='submit' type='primary'>
        //                             送出
        //                         </Button>
        //                     </Form.Item>
        //                 </Form>
        //             </Col>
        // </Row >
    )
};

export default PlayersSearch;