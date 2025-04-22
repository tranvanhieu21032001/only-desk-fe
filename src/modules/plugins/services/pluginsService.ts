import { Plugin } from "../../../core/plugins/types";
import { pluginManager } from "../../../core/plugins/PluginManager";

/**
 * Service to manage plugin-related functionality
 */
export const pluginsService = {
  /**
   * Get all plugins
   */
  getAllPlugins: (): Plugin[] => {
    return Object.values(pluginManager.plugins);
  },

  /**
   * Get enabled plugins
   */
  getEnabledPlugins: (): Plugin[] => {
    return Object.values(pluginManager.plugins).filter((plugin) =>
      pluginManager.enabledPlugins.includes(plugin.id)
    );
  },

  /**
   * Check if a plugin is enabled
   */
  isPluginEnabled: (pluginId: string): boolean => {
    return pluginManager.enabledPlugins.includes(pluginId);
  },

  /**
   * Enable a plugin
   */
  enablePlugin: async (pluginId: string): Promise<boolean> => {
    return await pluginManager.enablePlugin(pluginId);
  },

  /**
   * Disable a plugin
   */
  disablePlugin: async (pluginId: string): Promise<boolean> => {
    return await pluginManager.disablePlugin(pluginId);
  },

  /**
   * Unregister (uninstall) a plugin
   */
  unregisterPlugin: async (pluginId: string): Promise<boolean> => {
    return await pluginManager.unregisterPlugin(pluginId);
  },

  /**
   * Get plugin by ID
   */
  getPlugin: (pluginId: string): Plugin | undefined => {
    return pluginManager.getPlugin(pluginId);
  },

  /**
   * Subscribe to plugin changes
   */
  subscribe: (callback: () => void): (() => void) => {
    return pluginManager.subscribe(callback);
  },
};
