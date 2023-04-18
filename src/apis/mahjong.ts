import { mahjongApi } from 'utils/request';

export const getPlayers = async () => {
    return await mahjongApi.get('/player');
};

export const getPlayer = async (name: string) => {
    return await mahjongApi.get(`/player/${name}`);
};