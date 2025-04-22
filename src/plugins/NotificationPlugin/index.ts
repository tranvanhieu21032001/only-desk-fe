import {
  createPlugin,
  pluginManager,
  PluginHookType,
} from "../../core/plugins";

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export interface NotificationOptions {
  title: string;
  message: string;
  type: NotificationType;
  duration?: number; // display time in milliseconds
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  showClose?: boolean;
  onClick?: () => void;
}

// Notification management plugin
const NotificationPlugin = createPlugin({
  id: "notification-plugin",
  name: "Notification Manager",
  version: "1.0.0",
  description: "Display notifications and alerts in the application",
  author: "Only Chat Team",
  isEnabled: false,
  icon: "https://cdn-icons-png.flaticon.com/512/3239/3239952.png",

  // Initialization function when plugin is enabled
  initialize: async function () {
    console.log("Notification plugin initialized");

    // Create container for notifications
    createNotificationContainer();

    // Register hooks
    registerPluginHooks();
  },

  // Cleanup function when plugin is disabled
  destroy: async function () {
    console.log("Notification plugin destroyed");

    // Remove notifications container
    const container = document.getElementById("notification-container");
    if (container) {
      container.remove();
    }
  },
});

// Create container for notifications
function createNotificationContainer() {
  // Check if container already exists
  if (document.getElementById("notification-container")) {
    return;
  }

  // Create style
  const style = document.createElement("style");
  style.textContent = `
    .notification-container {
      position: fixed;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 350px;
      padding: 15px;
    }
    
    .notification-container.top-right {
      top: 0;
      right: 0;
    }
    
    .notification-container.top-left {
      top: 0;
      left: 0;
    }
    
    .notification-container.bottom-right {
      bottom: 0;
      right: 0;
    }
    
    .notification-container.bottom-left {
      bottom: 0;
      left: 0;
    }
    
    .notification-container.top-center {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .notification-container.bottom-center {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .notification {
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      animation: notification-slide-in 0.3s ease-out forwards;
      position: relative;
      min-width: 280px;
    }
    
    .notification.removing {
      animation: notification-slide-out 0.3s ease-out forwards;
    }
    
    .notification.success {
      background-color: #d4edda;
      border-left: 4px solid #28a745;
      color: #155724;
    }
    
    .notification.error {
      background-color: #f8d7da;
      border-left: 4px solid #dc3545;
      color: #721c24;
    }
    
    .notification.warning {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      color: #856404;
    }
    
    .notification.info {
      background-color: #d1ecf1;
      border-left: 4px solid #17a2b8;
      color: #0c5460;
    }
    
    .notification-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    
    .notification-title {
      font-weight: bold;
      margin: 0;
    }
    
    .notification-close {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 0;
      opacity: 0.5;
      transition: opacity 0.2s;
    }
    
    .notification-close:hover {
      opacity: 1;
    }
    
    .notification-message {
      margin: 0;
    }
    
    @keyframes notification-slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes notification-slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Create container
  const container = document.createElement("div");
  container.id = "notification-container";
  container.className = "notification-container top-right";
  document.body.appendChild(container);
}

// Function to register hooks
function registerPluginHooks() {
  const hookHandler = (data: any) => {
    console.log("Notification plugin hook ran");
    return data;
  };

  pluginManager.registerHook({
    pluginId: NotificationPlugin.id,
    type: PluginHookType.AFTER_RENDER,
    handler: hookHandler,
  });
}

// Function to display notification
function showNotification(options: NotificationOptions) {
  // Ensure container exists
  let container = document.getElementById("notification-container");
  if (!container) {
    createNotificationContainer();
    container = document.getElementById("notification-container");
  }

  if (!container) return;

  // Set container position
  if (options.position) {
    container.className = `notification-container ${options.position}`;
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${options.type}`;
  if (options.onClick) {
    notification.style.cursor = "pointer";
    notification.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).className !== "notification-close") {
        options.onClick?.();
      }
    });
  }

  // Create header
  const header = document.createElement("div");
  header.className = "notification-header";

  // Title
  const title = document.createElement("h4");
  title.className = "notification-title";
  title.textContent = options.title;
  header.appendChild(title);

  // Close button
  if (options.showClose !== false) {
    const closeButton = document.createElement("button");
    closeButton.className = "notification-close";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      removeNotification(notification);
    });
    header.appendChild(closeButton);
  }

  notification.appendChild(header);

  // Message
  const message = document.createElement("p");
  message.className = "notification-message";
  message.textContent = options.message;
  notification.appendChild(message);

  // Add to container
  container.appendChild(notification);

  // Automatically remove after time
  const duration = options.duration || 5000; // default 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, duration);

  return notification;
}

// Function to remove notification
function removeNotification(notification: HTMLElement) {
  notification.classList.add("removing");

  // Wait for animation to finish before removing
  setTimeout(() => {
    notification.remove();
  }, 300);
}

// API for plugin
export const NotificationAPI = {
  success: (
    title: string,
    message: string,
    options?: Partial<Omit<NotificationOptions, "title" | "message" | "type">>
  ) => {
    return showNotification({
      title,
      message,
      type: NotificationType.SUCCESS,
      ...options,
    });
  },

  error: (
    title: string,
    message: string,
    options?: Partial<Omit<NotificationOptions, "title" | "message" | "type">>
  ) => {
    return showNotification({
      title,
      message,
      type: NotificationType.ERROR,
      ...options,
    });
  },

  warning: (
    title: string,
    message: string,
    options?: Partial<Omit<NotificationOptions, "title" | "message" | "type">>
  ) => {
    return showNotification({
      title,
      message,
      type: NotificationType.WARNING,
      ...options,
    });
  },

  info: (
    title: string,
    message: string,
    options?: Partial<Omit<NotificationOptions, "title" | "message" | "type">>
  ) => {
    return showNotification({
      title,
      message,
      type: NotificationType.INFO,
      ...options,
    });
  },

  // General function
  show: (options: NotificationOptions) => {
    return showNotification(options);
  },

  // Function to remove all notifications
  clearAll: () => {
    const container = document.getElementById("notification-container");
    if (container) {
      container.innerHTML = "";
    }
  },

  // Change default position
  setPosition: (position: NotificationOptions["position"]) => {
    const container = document.getElementById("notification-container");
    if (container && position) {
      container.className = `notification-container ${position}`;
    }
  },
};

export default NotificationPlugin;
