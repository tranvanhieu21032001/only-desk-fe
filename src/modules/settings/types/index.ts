/**
 * Supported theme options
 */
export type ThemeType = "light" | "dark";

/**
 * Supported language options
 */
export enum Languages {
  EN = "en",
  VI = "vi",
}

/**
 * Settings state interface
 */
export interface SettingsState {
  theme: ThemeType;
  language: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Settings context interface
 */
export interface SettingsContextType {
  theme: ThemeType;
  language: string;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  changeLanguage: (language: string) => void;
}
