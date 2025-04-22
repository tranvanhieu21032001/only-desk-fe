import { pluginManager } from "../../core/plugins/PluginManager";
import helpDeskPlugin from "./index";
import React from "react";
import { HelpDesk } from "./components";

/**
 * Register the HelpDesk plugin with the plugin manager
 */
export const registerHelpDeskPlugin = async (): Promise<boolean> => {
  try {
    // Register the plugin with the plugin system
    const success = await pluginManager.registerPlugin(helpDeskPlugin);

    if (success) {
      console.log("HelpDesk plugin registered successfully");

      // Register plugin routes
      pluginManager.registerRoute("helpdesk", {
        path: "/helpdesk/*",
        component: HelpDesk,
        exact: false,
      });

      // Register menu item
      pluginManager.registerMenuItem("helpdesk", {
        id: "helpdesk",
        label: "Help Desk",
        path: "/helpdesk",
        icon: "QuestionCircleOutlined",
        position: 50, // Display position in the menu
      });

      return true;
    } else {
      console.error("Failed to register HelpDesk plugin");
      return false;
    }
  } catch (error) {
    console.error("Error registering HelpDesk plugin:", error);
    return false;
  }
};

/**
 * Enable the HelpDesk plugin
 */
export const enableHelpDeskPlugin = async (): Promise<boolean> => {
  return await pluginManager.enablePlugin(helpDeskPlugin.id);
};

/**
 * Disable the HelpDesk plugin
 */
export const disableHelpDeskPlugin = async (): Promise<boolean> => {
  return await pluginManager.disablePlugin(helpDeskPlugin.id);
};

/**
 * Unregister the HelpDesk plugin
 */
export const unregisterHelpDeskPlugin = async (): Promise<boolean> => {
  return await pluginManager.unregisterPlugin(helpDeskPlugin.id);
};
