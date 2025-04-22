import { Plugin } from "../../../core/plugins/types";

/**
 * Re-export core plugin types
 */
export type { Plugin };

/**
 * Plugin filter types
 */
export type PluginFilterType = "all" | "enabled" | "disabled";

/**
 * Plugin toggle handler type
 */
export type PluginToggleHandler = (
  pluginId: string,
  enabled: boolean
) => Promise<void>;

/**
 * Plugin uninstall handler type
 */
export type PluginUninstallHandler = (pluginId: string) => Promise<void>;

/**
 * Plugins state interface
 */
export interface PluginsState {
  plugins: Record<string, Plugin>;
  enabledPlugins: string[];
  filter: PluginFilterType;
  isLoading: boolean;
  error: string | null;
}
