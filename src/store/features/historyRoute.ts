import { createSlice } from '@reduxjs/toolkit';

export interface HistoryRouteInterface {
  [key: string]: string | number | boolean[];
}

const initialState: HistoryRouteInterface = {
  currentObjHistory: [],
};

const slice = createSlice({
  name: 'historyRoute',
  initialState,
  reducers: {
    actionUpdateObjHistory(state, action) {
      state.currentObjHistory = action.payload;
    },
  },
});

export const { actionUpdateObjHistory } = slice.actions;
export default slice.reducer;
