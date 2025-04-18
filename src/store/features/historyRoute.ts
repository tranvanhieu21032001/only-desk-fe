import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  currentObjHistory: [],
};

const slice = createSlice({
  name: "historyRoute",
  initialState,
  reducers: {
    actionUpdateObjHistory(state, action) {
      state.currentObjHistory = action.payload;
    },
  },
});

export const { actionUpdateObjHistory } = slice.actions;
export default slice.reducer;
