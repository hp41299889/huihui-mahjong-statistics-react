import Desk from "./pages/Desk";
import Player from "./pages/Player";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./layouts/Base";
import Record from "./pages/Record";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Base />}>
                    <Route path='/' />
                    <Route path='/desk' element={<Desk />} />
                    <Route path='/player' element={<Player />} />
                    <Route path='/record' element={<Record />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default Router;