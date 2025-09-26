const API_SERVER = import.meta.env.VITE_API_SERVER;

const REFRESH_TOKEN = '_refresh_token';
const USER_INFO = '_user_info';
const IS_AUTH = '_is_auth';
const ACCESS_TOKEN = '_access_token';
const SIGN_UP_INFO = '_sign_up_info';
const CURRENT_WORKSPACE = '_current_workspace';
const IS_SIDEBAR_OPEN = '_is_sidebar_open';
const SHORTCUTS_PAGE = '_shortcuts_page';

const constants = {
  API_SERVER,
  REFRESH_TOKEN,
  USER_INFO,
  IS_AUTH,
  ACCESS_TOKEN,
  SIGN_UP_INFO,
  CURRENT_WORKSPACE,
  IS_SIDEBAR_OPEN,
  SHORTCUTS_PAGE
};

export const DEFAULT_RESIZER_CONFIG = {
  MIN_WIDTH: 376,
  MAX_WIDTH: 515,
  DEFAULT_WIDTH: 400,
} as const;

export type ResizerConfig = {
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
};

export const DEFAULT_FULL_NAME = 'No name';
export const DEFAULT_EMAIL = 'default@gmail.com';

export const EVENTBUS_SOCKET_CONNECT = 'socket-connect';
export const EVENTBUS_SOCKET_DISCONNECT = 'socket-disconnect';
export const EVENTBUS_WORKSPACE_CHANGED = 'workspace-changed';

export const SOCKET_API_URL = import.meta.env.VITE_SOCKET_API_URL;

export const generateCrispScript = (websiteID: string) => `
<script type="text/javascript">
  window.$crisp = [];
  window.ZC_WEBSITE_ID = "${websiteID}";
  (function () {
    d = document;
    s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
</script>`;



export default constants;
