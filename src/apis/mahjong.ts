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

export const getAllPlayers = async () => {
    return await mahjongApi.get('/player');
};

export const getPlayerStatistics = async () => {
    return await mahjongApi.get('/player/statistics');
};

//record
export const postRecord = async (data: IPostRecord) => {
    return await mahjongApi.post('/record', data);
};

export const deleteLastRecord = async () => {
    return await mahjongApi.delete('/record');
};

//round
export const postRound = async (data: IPostRound) => {
    return await mahjongApi.post('/round', data);
};

export const postResetCurrentRound = async () => {
    return await mahjongApi.post('/round/currentRound');
};

export const getHistoryByDate = async (date: string) => {
    return await mahjongApi.get(`/round/history/${date}`);
};

export const getCurrentRound = async () => {
    return await mahjongApi.get('/round/currentRound');
};

export const getExistDate = async () => {
    return await mahjongApi.get('/round/history/existDates');
};

export const deleteCurrentRound = async () => {
    return await mahjongApi.delete('/round/currentRound');
};