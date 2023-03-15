import Desk from "./pages/Desk";
import Player from "./pages/player/Player";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./layouts/Base";
import Record from "./pages/record/Record";
import Round from "./pages/round/Round";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Base />}>
                    <Route path='/' />
                    <Route path='/desk' element={<Desk />} />
                    <Route path='/player' element={<Player />} />
                    <Route path='/round' element={<Round />} />
                    <Route path='/record' element={<Record />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default Router;