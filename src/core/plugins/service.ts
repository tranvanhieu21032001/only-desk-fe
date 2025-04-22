import { pluginManager } from "./PluginManager";
import { Plugin } from "./types";

// Import the HelpDesk plugin and registration utilities
import helpDeskPlugin from "../../plugins/helpdesk";
import { registerHelpDeskPlugin } from "../../plugins/helpdesk/register";

/**
 * Service to register and initialize plugins
 */
export class PluginService {
  /**
   * Initialize the plugin system
   */
  static async initialize(): Promise<void> {
    console.log("Initializing plugin system...");

    // Register built-in plugins
    await this.registerBuiltInPlugins();

    // Initialize saved plugins
    await pluginManager.initializePlugins();

    console.log("Plugin system initialized!");
  }

  /**
   * Register built-in plugins in the application
   */
  private static async registerBuiltInPlugins(): Promise<void> {
    // Array of built-in plugins
    const builtInPlugins: Plugin[] = [
      // Add HelpDesk plugin
      helpDeskPlugin,
      // Add other plugins here
    ];

    // Register each plugin
    for (const plugin of builtInPlugins) {
      try {
        await pluginManager.registerPlugin(plugin);
        console.log(`Registered built-in plugin: ${plugin.name}`);
      } catch (error) {
        console.error(`Failed to register plugin ${plugin.id}:`, error);
      }
    }

    // Register HelpDesk plugin with routes and menu items
    try {
      await registerHelpDeskPlugin();
      // Enable the plugin by default
      await pluginManager.enablePlugin(helpDeskPlugin.id);
      console.log("HelpDesk plugin registered and enabled");
    } catch (error) {
      console.error("Failed to register HelpDesk plugin:", error);
    }
  }

  /**
   * Load plugins from external sources
   * Can be extended to load from API or filesystem
   */
  static async loadExternalPlugins(): Promise<void> {
    // Implement feature to load plugins from external sources
    // Example: from API, filesystem, etc.
  }

  /**
   * Disable all plugins
   */
  static async disableAllPlugins(): Promise<void> {
    const { plugins, enabledPlugins } = pluginManager;

    for (const pluginId of enabledPlugins) {
      await pluginManager.disablePlugin(pluginId);
    }
  }

  /**
   * Reset plugin configuration
   */
  static async resetPluginSystem(): Promise<void> {
    // Disable all plugins
    await this.disableAllPlugins();

    // Delete plugin configuration from localStorage
    localStorage.removeItem("plugin-store");

    // Reinitialize the system
    await this.initialize();
  }
}

// Export initialization function
export const initializePluginSystem =
  PluginService.initialize.bind(PluginService);
