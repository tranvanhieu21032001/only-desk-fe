import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../core/store";
import { Plugin } from "../../../core/plugins/types";
import {
  loadPlugins,
  enablePlugin,
  disablePlugin,
  uninstallPlugin,
  setFilter,
  selectPlugins,
  selectIsLoading,
  selectFilter,
} from "../store";
import "./styles.css";

interface PluginItemProps {
  plugin: Plugin;
  onToggle: (pluginId: string, enabled: boolean) => Promise<void>;
  onUninstall: (pluginId: string) => Promise<void>;
}

/**
 * Component to display a single plugin
 */
const PluginItem: React.FC<PluginItemProps> = ({
  plugin,
  onToggle,
  onUninstall,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    await onToggle(plugin.id, !plugin.isEnabled);
    setIsLoading(false);
  };

  const handleUninstall = async () => {
    if (
      confirm(`Are you sure you want to uninstall plugin "${plugin.name}"?`)
    ) {
      setIsLoading(true);
      await onUninstall(plugin.id);
      setIsLoading(false);
    }
  };

  return (
    <div className={`plugin-item ${plugin.isEnabled ? "enabled" : "disabled"}`}>
      <div className="plugin-header">
        {plugin.icon && (
          <img src={plugin.icon} alt={plugin.name} className="plugin-icon" />
        )}
        <h3 className="plugin-name">{plugin.name}</h3>
        <span className="plugin-version">v{plugin.version}</span>
      </div>

      <div className="plugin-description">{plugin.description}</div>

      {plugin.author && (
        <div className="plugin-author">By: {plugin.author}</div>
      )}

      <div className="plugin-actions">
        <button
          className={`toggle-button ${
            plugin.isEnabled ? "enabled" : "disabled"
          }`}
          onClick={handleToggle}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : plugin.isEnabled ? "Disable" : "Enable"}
        </button>

        <button
          className="uninstall-button"
          onClick={handleUninstall}
          disabled={isLoading || plugin.isEnabled}
        >
          Uninstall
        </button>
      </div>
    </div>
  );
};

/**
 * Plugin manager component
 */
const PluginManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const plugins = useAppSelector(selectPlugins) as Plugin[];
  const isLoading = useAppSelector(selectIsLoading);
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    // Load plugins on component mount
    dispatch(loadPlugins());
  }, [dispatch]);

  const handleTogglePlugin = async (pluginId: string, enable: boolean) => {
    if (enable) {
      await dispatch(enablePlugin(pluginId));
    } else {
      await dispatch(disablePlugin(pluginId));
    }
  };

  const handleUninstallPlugin = async (pluginId: string) => {
    await dispatch(uninstallPlugin(pluginId));
  };

  // Filter plugins by status
  const filteredPlugins = plugins.filter((plugin: Plugin) => {
    if (filter === "all") return true;
    if (filter === "enabled") return plugin.isEnabled;
    if (filter === "disabled") return !plugin.isEnabled;
    return true;
  });

  return (
    <div className="plugin-manager">
      <h2>Plugin Manager</h2>

      <div className="filter-controls">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => dispatch(setFilter("all"))}
        >
          All Plugins
        </button>
        <button
          className={filter === "enabled" ? "active" : ""}
          onClick={() => dispatch(setFilter("enabled"))}
        >
          Enabled
        </button>
        <button
          className={filter === "disabled" ? "active" : ""}
          onClick={() => dispatch(setFilter("disabled"))}
        >
          Disabled
        </button>
      </div>

      {isLoading && <div className="loading">Loading plugins...</div>}

      <div className="plugins-list">
        {filteredPlugins.length === 0 ? (
          <div className="no-plugins">No plugins found</div>
        ) : (
          filteredPlugins.map((plugin: Plugin) => (
            <PluginItem
              key={plugin.id}
              plugin={plugin}
              onToggle={handleTogglePlugin}
              onUninstall={handleUninstallPlugin}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PluginManager;
