import settingsReducer, {
  setTheme,
  toggleTheme,
  setLanguage,
  setLoading,
  setError,
  selectTheme,
  selectLanguage,
  selectSettingsLoading,
  selectSettingsError,
  setThemeWithSideEffects,
  toggleThemeWithSideEffects,
  setLanguageWithSideEffects,
} from "./settingsSlice";

// Export regular actions
export { setTheme, toggleTheme, setLanguage, setLoading, setError };

// Export action interceptors (thunks)
export {
  setThemeWithSideEffects,
  toggleThemeWithSideEffects,
  setLanguageWithSideEffects,
};

// Export selectors
export {
  selectTheme,
  selectLanguage,
  selectSettingsLoading,
  selectSettingsError,
};

// Export the reducer as default
export default settingsReducer;
