import axios from 'axios';
// import webStorageClient from "@/shared/utils/webStorageClient";
import { constants } from '@/core/settings';
import { eventBus } from '@/core/event-bus';
import { EVENTBUS_AUTH_LOGOUT } from '@/core/settings/constants';

/**
 * Create an axios instance with default configuration
 * - baseURL: API server URL from constants
 * - headers: Default content type as JSON
 * - timeout: 10 minutes (600000ms)
 */
const axiosInstance = axios.create({
  baseURL: constants.API_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 600000,
});

/**
 * Request interceptor
 * - Handles outgoing requests before they are sent
 * - Currently just passes through the config
 * @param config - Axios request configuration
 */
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor
 * - Handles incoming responses before they reach the calling code
 * - Extracts data from successful responses
 * - Handles 401 Unauthorized errors with token refresh logic
 * @param response - Axios response object
 */
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response?.data;
  },
  (error) => {
    const { config, response } = error;
    const originalRequest = config;

    //TODO
    // Handle 401 Unauthorized error and token refresh
    if (response?.status === 401) {
      // Emit global logout event on 401
      eventBus.emit(EVENTBUS_AUTH_LOGOUT);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
