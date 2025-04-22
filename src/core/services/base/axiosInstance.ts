import axios from "axios";
import webStorageClient from "@/shared/utils/webStorageClient";
import { constants } from "@/core/settings";

/**
 * Create an axios instance with default configuration
 * - baseURL: API server URL from constants
 * - headers: Default content type as JSON
 * - timeout: 10 minutes (600000ms)
 */
const axiosInstance = axios.create({
  baseURL: constants.API_SERVER,
  headers: {
    "Content-Type": "application/json",
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
  }
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

    // Handle 401 Unauthorized error and token refresh
    if (response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const tokenRefresh = webStorageClient.get(constants.REFRESH_TOKEN);

      if (tokenRefresh) {
        // Attempt to refresh the access token
        return axiosInstance
          .post("/core/auth/refresh-token", { refreshToken: tokenRefresh })
          .then((response: any) => {
            // Update authorization headers with new token
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response?.data?.accessToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${response?.data?.accessToken}`;

            // Store new tokens
            webStorageClient.setToken(response?.data?.accessToken);
            webStorageClient.set(
              constants.REFRESH_TOKEN,
              response?.data?.refreshToken
            );

            // Retry the original request with new token
            return axiosInstance(originalRequest);
          })
          .catch(() => {
            // Clear all stored tokens on refresh failure
            webStorageClient.removeAll();
          });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
