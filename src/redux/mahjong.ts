import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getPlayerStatistics, getRound } from 'apis/mahjong';
import { ICurrentRound, IStatistics } from 'pages/interface';
import { EDeskType, ERoundStatus, EWind } from 'pages/enum';

interface IMahjong {
    currentRound: ICurrentRound;
    statistics: IStatistics;
};

const initialState: IMahjong = {
    currentRound: {
        status: ERoundStatus.EMPTY,
        round: {
            uid: '',
            createdAt: new Date().toISOString(),
            deskType: EDeskType.AUTO,
            base: 0,
            point: 0,
            records: []
        },
        records: [],
        players: {
            east: {
                id: 0,
                name: '',
                win: 0,
                lose: 0,
                selfDrawn: 0,
                beSelfDrawn: 0,
                draw: 0,
                fake: 0,
                amount: 0
            },
            south: {
                id: 0,
                name: '',
                win: 0,
                lose: 0,
                selfDrawn: 0,
                beSelfDrawn: 0,
                draw: 0,
                fake: 0,
                amount: 0
            },
            west: {
                id: 0,
                name: '',
                win: 0,
                lose: 0,
                selfDrawn: 0,
                beSelfDrawn: 0,
                draw: 0,
                fake: 0,
                amount: 0
            },
            north: {
                id: 0,
                name: '',
                win: 0,
                lose: 0,
                selfDrawn: 0,
                beSelfDrawn: 0,
                draw: 0,
                fake: 0,
                amount: 0
            }
        },
        circle: EWind.EAST,
        dealer: EWind.EAST,
        dealerCount: 0,
        venue: []
    },
    statistics: {}
}

export const fetchRound = createAsyncThunk(
    '/mahjong/fetchRound',
    async () => {
        return (await getRound()).data.data;
    }
);

export const fetchStatistics = createAsyncThunk(
    '/mahjong/fetchStatistics',
    async () => {
        return (await getPlayerStatistics()).data.data;
    }
);

export const slice = createSlice({
    name: 'mahjong',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.statistics = action.payload;
            })
            .addCase(fetchRound.fulfilled, (state, action) => {
                state.currentRound = action.payload;
            })
    }
});

export const selectCurrentRound = (state: RootState) => {
    return state.mahjong.currentRound;
};

export const selectStatistics = (state: RootState) => {
    return state.mahjong.statistics;
};

export default slice.reducer;