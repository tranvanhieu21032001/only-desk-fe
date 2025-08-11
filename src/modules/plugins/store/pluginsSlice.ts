// --- redux/pluginsSlice.ts ---
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllPlugins,
  getInstalledPlugins,
  installPlugin,
  uninstallPlugin,
  getPluginDetail,
  PluginDetail,
} from '../api/plugin.api';
import { PAGE_SIZE } from '@/shared/constant/common';

// Kiểu dữ liệu item plugin đơn giản
export interface PluginItem {
  id?: string;
  key: string;
  name: string;
  shortDesc?: string;
  type?: string;
  iconUrl?: string;
  isInstalled?: boolean;
}

// State quản lý
interface PluginsState {
  data: PluginItem[];               // Tất cả plugin
  installedPlugins: PluginItem[];  // Riêng plugin đã cài
  loading: boolean;
  error?: string | null;

  detail?: PluginDetail | null;
  detailLoading: boolean;
  detailError?: string | null;
}

const initialState: PluginsState = {
  data: [],
  installedPlugins: [],
  loading: false,
  error: null,

  detail: null,
  detailLoading: false,
  detailError: null,
};

// Async thunk lấy tất cả plugin
export const fetchPlugins = createAsyncThunk('plugins/fetchAll', async () => {
  const res = await getAllPlugins({ first: PAGE_SIZE });
  return (res?.edges || []).map((edge: any) => edge.node);
});

// Async thunk lấy plugin đã cài
export const fetchInstalledPlugins = createAsyncThunk(
  'plugins/fetchInstalled',
  async () => {
    const res = await getInstalledPlugins();
    return res.map((plugin: any) => ({ ...plugin, isInstalled: true }));
  },
);

// Async thunk cài plugin
export const installPluginThunk = createAsyncThunk(
  'plugins/install',
  async (pluginKey: string) => {
    await installPlugin(pluginKey);
    return pluginKey;
  },
);

// Async thunk gỡ plugin
export const uninstallPluginThunk = createAsyncThunk(
  'plugins/uninstall',
  async (pluginKey: string) => {
    await uninstallPlugin(pluginKey);
    return pluginKey;
  },
);

// Async thunk lấy chi tiết plugin theo id
export const fetchPluginDetail = createAsyncThunk<
  PluginDetail,
  string,
  { rejectValue: string }
>('plugins/fetchDetail', async (id, { rejectWithValue }) => {
  try {
    const detail = await getPluginDetail(id);
    if (!detail) {
      return rejectWithValue('No plugin detail found');
    }
    return detail;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch plugin detail');
  }
});

// Slice quản lý plugins
const pluginsSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all plugins
      .addCase(fetchPlugins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlugins.fulfilled,
        (state, action: PayloadAction<PluginItem[]>) => {
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchPlugins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch plugins';
      })

      // Fetch installed plugins (lưu riêng)
      .addCase(fetchInstalledPlugins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInstalledPlugins.fulfilled,
        (state, action: PayloadAction<PluginItem[]>) => {
          state.installedPlugins = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchInstalledPlugins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch installed plugins';
      })

      // Install plugin
      .addCase(
        installPluginThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          // Cập nhật trong data (all plugins)
          const plugin = state.data.find((p) => p.key === action.payload);
          if (plugin) plugin.isInstalled = true;

          // Cập nhật trong danh sách đã cài
          if (!state.installedPlugins.find((p) => p.key === action.payload) && plugin) {
            state.installedPlugins.push({ ...plugin, isInstalled: true });
          }

          // Cập nhật detail nếu đang mở
          if (state.detail && state.detail.key === action.payload) {
            state.detail.isInstalled = true;
          }
        },
      )

      // Uninstall plugin
      .addCase(
        uninstallPluginThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          const plugin = state.data.find((p) => p.key === action.payload);
          if (plugin) plugin.isInstalled = false;

          // Xóa khỏi installedPlugins
          state.installedPlugins = state.installedPlugins.filter(
            (p) => p.key !== action.payload,
          );

          if (state.detail && state.detail.key === action.payload) {
            state.detail.isInstalled = false;
          }
        },
      )

      // Fetch plugin detail
      .addCase(fetchPluginDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
        state.detail = null;
      })
      .addCase(
        fetchPluginDetail.fulfilled,
        (state, action: PayloadAction<PluginDetail>) => {
          state.detailLoading = false;
          state.detail = action.payload;
        },
      )
      .addCase(fetchPluginDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError =
          action.payload ||
          action.error.message ||
          'Failed to fetch plugin detail';
      });
  },
});

export default pluginsSlice.reducer;
