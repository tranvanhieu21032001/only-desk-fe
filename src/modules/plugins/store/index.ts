import pluginsReducer, {
  loadPlugins,
  enablePlugin,
  disablePlugin,
  uninstallPlugin,
  setFilter,
  clearError,
  selectPlugins,
  selectEnabledPlugins,
  selectFilter,
  selectIsLoading,
  selectError,
} from "./pluginsSlice";

// Export actions
export {
  loadPlugins,
  enablePlugin,
  disablePlugin,
  uninstallPlugin,
  setFilter,
  clearError,
};

// Export selectors
export {
  selectPlugins,
  selectEnabledPlugins,
  selectFilter,
  selectIsLoading,
  selectError,
};

// Export the reducer as default
export default pluginsReducer;
