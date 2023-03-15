import React, { ReactNode } from "react";
import { Layout, Dropdown, Space, Select, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";


const items: MenuProps['items'] = [
    {
        key: '1',
        label: <Link to='/player'>Player</Link>
    },
    {
        key: '2',
        label: <Link to='/round'>Round</Link>
    },
    {
        key: '3',
        label: <Link to='/record'>Record</Link>
    },
];

const Header: React.FC = () => {
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <DownOutlined />
        </Dropdown>
    )
};

export default Header;