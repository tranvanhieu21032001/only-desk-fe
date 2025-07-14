import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuery } from 'relay-runtime';

import relayEnvironment from '@/relay/RelayEnvironment';
import { operatorsQuery } from '@/relay/OperatorsQuery';
import { OperatorsQuery } from '@/relay/__generated__/OperatorsQuery.graphql';

export interface Operator {
  avatar: any;
  id: string;
  rawId: string;
  user: { avatar: string; firstName: string; lastName: string; email: string };
  role: string;
  status: string;
}

interface OperatorsState {
  isLoading: boolean;
  operators: Operator[];
}

const initialState: OperatorsState = {
  isLoading: false,
  operators: [],
};

export const fetchOperators = createAsyncThunk('operators/fetch', async () => {
  const result = await fetchQuery<OperatorsQuery>(
    relayEnvironment,
    operatorsQuery,
    {},
    { fetchPolicy: 'network-only' },
  ).toPromise();

  return result?.operators ?? [];
});

/* -------- SLICE -------- */
const operatorsSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOperators.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOperators.fulfilled, (state, action) => {
        state.isLoading = false;
        state.operators = action.payload;
      })
      .addCase(fetchOperators.rejected, (state) => {
        state.isLoading = false;
        state.operators = [];
      });
  },
});

export default operatorsSlice.reducer;
