import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../core/store";
import { SettingsState, ThemeType } from "../types";
import { settingsService } from "../services";
import i18n from "i18next";

// Initial state using service values
const initialState: SettingsState = {
  theme: settingsService.getStoredTheme(),
  language: settingsService.getStoredLanguage(),
  isLoading: false,
  error: null,
};

// Create the settings slice
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // Set theme - just updates the state
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },

    // Toggle theme - just updates the state
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    // Set language - just updates the state
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { setTheme, toggleTheme, setLanguage, setLoading, setError } =
  settingsSlice.actions;

// Export selectors
export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectSettingsLoading = (state: RootState) =>
  state.settings.isLoading;
export const selectSettingsError = (state: RootState) => state.settings.error;

// Action interceptors - handle side effects after state updates
export const setThemeWithSideEffects =
  (theme: ThemeType) => (dispatch: any) => {
    // 1. Update Redux state
    dispatch(setTheme(theme));

    // 2. Update localStorage and document body class via service
    settingsService.setTheme(theme);

    // 3. Apply theme to document root (like ThemeContext does)
    document.documentElement.setAttribute("data-theme", theme);
  };

export const toggleThemeWithSideEffects =
  () => (dispatch: any, getState: any) => {
    const currentTheme = selectTheme(getState());
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // 1. Update Redux state
    dispatch(toggleTheme());

    // 2. Update localStorage and document body class via service
    settingsService.setTheme(newTheme);

    // 3. Apply theme to document root (like ThemeContext does)
    document.documentElement.setAttribute("data-theme", newTheme);
  };

export const setLanguageWithSideEffects =
  (language: string) => (dispatch: any) => {
    // 1. Update Redux state
    dispatch(setLanguage(language));

    // 2. Update localStorage via service
    settingsService.changeLanguage(language);

    // 3. Change language in i18n system to update LanguageContext
    if (i18n.isInitialized) {
      i18n.changeLanguage(language);
    }
  };

export default settingsSlice.reducer;
