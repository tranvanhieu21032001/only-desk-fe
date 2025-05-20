const API_SERVER = import.meta.env.VITE_API_SERVER;

const REFRESH_TOKEN = '_refresh_token';
const USER_INFO = '_user_info';
const IS_AUTH = '_is_auth';
const ACCESS_TOKEN = '_access_token';
const SIGN_UP_INFO = '_sign_up_info';
const WORK_SPACE_CURRENT = '_current_work_space';

const constants = {
  API_SERVER,
  REFRESH_TOKEN,
  USER_INFO,
  IS_AUTH,
  ACCESS_TOKEN,
  SIGN_UP_INFO,
  WORK_SPACE_CURRENT,
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

export default constants;
