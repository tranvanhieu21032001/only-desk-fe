import { HelpdeskCategory } from "@/modules/knowledge-base/interface";
import { constants } from "@/core/settings";

type CacheEntry = {
  data: HelpdeskCategory[];
  expiresAt: number;
};

const TTL_MS = 15 * 60 * 1000;
let memoryCache: CacheEntry | null = null;

export const HelpdeskCache = {
  get(): HelpdeskCategory[] | null {
    const now = Date.now();
    if (memoryCache && now <= memoryCache.expiresAt) {
      return memoryCache.data;
    }

    try {
      const raw = localStorage.getItem(constants.KNOWLEGE_BASE_DATA);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as CacheEntry;
      if (now > parsed.expiresAt) {
        localStorage.removeItem(constants.KNOWLEGE_BASE_DATA);
        memoryCache = null;
        return null;
      }
      memoryCache = parsed;
      return parsed.data;
    } catch {
      return null;
    }
  },

  set(data: HelpdeskCategory[], ttlMs: number = TTL_MS) {
    const entry: CacheEntry = { data, expiresAt: Date.now() + ttlMs };
    memoryCache = entry;
    try {
      localStorage.setItem(constants.KNOWLEGE_BASE_DATA, JSON.stringify(entry));
    } catch {}
  },

  delete() {
    memoryCache = null;
    try {
      localStorage.removeItem(constants.KNOWLEGE_BASE_DATA);
    } catch {}
  },

  clear() {
    this.delete();
  },
};
