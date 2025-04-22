import { ThemeType, Languages } from "../types";

/**
 * Service to manage settings-related functionality
 */
export const settingsService = {
  /**
   * Get stored theme
   */
  getStoredTheme: (): ThemeType => {
    const storedTheme = localStorage.getItem("theme");
    return (storedTheme as ThemeType) || "light";
  },

  /**
   * Set theme
   */
  setTheme: (theme: ThemeType): void => {
    localStorage.setItem("theme", theme);
    // Update body class for global styling
    document.body.classList.toggle("dark-theme", theme === "dark");
  },

  /**
   * Toggle theme between light and dark
   */
  toggleTheme: (): ThemeType => {
    const currentTheme = settingsService.getStoredTheme();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    settingsService.setTheme(newTheme);
    return newTheme;
  },

  /**
   * Get stored language
   */
  getStoredLanguage: (): string => {
    return localStorage.getItem("language") || Languages.EN;
  },

  /**
   * Change language
   */
  changeLanguage: (language: string): void => {
    localStorage.setItem("language", language);
  },

  /**
   * Get list of supported languages
   */
  getSupportedLanguages: () => {
    return Object.values(Languages);
  },
};
