import React from "react";
import { Button, Dropdown, Layout, Typography } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";


const items: MenuProps['items'] = [
    {
        key: '0',
        label: <Link to='/'>首頁</Link>
    },
    {
        key: '1',
        label: <Link to='/player/create'>新增玩家</Link>
    },
    {
        key: '2',
        label: <Link to='/player/search'>搜尋玩家</Link>
    },
    {
        key: '3',
        label: <Link to='/players/search'>搜尋玩家s</Link>
    },
    {
        key: '4',
        label: <Link to='/round'>新增一將</Link>
    },
    {
        key: '5',
        label: <Link to='/record'>新增一局</Link>
    },
];

const Header: React.FC = () => {
    return (
        <Layout.Header style={{ background: '#ffffff', padding: '0' }} >
            <Dropdown menu={{ items }} trigger={['click']}>
                <Button style={{ height: 'auto' }}>
                    <MenuOutlined style={{ fontSize: '22px' }} />
                    <Typography.Text style={{ fontSize: '22px' }}>
                        菜單
                    </Typography.Text>
                </Button>
            </Dropdown>
        </Layout.Header>
    )
};

export default Header;