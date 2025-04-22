import React from "react";
import { Plugin } from "../../core/plugins/types";
import { createPlugin } from "../../core/plugins/helpers";
import { HelpDesk } from "./components";

// Create the HelpDesk plugin
const helpDeskPlugin: Plugin = createPlugin({
  id: "helpdesk",
  name: "HelpDesk",
  version: "1.0.0",
  description: "A help desk system with categories and articles",
  author: "Admin",
  isEnabled: false,

  // Initialize function with proper signature
  initialize: async function () {
    // Register plugin routes - this would be done externally via plugin manager
    // The actual registration would happen when the plugin is enabled
    console.log("HelpDesk plugin initialized");
  },

  // Clean up resources
  destroy: async function () {
    console.log("HelpDesk plugin destroyed");
  },
});

export default helpDeskPlugin;
