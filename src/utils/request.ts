import axios, { AxiosInstance } from 'axios';

const request = (baseUrl = ''): AxiosInstance => {
    const instance = axios.create({
        baseURL: baseUrl
    });
    return instance;
};

export const mahjongApi = request(process.env.REACT_APP_HUIHUI_MAHJONG_API_BASE_URL);