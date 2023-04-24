import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getPlayers, getRound } from 'apis/mahjong';
import { ICurrentRound, IPlayer } from 'pages/interface';
import { EDeskType, EWind } from 'pages/enum';

interface IMahjong {
    currentRound: ICurrentRound;
    players: IPlayer[];
    recordFormSubmitDisabled: boolean;
};

const initialState: IMahjong = {
    currentRound: {
        roundUid: '',
        deskType: EDeskType.AUTO,
        base: 0,
        point: 0,
        players: {
            east: {
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
        records: 0,
        draws: 0
    },
    players: [],
    recordFormSubmitDisabled: true
}

export const fetchRound = createAsyncThunk(
    '/mahjong/fetchRound',
    async () => {
        return (await getRound()).data.data;
    }
);

export const fetchPlayers = createAsyncThunk(
    '/mahjong/fetchPlayers',
    async () => {
        return (await getPlayers()).data.data;
    }
);

export const slice = createSlice({
    name: 'mahjong',
    initialState,
    reducers: {
        setRecordFormSubmitDisabled: (state, action) => {
            state.recordFormSubmitDisabled = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayers.fulfilled, (state, action) => {
                state.players = action.payload;
            })
            .addCase(fetchRound.fulfilled, (state, action) => {
                state.currentRound = action.payload;
            })
    }
});

export const { setRecordFormSubmitDisabled } = slice.actions;

export const selectCurrentRound = (state: RootState) => {
    return state.mahjong.currentRound;
}

export const selectRecordFormSubmitDisabled = (state: RootState) => {
    return state.mahjong.recordFormSubmitDisabled;
};

export const selectPlayers = (state: RootState) => {
    return state.mahjong.players;
};

export default slice.reducer;