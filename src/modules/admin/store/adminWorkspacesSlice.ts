import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Workspace } from '../helper/interface';
import { getAdminWorkspaces, updateAdminWorkspace } from '../api/admin';
interface AdminWorkspacesState {
  workspaces: Workspace[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminWorkspacesState = {
  workspaces: [],
  loading: false,
  error: null,
};

export const fetchWorkspaces = createAsyncThunk(
  'adminWorkspaces/fetchWorkspaces',
  async ({
    keyword = '',
    page = 1,
    limit = 20,
  }: {
    keyword?: string;
    page?: number;
    limit?: number;
  }) => {
    const res = await getAdminWorkspaces(keyword, page, limit);
    return res.data as Workspace[];
  },
);

// Update workspace
export const updateWorkspace = createAsyncThunk(
  'adminWorkspaces/updateWorkspace',
  async ({
    workspaceId,
    payload,
  }: {
    workspaceId: string;
    payload: Partial<Workspace>;
  }) => {
    const res = await updateAdminWorkspace(workspaceId, payload);
    console.log("res", res);
    
    return { workspaceId, data: res as Workspace };
  },
);

const adminWorkspacesSlice = createSlice({
  name: 'adminWorkspaces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWorkspaces.fulfilled,
        (state, action: PayloadAction<Workspace[]>) => {
          state.loading = false;
          state.workspaces = action.payload;
        },
      )
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch workspaces';
      })
      .addCase(
        updateWorkspace.fulfilled,
        (
          state,
          action: PayloadAction<{ workspaceId: string; data: Workspace }>,
        ) => {
           console.log("Update fulfilled:", action.payload);
          state.workspaces = state.workspaces.map((w) =>
            w._id === action.payload.workspaceId
              ? { ...w, ...action.payload.data }
              : w,
          );
        },
      );
  },
});

export default adminWorkspacesSlice.reducer;
