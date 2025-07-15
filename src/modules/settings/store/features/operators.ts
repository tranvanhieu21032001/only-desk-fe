import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFunction } from 'i18next';
import { fetchQuery } from 'react-relay';

import relayEnvironment from '@/relay/RelayEnvironment';
import { operatorsQuery } from '@/relay/OperatorsQuery';
import { OperatorsQuery } from '@/relay/__generated__/OperatorsQuery.graphql';
import {
  addMemberToWorkspace,
  removeMemberFromWorkspace,
  updateMemberInWorkspace,
} from '../../api/operators';

export interface Operator {
  id: string;
  rawId: string;
  user: {
    avatar?: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  role: string;
  status: string;
}

interface OperatorsState {
  isFetching: boolean;
  isAdding: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  operators: Operator[];
}

const initialState: OperatorsState = {
  isFetching: false,
  isAdding: false,
  isRemoving: false,
  isUpdating: false,
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

export const addOperatorToWorkspace = createAsyncThunk(
  'operators/add',
  async (
    params: { email: string; role: string; t: TFunction },
    { dispatch },
  ) => {
    const { email, role, t } = params;
    await addMemberToWorkspace({ email, role }, t);
    dispatch(fetchOperators());
    return { email };
  },
);

export const removeOperatorFromWorkspace = createAsyncThunk(
  'operators/remove',
  async (
    params: { memberId: string; t: TFunction },
    { dispatch },
  ) => {
    const { memberId, t } = params;
    await removeMemberFromWorkspace(memberId, t);
    dispatch(fetchOperators());
    return memberId;
  },
);

export const updateOperatorInWorkspace = createAsyncThunk(
  'operators/update',
  async (
    params: { memberId: string; role?: string; status?: string; t: TFunction },
    { dispatch },
  ) => {
    const { memberId, role, status, t } = params;
    await updateMemberInWorkspace(memberId, { role, status }, t);
    dispatch(fetchOperators());
    return memberId;
  },
);

const operatorsSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperators.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchOperators.fulfilled, (state, action) => {
        state.isFetching = false;
        state.operators = action.payload;
      })
      .addCase(fetchOperators.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(addOperatorToWorkspace.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addOperatorToWorkspace.fulfilled, (state) => {
        state.isAdding = false;
      })
      .addCase(addOperatorToWorkspace.rejected, (state) => {
        state.isAdding = false;
      })
      .addCase(removeOperatorFromWorkspace.pending, (state) => {
        state.isRemoving = true;
      })
      .addCase(removeOperatorFromWorkspace.fulfilled, (state) => {
        state.isRemoving = false;
      })
      .addCase(removeOperatorFromWorkspace.rejected, (state) => {
        state.isRemoving = false;
      })
      .addCase(updateOperatorInWorkspace.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateOperatorInWorkspace.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateOperatorInWorkspace.rejected, (state) => {
        state.isUpdating = false;
      });
  },
});

export default operatorsSlice.reducer;
