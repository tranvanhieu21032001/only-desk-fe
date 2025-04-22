import {
  Plugin,
  PluginContextType,
  PluginHookRegistration,
  PluginHookType,
  PluginMenuItem,
  PluginRoute,
} from "./types";
import {
  usePluginStore,
  registerPlugin,
  unregisterPlugin,
  enablePlugin,
  disablePlugin,
  registerHook,
  unregisterHook,
  applyHooks,
  registerRoute,
  unregisterRoute,
  getPluginRoutes,
  registerMenuItem,
  unregisterMenuItem,
  getMenuItems,
} from "./store";

/**
 * Plugin Manager - Central manager for the plugin system
 */
class PluginManager implements PluginContextType {
  /**
   * Singleton instance of PluginManager
   */
  private static _instance: PluginManager;

  /**
   * Get the current instance of PluginManager
   */
  public static getInstance(): PluginManager {
    if (!PluginManager._instance) {
      PluginManager._instance = new PluginManager();
    }
    return PluginManager._instance;
  }

  /**
   * Constructor - private to implement Singleton pattern
   */
  private constructor() {
    // No initialization needed
  }

  /**
   * Get the list of plugins
   */
  get plugins() {
    return usePluginStore.getState().plugins;
  }

  /**
   * Get the list of enabled plugins
   */
  get enabledPlugins() {
    return usePluginStore.getState().enabledPlugins;
  }

  /**
   * Check loading status
   */
  get isLoading() {
    return usePluginStore.getState().isLoading;
  }

  /**
   * Get error message if any
   */
  get error() {
    return usePluginStore.getState().error;
  }

  /**
   * Register a new plugin
   */
  async registerPlugin(plugin: Plugin): Promise<boolean> {
    return await registerPlugin(plugin);
  }

  /**
   * Unregister a plugin
   */
  async unregisterPlugin(pluginId: string): Promise<boolean> {
    return await unregisterPlugin(pluginId);
  }

  /**
   * Enable a plugin
   */
  async enablePlugin(pluginId: string): Promise<boolean> {
    return await enablePlugin(pluginId);
  }

  /**
   * Disable a plugin
   */
  async disablePlugin(pluginId: string): Promise<boolean> {
    return await disablePlugin(pluginId);
  }

  /**
   * Get plugin information by ID
   */
  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins[pluginId];
  }

  /**
   * Register a new hook
   */
  registerHook(hookInfo: PluginHookRegistration): void {
    registerHook(hookInfo);
  }

  /**
   * Unregister a hook
   */
  unregisterHook(pluginId: string, type: PluginHookType): void {
    unregisterHook(pluginId, type);
  }

  /**
   * Apply hooks of a specific type
   */
  async applyHooks<T, R>(
    type: PluginHookType,
    data: T
  ): Promise<R | undefined> {
    return await applyHooks<T, R>(type, data);
  }

  /**
   * Register a new route
   */
  registerRoute(pluginId: string, route: PluginRoute): void {
    registerRoute(pluginId, route);
  }

  /**
   * Unregister a route
   */
  unregisterRoute(pluginId: string, path: string): void {
    unregisterRoute(pluginId, path);
  }

  /**
   * Get all routes from enabled plugins
   */
  getPluginRoutes(): PluginRoute[] {
    return getPluginRoutes();
  }

  /**
   * Register a new menu item
   */
  registerMenuItem(pluginId: string, menuItem: PluginMenuItem): void {
    registerMenuItem(pluginId, menuItem);
  }

  /**
   * Unregister a menu item
   */
  unregisterMenuItem(pluginId: string, menuItemId: string): void {
    unregisterMenuItem(pluginId, menuItemId);
  }

  /**
   * Get all menu items from enabled plugins
   */
  getMenuItems(): PluginMenuItem[] {
    return getMenuItems();
  }

  /**
   * Initialize the plugin system and activate saved plugins
   */
  async initializePlugins(): Promise<void> {
    // Get the list of activated plugins
    const { plugins, enabledPlugins } = usePluginStore.getState();

    // Initialize activated plugins
    for (const pluginId of enabledPlugins) {
      const plugin = plugins[pluginId];
      if (plugin) {
        try {
          await plugin.initialize();
        } catch (error) {
          console.error(`Failed to initialize plugin ${pluginId}:`, error);

          // Update plugin status
          usePluginStore.setState({
            plugins: {
              ...usePluginStore.getState().plugins,
              [pluginId]: {
                ...plugin,
                isEnabled: false,
              },
            },
            enabledPlugins: usePluginStore
              .getState()
              .enabledPlugins.filter((id) => id !== pluginId),
          });
        }
      }
    }
  }

  /**
   * Register a callback function when plugin state changes
   */
  subscribe(callback: () => void): () => void {
    return usePluginStore.subscribe(callback);
  }
}

// Export singleton instance
export const pluginManager = PluginManager.getInstance();

// Export helper functions
export * from "./types";
export * from "./helpers";
