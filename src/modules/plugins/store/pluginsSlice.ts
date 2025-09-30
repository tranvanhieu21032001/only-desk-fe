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
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { constants } from '@/core/settings';

export interface PluginItem {
  id?: string;
  key: string;
  name: string;
  shortDesc?: string;
  type?: string;
  iconUrl?: string;
  isInstalled?: boolean;
}

interface PluginsState {
  data: PluginItem[];
  installedPlugins: PluginItem[];
  loading: boolean;
  error?: string | null;

  detail?: PluginDetail | null;
  detailLoading: boolean;
  detailError?: string | null;

  searchResults: PluginItem[];
  searchLoading: boolean;
  searchError?: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export const initialState: PluginsState = {
  data: [],
  installedPlugins: [],
  loading: false,
  error: null,

  detail: null,
  detailLoading: false,
  detailError: null,

  searchResults: [],
  searchLoading: false,
  searchError: null,
  endCursor: null,
  hasNextPage: true,
};

export const fetchPlugins = createAsyncThunk('plugins/fetchAll', async () => {
  const res = await getAllPlugins({ first: PAGE_SIZE });
  return (res?.edges || []).map((edge: any) => edge.node);
});

export const fetchInstalledPlugins = createAsyncThunk(
  'plugins/fetchInstalled',
  async () => {
    const res = await getInstalledPlugins();
    return res.map((plugin: any) => ({ ...plugin, isInstalled: true }));
  },
);

export const installPluginThunk = createAsyncThunk(
  'plugins/install',
  async (pluginKey: string) => {
    await installPlugin(pluginKey);
    return pluginKey;
  },
);

export const uninstallPluginThunk = createAsyncThunk(
  'plugins/uninstall',
  async (pluginKey: string) => {
    await uninstallPlugin(pluginKey);
    return pluginKey;
  },
);

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

export const fetchSearchPlugins = createAsyncThunk<
  { plugins: PluginItem[], endCursor: string | null, hasNextPage: boolean },
  { keyword: string, after?: string | null },
  { rejectValue: string }
>('plugins/fetchSearch', async ({ keyword, after }, { rejectWithValue }) => {
  try {
    const res = await getAllPlugins({ first: PAGE_SIZE, keyword, after });
    
    const plugins = (res?.edges || []).map((edge: any) => edge.node as PluginItem);
    
    return {
      plugins,
      endCursor: res?.pageInfo?.endCursor || null,
      hasNextPage: res?.pageInfo?.hasNextPage || false
    };

  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to search plugins');
  }
});

const pluginsSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {
    resetSearchPlugins: (state) => {
      state.searchResults = [];
      state.searchLoading = false;
      state.searchError = null;
      state.endCursor = null;
      state.hasNextPage = true;
    },
  },
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
          webLocalStorage.set(constants.ALL_PLUGIN_DATA, state.data);
        },
      )
      .addCase(fetchPlugins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch plugins';
      })

      // Fetch installed plugins
      .addCase(fetchInstalledPlugins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInstalledPlugins.fulfilled,
        (state, action: PayloadAction<PluginItem[]>) => {
          state.installedPlugins = action.payload;
          state.loading = false;
          webLocalStorage.set(constants.INSTALLED_PLUGIN_DATA, state.installedPlugins);
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
          const plugin = state.data.find((p) => p.key === action.payload);
          if (plugin) plugin.isInstalled = true;

          if (!state.installedPlugins.find((p) => p.key === action.payload) && plugin) {
            state.installedPlugins.push({ ...plugin, isInstalled: true });
          }

          if (state.detail && state.detail.key === action.payload) {
            state.detail.isInstalled = true;
          }

          webLocalStorage.set(constants.ALL_PLUGIN_DATA, state.data);
          webLocalStorage.set(constants.INSTALLED_PLUGIN_DATA, state.installedPlugins);
        },
      )

      // Uninstall plugin
      .addCase(
        uninstallPluginThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          const plugin = state.data.find((p) => p.key === action.payload);
          if (plugin) plugin.isInstalled = false;

          state.installedPlugins = state.installedPlugins.filter(
            (p) => p.key !== action.payload,
          );

          if (state.detail && state.detail.key === action.payload) {
            state.detail.isInstalled = false;
          }

          webLocalStorage.set(constants.ALL_PLUGIN_DATA, state.data);
          webLocalStorage.set(constants.INSTALLED_PLUGIN_DATA, state.installedPlugins);
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
      })

      // Fetch search plugins
      .addCase(fetchSearchPlugins.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(
        fetchSearchPlugins.fulfilled,
        (state, action) => {
          state.searchLoading = false;
          
          const isInitialSearch = !action.meta.arg.after;
          
          if (isInitialSearch) {
            state.searchResults = action.payload.plugins;
          } else {
            state.searchResults = [...state.searchResults, ...action.payload.plugins];
          }

          state.endCursor = action.payload.endCursor;
          state.hasNextPage = action.payload.hasNextPage;
        },
      )
      .addCase(fetchSearchPlugins.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError =
          action.payload ||
          action.error.message ||
          'Failed to search plugins';
      });
  },
});

export const { resetSearchPlugins } = pluginsSlice.actions;
export default pluginsSlice.reducer;
