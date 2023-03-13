import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Base = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
};

export default Base;