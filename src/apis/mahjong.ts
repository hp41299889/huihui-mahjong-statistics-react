import { EDeskType, EEndType } from 'pages/enum';
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

export interface IPostRecord {
    winner: string;
    losers: string[];
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

export const getPlayerStatistics = async () => {
    return await mahjongApi.get('/player/statistics');
};

//round
export const getRound = async () => {
    return await mahjongApi.get('/round');
};

export const postRound = async (data: IPostRound) => {
    return await mahjongApi.post('/round', data);
};

export const postResetCurrentRound = async () => {
    return await mahjongApi.post('/round/reset');
};

export const deleteCurrentRound = async () => {
    return await mahjongApi.delete('/round');
};

//record
export const postRecord = async (roundUid: string, data: IPostRecord) => {
    return await mahjongApi.post(`/record/${roundUid}`, data);
};

export const deleteLastRecord = async (roundUid: string) => {
    return await mahjongApi.delete(`/record/${roundUid}`);
};