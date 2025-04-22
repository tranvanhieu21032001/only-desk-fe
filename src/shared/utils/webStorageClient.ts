import Cookies from "js-cookie";
import { constants } from "@/core/settings";
import _ from "lodash";

interface CookieAttributes {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

function isCookieAttributes(option: unknown): option is CookieAttributes {
  if (typeof option === "undefined") {
    return true;
  }
  if (typeof option !== "object" || option === null) {
    return false;
  }
  return true;
}

const webStorageClient = {
  set(key: string, rawValue: unknown, option?: unknown) {
    const value = _.isString(rawValue) ? rawValue : JSON?.stringify(rawValue);
    if (!isCookieAttributes(option)) {
      throw new Error("Invalid cookie attributes");
    }
    Cookies.set(key, value, option);
  },

  get(key: string) {
    const value: string = Cookies.get(key) || "";
    try {
      return JSON?.parse(value);
    } catch {
      return value;
    }
  },

  remove(key: string) {
    Cookies.remove(key);
  },

  removeAll() {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  },

  setToken(value: string, option?: unknown) {
    this.set(constants.ACCESS_TOKEN, value, option);
  },

  getToken() {
    return this.get(constants.ACCESS_TOKEN);
  },
};

export default webStorageClient;
