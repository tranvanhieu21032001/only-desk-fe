import { Plugin, PluginHookType } from "./types";
import { pluginManager } from "./PluginManager";

/**
 * Create a new plugin with default values
 */
export const createPlugin = (
  plugin: Partial<Plugin> & Pick<Plugin, "id" | "name">
): Plugin => {
  return {
    version: "1.0.0",
    description: "",
    isEnabled: false,
    initialize: async () => {},
    ...plugin,
  } as Plugin;
};

/**
 * Check if a plugin is enabled
 */
export const isPluginEnabled = (pluginId: string): boolean => {
  return pluginManager.enabledPlugins.includes(pluginId);
};

/**
 * Check if a plugin is registered
 */
export const isPluginRegistered = (pluginId: string): boolean => {
  return !!pluginManager.getPlugin(pluginId);
};

/**
 * Create a Hook Helper with a specific type
 */
export const createHookHelper = <T, R>(hookType: PluginHookType) => {
  return {
    register: (
      pluginId: string,
      handler: (data: T) => Promise<R | void> | R | void,
      priority?: number
    ) => {
      pluginManager.registerHook({
        pluginId,
        type: hookType,
        handler,
        priority,
      });
    },
    unregister: (pluginId: string) => {
      pluginManager.unregisterHook(pluginId, hookType);
    },
    apply: (data: T) => {
      return pluginManager.applyHooks<T, R>(hookType, data);
    },
  };
};

/**
 * Hook helpers
 */
export const Hooks = {
  beforeRender: createHookHelper(PluginHookType.BEFORE_RENDER),
  afterRender: createHookHelper(PluginHookType.AFTER_RENDER),
  beforeRouteChange: createHookHelper(PluginHookType.BEFORE_ROUTE_CHANGE),
  afterRouteChange: createHookHelper(PluginHookType.AFTER_ROUTE_CHANGE),
  beforeApiRequest: createHookHelper(PluginHookType.BEFORE_API_REQUEST),
  afterApiRequest: createHookHelper(PluginHookType.AFTER_API_REQUEST),
  beforeLogin: createHookHelper(PluginHookType.BEFORE_LOGIN),
  afterLogin: createHookHelper(PluginHookType.AFTER_LOGIN),
  beforeLogout: createHookHelper(PluginHookType.BEFORE_LOGOUT),
  afterLogout: createHookHelper(PluginHookType.AFTER_LOGOUT),
};

/**
 * Create a plugin skeleton
 */
export const createPluginSkeleton = (id: string, name: string): Plugin => {
  return createPlugin({
    id,
    name,
    version: "1.0.0",
    description: `Plugin ${name}`,
    isEnabled: false,
    initialize: async () => {
      console.log(`Plugin ${name} initialized`);
    },
    destroy: async () => {
      console.log(`Plugin ${name} destroyed`);
    },
  });
};

/**
 * Sort an array of objects by their priority property
 * Higher priorities come first, default priority is 0
 */
export const sortByPriority = <T extends { priority?: number }>(
  items: T[]
): T[] => {
  return [...items].sort((a, b) => (b.priority || 0) - (a.priority || 0));
};
