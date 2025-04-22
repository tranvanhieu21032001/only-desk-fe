import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import {
  Plugin,
  PluginHookRegistration,
  PluginHookType,
  PluginMenuItem,
  PluginRoute,
} from "./types";
import { sortByPriority } from "./helpers";

/**
 * Interface for the plugin store state
 */
export interface PluginStoreState {
  // Plugin registry
  plugins: Record<string, Plugin>;
  // List of enabled plugin IDs
  enabledPlugins: string[];
  // Loading status
  isLoading: boolean;
  // Error message if any
  error: string | null;
  // Registered hooks
  hooks: Record<PluginHookType, PluginHookRegistration[]>;
  // Routes registered by plugins
  routes: Record<string, Record<string, PluginRoute>>;
  // Menu items registered by plugins
  menuItems: Record<string, Record<string, PluginMenuItem>>;
}

/**
 * Type for the persisted plugin store
 */
type PluginPersistOptions = PersistOptions<
  PluginStoreState,
  Pick<PluginStoreState, "plugins" | "enabledPlugins">
>;

/**
 * Type for the plugin store with persistence
 */
type PluginStateCreator = StateCreator<
  PluginStoreState,
  [],
  [["zustand/persist", Pick<PluginStoreState, "plugins" | "enabledPlugins">]],
  PluginStoreState
>;

/**
 * Initial state for the plugin store
 */
const initialState: PluginStoreState = {
  plugins: {},
  enabledPlugins: [],
  isLoading: false,
  error: null,
  hooks: Object.values(PluginHookType).reduce(
    (acc, hookType) => ({
      ...acc,
      [hookType]: [],
    }),
    {} as Record<PluginHookType, PluginHookRegistration[]>
  ),
  routes: {},
  menuItems: {},
};

/**
 * Configuration for persist middleware
 */
const persistConfig: PluginPersistOptions = {
  name: "plugin-storage",
  partialize: (state) => ({
    plugins: state.plugins,
    enabledPlugins: state.enabledPlugins,
  }),
};

/**
 * Create the plugin store with persistence
 */
export const usePluginStore = create<PluginStoreState>(
  persist<
    PluginStoreState,
    ["zustand/persist", Pick<PluginStoreState, "plugins" | "enabledPlugins">]
  >(
    (set, get) => ({
      ...initialState,
    }),
    persistConfig
  ) as PluginStateCreator
);

/**
 * Register a new plugin
 */
export const registerPlugin = async (plugin: Plugin): Promise<boolean> => {
  try {
    const { plugins } = usePluginStore.getState();

    // Check if plugin is already registered
    if (plugins[plugin.id]) {
      console.warn(`Plugin ${plugin.id} is already registered.`);
      // Update existing plugin, but preserve functions
      usePluginStore.setState({
        plugins: {
          ...plugins,
          [plugin.id]: {
            ...plugins[plugin.id],
            name: plugin.name,
            version: plugin.version,
            description: plugin.description,
            author: plugin.author,
            icon: plugin.icon,
            dependencies: plugin.dependencies,
            // Preserve functions
            initialize: plugin.initialize || plugins[plugin.id].initialize,
            destroy: plugin.destroy || plugins[plugin.id].destroy,
          },
        },
      });
      return true;
    }

    // Clone the plugin with functions preserved
    const pluginToStore = {
      ...plugin,
      initialize: plugin.initialize,
      destroy: plugin.destroy,
    };

    // Register plugin
    usePluginStore.setState({
      plugins: {
        ...plugins,
        [plugin.id]: pluginToStore,
      },
    });

    return true;
  } catch (error) {
    console.error(`Failed to register plugin ${plugin.id}:`, error);
    return false;
  }
};

/**
 * Unregister a plugin
 */
export const unregisterPlugin = async (pluginId: string): Promise<boolean> => {
  try {
    const { plugins, enabledPlugins, hooks, routes, menuItems } =
      usePluginStore.getState();

    // Check if plugin exists
    if (!plugins[pluginId]) {
      console.warn(`Plugin ${pluginId} is not registered.`);
      return false;
    }

    // If plugin is enabled, disable it first
    if (enabledPlugins.includes(pluginId)) {
      await disablePlugin(pluginId);
    }

    // Create new plugins object without the removed plugin
    const newPlugins = { ...plugins };
    delete newPlugins[pluginId];

    // Remove all hooks registered by this plugin
    const newHooks = { ...hooks };
    for (const type in newHooks) {
      newHooks[type as PluginHookType] = newHooks[
        type as PluginHookType
      ].filter((hook) => hook.pluginId !== pluginId);
    }

    // Remove all routes registered by this plugin
    const newRoutes = { ...routes };
    delete newRoutes[pluginId];

    // Remove all menu items registered by this plugin
    const newMenuItems = { ...menuItems };
    delete newMenuItems[pluginId];

    // Update state
    usePluginStore.setState({
      plugins: newPlugins,
      hooks: newHooks,
      routes: newRoutes,
      menuItems: newMenuItems,
    });

    return true;
  } catch (error) {
    console.error(`Failed to unregister plugin ${pluginId}:`, error);
    return false;
  }
};

/**
 * Enable a plugin
 */
export const enablePlugin = async (pluginId: string): Promise<boolean> => {
  try {
    const { plugins, enabledPlugins } = usePluginStore.getState();

    // Check if plugin exists
    if (!plugins[pluginId]) {
      console.warn(`Plugin ${pluginId} is not registered.`);
      return false;
    }

    // Check if plugin is already enabled
    if (enabledPlugins.includes(pluginId)) {
      console.warn(`Plugin ${pluginId} is already enabled.`);
      return true;
    }

    const plugin = plugins[pluginId];

    // Check if initialize is a function
    if (typeof plugin.initialize !== "function") {
      console.error(
        `Plugin ${pluginId} does not have a valid initialize function.`
      );
      return false;
    }

    // Check dependencies
    if (plugin.dependencies && plugin.dependencies.length > 0) {
      for (const depId of plugin.dependencies) {
        if (!plugins[depId]) {
          console.error(
            `Dependency ${depId} is not registered for plugin ${pluginId}.`
          );
          return false;
        }

        if (!enabledPlugins.includes(depId)) {
          // Try to enable dependency
          const success = await enablePlugin(depId);
          if (!success) {
            console.error(
              `Failed to enable dependency ${depId} for plugin ${pluginId}.`
            );
            return false;
          }
        }
      }
    }

    // Initialize plugin
    try {
      await plugin.initialize();
    } catch (error) {
      console.error(`Failed to initialize plugin ${pluginId}:`, error);
      return false;
    }

    // Update state
    usePluginStore.setState({
      plugins: {
        ...plugins,
        [pluginId]: {
          ...plugin,
          isEnabled: true,
        },
      },
      enabledPlugins: [...enabledPlugins, pluginId],
    });

    return true;
  } catch (error) {
    console.error(`Failed to enable plugin ${pluginId}:`, error);
    return false;
  }
};

/**
 * Disable a plugin
 */
export const disablePlugin = async (pluginId: string): Promise<boolean> => {
  try {
    const { plugins, enabledPlugins } = usePluginStore.getState();

    // Check if plugin exists
    if (!plugins[pluginId]) {
      console.warn(`Plugin ${pluginId} is not registered.`);
      return false;
    }

    // Check if plugin is already disabled
    if (!enabledPlugins.includes(pluginId)) {
      console.warn(`Plugin ${pluginId} is already disabled.`);
      return true;
    }

    const plugin = plugins[pluginId];

    // Check if other enabled plugins depend on this one
    for (const id of enabledPlugins) {
      if (id === pluginId) continue;

      const p = plugins[id];
      if (p.dependencies && p.dependencies.includes(pluginId)) {
        // Disable dependent plugin first
        const success = await disablePlugin(id);
        if (!success) {
          console.error(`Failed to disable dependent plugin ${id}.`);
          return false;
        }
      }
    }

    // Destroy plugin
    try {
      await plugin.destroy();
    } catch (error) {
      console.error(`Failed to destroy plugin ${pluginId}:`, error);
      // Continue with disabling even if destroy fails
    }

    // Update state
    usePluginStore.setState({
      plugins: {
        ...plugins,
        [pluginId]: {
          ...plugin,
          isEnabled: false,
        },
      },
      enabledPlugins: enabledPlugins.filter((id) => id !== pluginId),
    });

    return true;
  } catch (error) {
    console.error(`Failed to disable plugin ${pluginId}:`, error);
    return false;
  }
};

/**
 * Register a hook
 */
export const registerHook = (hookInfo: PluginHookRegistration): void => {
  const { hooks, plugins, enabledPlugins } = usePluginStore.getState();

  // Check if plugin exists and is enabled
  if (
    !plugins[hookInfo.pluginId] ||
    !enabledPlugins.includes(hookInfo.pluginId)
  ) {
    console.warn(
      `Cannot register hook: Plugin ${hookInfo.pluginId} is not enabled.`
    );
    return;
  }

  // Add hook to registry
  const updatedHooks = { ...hooks };
  const hookList = [...(updatedHooks[hookInfo.type] || [])];

  // Check if hook already exists
  const existingIndex = hookList.findIndex(
    (h) => h.pluginId === hookInfo.pluginId && h.type === hookInfo.type
  );

  if (existingIndex >= 0) {
    // Update existing hook
    hookList[existingIndex] = hookInfo;
  } else {
    // Add new hook
    hookList.push(hookInfo);
  }

  // Sort hooks by priority
  updatedHooks[hookInfo.type] = sortByPriority(hookList);

  // Update state
  usePluginStore.setState({
    hooks: updatedHooks,
  });
};

/**
 * Unregister a hook
 */
export const unregisterHook = (
  pluginId: string,
  type: PluginHookType
): void => {
  const { hooks } = usePluginStore.getState();

  // Remove hook from registry
  const updatedHooks = { ...hooks };
  updatedHooks[type] = updatedHooks[type].filter(
    (h) => h.pluginId !== pluginId || h.type !== type
  );

  // Update state
  usePluginStore.setState({
    hooks: updatedHooks,
  });
};

/**
 * Apply hooks of a specific type
 */
export const applyHooks = async <T, R>(
  type: PluginHookType,
  data: T
): Promise<R | undefined> => {
  const { hooks } = usePluginStore.getState();
  let result: any = data;

  // Get hooks for this type
  const hookList = hooks[type] || [];

  // Sort hooks by priority
  const sortedHooks = sortByPriority(hookList);

  // Apply hooks in order
  for (const hook of sortedHooks) {
    try {
      result = await hook.handler(result);
    } catch (error) {
      console.error(`Error applying hook from plugin ${hook.pluginId}:`, error);
    }
  }

  return result as R;
};

/**
 * Register a route
 */
export const registerRoute = (pluginId: string, route: PluginRoute): void => {
  const { routes, plugins, enabledPlugins } = usePluginStore.getState();

  // Check if plugin exists and is enabled
  if (!plugins[pluginId] || !enabledPlugins.includes(pluginId)) {
    console.warn(`Cannot register route: Plugin ${pluginId} is not enabled.`);
    return;
  }

  // Add route to registry
  const updatedRoutes = { ...routes };

  if (!updatedRoutes[pluginId]) {
    updatedRoutes[pluginId] = {};
  }

  updatedRoutes[pluginId][route.path] = route;

  // Update state
  usePluginStore.setState({
    routes: updatedRoutes,
  });
};

/**
 * Unregister a route
 */
export const unregisterRoute = (pluginId: string, path: string): void => {
  const { routes } = usePluginStore.getState();

  // Check if plugin has any routes
  if (!routes[pluginId] || !routes[pluginId][path]) {
    return;
  }

  // Remove route from registry
  const updatedRoutes = { ...routes };
  delete updatedRoutes[pluginId][path];

  // If plugin has no routes left, remove plugin entry
  if (Object.keys(updatedRoutes[pluginId]).length === 0) {
    delete updatedRoutes[pluginId];
  }

  // Update state
  usePluginStore.setState({
    routes: updatedRoutes,
  });
};

/**
 * Get all routes from enabled plugins
 */
export const getPluginRoutes = (): PluginRoute[] => {
  const { routes, enabledPlugins } = usePluginStore.getState();
  const allRoutes: PluginRoute[] = [];

  // Collect routes from enabled plugins
  for (const pluginId of enabledPlugins) {
    if (routes[pluginId]) {
      allRoutes.push(...Object.values(routes[pluginId]));
    }
  }

  return allRoutes;
};

/**
 * Register a menu item
 */
export const registerMenuItem = (
  pluginId: string,
  menuItem: PluginMenuItem
): void => {
  const { menuItems, plugins, enabledPlugins } = usePluginStore.getState();

  // Check if plugin exists and is enabled
  if (!plugins[pluginId] || !enabledPlugins.includes(pluginId)) {
    console.warn(
      `Cannot register menu item: Plugin ${pluginId} is not enabled.`
    );
    return;
  }

  // Add menu item to registry
  const updatedMenuItems = { ...menuItems };

  if (!updatedMenuItems[pluginId]) {
    updatedMenuItems[pluginId] = {};
  }

  updatedMenuItems[pluginId][menuItem.id] = menuItem;

  // Update state
  usePluginStore.setState({
    menuItems: updatedMenuItems,
  });
};

/**
 * Unregister a menu item
 */
export const unregisterMenuItem = (
  pluginId: string,
  menuItemId: string
): void => {
  const { menuItems } = usePluginStore.getState();

  // Check if plugin has any menu items
  if (!menuItems[pluginId] || !menuItems[pluginId][menuItemId]) {
    return;
  }

  // Remove menu item from registry
  const updatedMenuItems = { ...menuItems };
  delete updatedMenuItems[pluginId][menuItemId];

  // If plugin has no menu items left, remove plugin entry
  if (Object.keys(updatedMenuItems[pluginId]).length === 0) {
    delete updatedMenuItems[pluginId];
  }

  // Update state
  usePluginStore.setState({
    menuItems: updatedMenuItems,
  });
};

/**
 * Get all menu items from enabled plugins
 */
export const getMenuItems = (): PluginMenuItem[] => {
  const { menuItems, enabledPlugins } = usePluginStore.getState();
  const allMenuItems: PluginMenuItem[] = [];

  // Collect menu items from enabled plugins
  for (const pluginId of enabledPlugins) {
    if (menuItems[pluginId]) {
      allMenuItems.push(...Object.values(menuItems[pluginId]));
    }
  }

  return allMenuItems;
};
