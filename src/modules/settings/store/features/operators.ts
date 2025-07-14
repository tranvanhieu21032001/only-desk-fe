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

export const addOperatorToWorkspace = createAsyncThunk(
  'operators/add',
  async (
    params: {
      workspaceId: string;
      email: string;
      role: string;
      t: TFunction;
    },
    { dispatch },
  ) => {
    const { workspaceId, email, role, t } = params;

    await addMemberToWorkspace(workspaceId, { email, role }, t);
    dispatch(fetchOperators());
    return { email };
  },
);

export const removeOperatorFromWorkspace = createAsyncThunk(
  'operators/remove',
  async (
    params: { workspaceId: string; memberId: string; t: TFunction },
    { dispatch },
  ) => {
    const { workspaceId, memberId, t } = params;

    await removeMemberFromWorkspace(workspaceId, memberId, t);
    dispatch(fetchOperators());
    return memberId;
  },
);

export const updateOperatorInWorkspace = createAsyncThunk(
  'operators/update',
  async (
    params: {
      workspaceId: string;
      memberId: string;
      role?: string;
      status?: string;
      t: TFunction;
    },
    { dispatch },
  ) => {
    const { workspaceId, memberId, role, status, t } = params;

    await updateMemberInWorkspace(workspaceId, memberId, { role, status }, t);
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
        state.isLoading = true;
      })
      .addCase(fetchOperators.fulfilled, (state, action) => {
        state.isLoading = false;
        state.operators = action.payload.map((op) => ({ ...op }));
      })
      .addCase(fetchOperators.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(addOperatorToWorkspace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOperatorToWorkspace.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addOperatorToWorkspace.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(removeOperatorFromWorkspace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeOperatorFromWorkspace.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeOperatorFromWorkspace.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateOperatorInWorkspace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOperatorInWorkspace.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOperatorInWorkspace.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default operatorsSlice.reducer;
