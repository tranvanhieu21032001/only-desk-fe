import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../core/store";
import { Plugin } from "../../../core/plugins/types";
import { PluginsState, PluginFilterType } from "../types";
import { pluginsService } from "../services";

// Initial state
const initialState: PluginsState = {
  plugins: {},
  enabledPlugins: [],
  filter: "all",
  isLoading: false,
  error: null,
};

// Async thunks
export const loadPlugins = createAsyncThunk(
  "plugins/loadPlugins",
  async (_, { rejectWithValue }) => {
    try {
      const plugins = pluginsService.getAllPlugins();
      const enabledPlugins = pluginsService
        .getEnabledPlugins()
        .map((p) => p.id);

      // Convert array to record
      const pluginsRecord: Record<string, Plugin> = {};
      plugins.forEach((plugin) => {
        pluginsRecord[plugin.id] = plugin;
      });

      return { plugins: pluginsRecord, enabledPlugins };
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to load plugins");
    }
  }
);

export const enablePlugin = createAsyncThunk(
  "plugins/enablePlugin",
  async (pluginId: string, { rejectWithValue }) => {
    try {
      const success = await pluginsService.enablePlugin(pluginId);
      if (!success) {
        throw new Error(`Failed to enable plugin ${pluginId}`);
      }
      return pluginId;
    } catch (err: any) {
      return rejectWithValue(
        err.message || `Failed to enable plugin ${pluginId}`
      );
    }
  }
);

export const disablePlugin = createAsyncThunk(
  "plugins/disablePlugin",
  async (pluginId: string, { rejectWithValue }) => {
    try {
      const success = await pluginsService.disablePlugin(pluginId);
      if (!success) {
        throw new Error(`Failed to disable plugin ${pluginId}`);
      }
      return pluginId;
    } catch (err: any) {
      return rejectWithValue(
        err.message || `Failed to disable plugin ${pluginId}`
      );
    }
  }
);

export const uninstallPlugin = createAsyncThunk(
  "plugins/uninstallPlugin",
  async (pluginId: string, { rejectWithValue }) => {
    try {
      const success = await pluginsService.unregisterPlugin(pluginId);
      if (!success) {
        throw new Error(`Failed to uninstall plugin ${pluginId}`);
      }
      return pluginId;
    } catch (err: any) {
      return rejectWithValue(
        err.message || `Failed to uninstall plugin ${pluginId}`
      );
    }
  }
);

// Create the plugins slice
const pluginsSlice = createSlice({
  name: "plugins",
  initialState,
  reducers: {
    // Set filter
    setFilter: (state, action: PayloadAction<PluginFilterType>) => {
      state.filter = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load plugins
    builder
      .addCase(loadPlugins.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadPlugins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plugins = action.payload.plugins;
        state.enabledPlugins = action.payload.enabledPlugins;
      })
      .addCase(loadPlugins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Enable plugin
    builder
      .addCase(enablePlugin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(enablePlugin.fulfilled, (state, action) => {
        state.isLoading = false;
        const pluginId = action.payload;

        // Update plugin state
        if (state.plugins[pluginId]) {
          state.plugins[pluginId].isEnabled = true;
        }

        // Add to enabled plugins if not already there
        if (!state.enabledPlugins.includes(pluginId)) {
          state.enabledPlugins.push(pluginId);
        }
      })
      .addCase(enablePlugin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Disable plugin
    builder
      .addCase(disablePlugin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(disablePlugin.fulfilled, (state, action) => {
        state.isLoading = false;
        const pluginId = action.payload;

        // Update plugin state
        if (state.plugins[pluginId]) {
          state.plugins[pluginId].isEnabled = false;
        }

        // Remove from enabled plugins
        state.enabledPlugins = state.enabledPlugins.filter(
          (id) => id !== pluginId
        );
      })
      .addCase(disablePlugin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Uninstall plugin
    builder
      .addCase(uninstallPlugin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uninstallPlugin.fulfilled, (state, action) => {
        state.isLoading = false;
        const pluginId = action.payload;

        // Delete plugin from state
        delete state.plugins[pluginId];

        // Remove from enabled plugins
        state.enabledPlugins = state.enabledPlugins.filter(
          (id) => id !== pluginId
        );
      })
      .addCase(uninstallPlugin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { setFilter, clearError } = pluginsSlice.actions;

// Export selectors
export const selectPlugins = (state: RootState) =>
  Object.values(state.plugins.plugins);
export const selectEnabledPlugins = (state: RootState) =>
  Object.values(state.plugins.plugins).filter((plugin) => plugin.isEnabled);
export const selectFilter = (state: RootState) => state.plugins.filter;
export const selectIsLoading = (state: RootState) => state.plugins.isLoading;
export const selectError = (state: RootState) => state.plugins.error;

export default pluginsSlice.reducer;
