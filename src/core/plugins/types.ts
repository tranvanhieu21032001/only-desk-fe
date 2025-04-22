// Data types for the plugin system

/**
 * Basic Interface for Plugin
 */
export interface Plugin {
  id: string; // Unique ID for the plugin
  name: string; // Display name of the plugin
  version: string; // Plugin version
  description: string; // Description of the plugin
  author?: string; // Author of the plugin
  isEnabled: boolean; // Activation status of the plugin
  icon?: string; // Plugin icon (URL or component name)
  requiredPlugins?: string[]; // Dependent plugins
  initialize: () => Promise<void> | void; // Plugin initialization function
  destroy?: () => Promise<void> | void; // Cleanup function when plugin is disabled
}

/**
 * Hook events that plugins can register
 */
export enum PluginHookType {
  BEFORE_RENDER = "before_render",
  AFTER_RENDER = "after_render",
  BEFORE_ROUTE_CHANGE = "before_route_change",
  AFTER_ROUTE_CHANGE = "after_route_change",
  BEFORE_API_REQUEST = "before_api_request",
  AFTER_API_REQUEST = "after_api_request",
  BEFORE_LOGIN = "before_login",
  AFTER_LOGIN = "after_login",
  BEFORE_LOGOUT = "before_logout",
  AFTER_LOGOUT = "after_logout",
  // Add more hook events as needed
}

/**
 * Handler function for plugin hook
 */
export type PluginHookHandler<T = any, R = any> = (
  data: T
) => Promise<R | void> | R | void;

/**
 * Information about a plugin hook registration
 */
export interface PluginHookRegistration {
  pluginId: string;
  type: PluginHookType;
  handler: PluginHookHandler;
  priority?: number; // Hook priority (higher will run first)
}

/**
 * Information about a route registered by a plugin
 */
export interface PluginRoute {
  path: string;
  component:
    | React.LazyExoticComponent<React.ComponentType<any>>
    | React.ComponentType<any>;
  exact?: boolean;
}

/**
 * Information about a menu item registered by a plugin
 */
export interface PluginMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  parent?: string; // ID of parent menu (if any)
  position?: number; // Display position
  permissions?: string[]; // Permissions required to display the menu
}

/**
 * Plugin Store State
 */
export interface PluginState {
  plugins: Record<string, Plugin>;
  enabledPlugins: string[];
  hooks: Record<PluginHookType, PluginHookRegistration[]>;
  routes: Record<string, PluginRoute[]>;
  menuItems: Record<string, PluginMenuItem[]>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Plugin Store/Context Type
 */
export interface PluginContextType {
  plugins: Record<string, Plugin>;
  enabledPlugins: string[];
  isLoading: boolean;
  error: string | null;

  // Plugin management
  registerPlugin: (plugin: Plugin) => Promise<boolean>;
  unregisterPlugin: (pluginId: string) => Promise<boolean>;
  enablePlugin: (pluginId: string) => Promise<boolean>;
  disablePlugin: (pluginId: string) => Promise<boolean>;
  getPlugin: (pluginId: string) => Plugin | undefined;

  // Hook management
  registerHook: (hookInfo: PluginHookRegistration) => void;
  unregisterHook: (pluginId: string, type: PluginHookType) => void;
  applyHooks: <T, R>(type: PluginHookType, data: T) => Promise<R | undefined>;

  // Route management
  registerRoute: (pluginId: string, route: PluginRoute) => void;
  unregisterRoute: (pluginId: string, path: string) => void;
  getPluginRoutes: () => PluginRoute[];

  // Menu management
  registerMenuItem: (pluginId: string, menuItem: PluginMenuItem) => void;
  unregisterMenuItem: (pluginId: string, menuItemId: string) => void;
  getMenuItems: () => PluginMenuItem[];
}
