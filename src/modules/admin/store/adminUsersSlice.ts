import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAdminUsers, updateAdminUser } from '../api/admin';
import avatarDefault from '@/assets/images/avatar-default.png';

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

interface User {
  key: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created: string;
  updated: string;
}

interface AdminUsersState {
  users: User[];
  loading: boolean;
  pagination: Pagination;
}

const initialState: AdminUsersState = {
  users: [],
  loading: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

interface FetchUsersParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

// Fetch users
export const fetchUsers = createAsyncThunk(
  'adminUsers/fetchUsers',
  async ({ page = 1, pageSize = 10, keyword }: FetchUsersParams) => {
    const response = await getAdminUsers(page, pageSize, keyword);
    return {
      data: response.data.map((u: any) => ({
        key: u._id,
        avatar: u.avatar || avatarDefault,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Guest',
        email: u.email,
        role: u.role,
        status: u.status,
        created: new Date(u.createdAt).toLocaleDateString(),
        updated: new Date(u.updatedAt).toLocaleDateString(),
      })),
      page,
      pageSize,
      total: response.total || response.data.length,
    };
  },
);

// Update user
export const updateUser = createAsyncThunk(
  'adminUsers/updateUser',
  async ({
    userId,
    status,
  }: {
    userId: string;
    status: 'active' | 'pending';
  }) => {
    const res = await updateAdminUser(userId, { status });
    console.log("update User");
    
    return {
      userId,
      status: res.status,
    };
  },
);

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.users = action.payload.data;
        state.pagination = {
          current: action.payload.page,
          pageSize: action.payload.pageSize,
          total: action.payload.total,
        };
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      // Update user
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<{ userId: string; status: string }>) => {
          state.users = state.users.map((u) =>
            u.key === action.payload.userId
              ? { ...u, status: action.payload.status }
              : u,
          );
        },
      );
  },
});

export default adminUsersSlice.reducer;
