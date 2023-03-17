import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Base = () => {
    return (
        <Layout>
            <Header />
            <Layout.Content>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
};

export default Base;