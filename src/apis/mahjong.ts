import { EDeskType, EEndType, EWind } from 'pages/enum';
import { mahjongApi } from 'utils/request';

interface IPostPlayer {
    name: string;
};

interface IPostRound {
    deskType: EDeskType;
    base: number;
    point: number;
    east: string;
    south: string;
    west: string;
    north: string;
};

interface IPostRecord {
    winner: string;
    loser: string[];
    endType: EEndType;
    point: number;
};

//player
export const postPlayer = async (data: IPostPlayer) => {
    return await mahjongApi.post('/player', data)
};

export const getPlayers = async () => {
    return await mahjongApi.get('/player');
};

export const getPlayer = async (name: string) => {
    return await mahjongApi.get(`/player/${name}`);
};

//round
export const getRound = async () => {
    return await mahjongApi.get('/round');
};

export const postRound = async (data: IPostRound) => {
    return await mahjongApi.post('/round', data);
};

//record
export const postRecord = async (roundUid: string, data: IPostRecord) => {
    return await mahjongApi.post(`/record/${roundUid}`, data);
};