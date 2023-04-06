import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface IMahjong {
    recordFormSubmitDisabled: boolean;
};

const initialState: IMahjong = {
    recordFormSubmitDisabled: true
}

export const slice = createSlice({
    name: 'mahjong',
    initialState,
    reducers: {
        setRecordFormSubmitDisabled: (state, action) => {
            state.recordFormSubmitDisabled = action.payload;
        }
    }
});

export const { setRecordFormSubmitDisabled } = slice.actions;

export const selectRecordFormSubmitDisabled = (state: RootState) =>
    state.mahjong.recordFormSubmitDisabled;

export default slice.reducer;