import { constants } from "@/core/settings";
import type { Shortcut } from "@/modules/settings/models/chatbox.model";

type CacheEntry = {
  data: Shortcut[];
  expiresAt: number;
};

const TTL_MS = 15 * 60 * 1000;
let memoryCache: CacheEntry | null = null;

export const ShortcutsCache = {
  get(): Shortcut[] | null {
    const now = Date.now();

    // 1. Check memory cache
    if (memoryCache && now <= memoryCache.expiresAt) {
      return memoryCache.data;
    }

    // 2. Check localStorage
    try {
      const raw = localStorage.getItem(constants.SHORTCUTS_PAGE);
      if (!raw) return null;

      const parsed = JSON.parse(raw) as CacheEntry;

      if (now > parsed.expiresAt) {
        localStorage.removeItem(constants.SHORTCUTS_PAGE);
        memoryCache = null;
        return null;
      }

      memoryCache = parsed;
      return parsed.data;
    } catch {
      return null;
    }
  },

  set(data: Shortcut[], ttlMs: number = TTL_MS) {
    const entry: CacheEntry = { data, expiresAt: Date.now() + ttlMs };
    memoryCache = entry;
    try {
      localStorage.setItem(constants.SHORTCUTS_PAGE, JSON.stringify(entry));
    } catch {}
  },

  delete() {
    memoryCache = null;
    try {
      localStorage.removeItem(constants.SHORTCUTS_PAGE);
    } catch {}
  },

  clear() {
    this.delete();
  },
};
