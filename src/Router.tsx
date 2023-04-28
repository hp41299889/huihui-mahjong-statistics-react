import PlayerCreate from "./pages/player/PlayerCreate";
import PlayerSearch from "./pages/player/PlayerSearch";
import PlayersSearch from "pages/player/PlayersSearch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./layouts/Base";
import Record from "./pages/record/Record";
import Round from "./pages/round/Round";
import Home from "./pages/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Base />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/player/create' element={<PlayerCreate />} />
                    <Route path='/player/search' element={<PlayerSearch />} />
                    <Route path='/players/search' element={<PlayersSearch />} />
                    <Route path='/round' element={<Round />} />
                    <Route path='/record' element={<Record />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default Router;