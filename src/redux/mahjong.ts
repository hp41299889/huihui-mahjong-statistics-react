import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getPlayers } from 'apis/mahjong';
import { IPlayer } from 'pages/interface';

interface IMahjong {
    players: IPlayer[];
    recordFormSubmitDisabled: boolean;
};

const initialState: IMahjong = {
    players: [],
    recordFormSubmitDisabled: true
}

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
        builder.addCase(fetchPlayers.fulfilled, (state, action) => {
            state.players = action.payload;
        })
    }
});

export const { setRecordFormSubmitDisabled } = slice.actions;

export const selectRecordFormSubmitDisabled = (state: RootState) => {
    return state.mahjong.recordFormSubmitDisabled;
};

export const selectPlayers = (state: RootState) => {
    return state.mahjong.players;
};

export default slice.reducer;