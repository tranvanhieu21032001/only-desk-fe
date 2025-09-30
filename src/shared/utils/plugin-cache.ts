import { PluginItem } from "@/modules/plugins/store/pluginsSlice";
import { constants } from "@/core/settings";

type CacheEntry = {
  data: PluginItem[];
  expiresAt: number;
};

const TTL_MS = 15 * 60 * 1000;
const memoryCache = new Map<string, CacheEntry>();

const NAMESPACES = {
  ALL: constants.ALL_PLUGIN_DATA,
  INSTALLED: constants.INSTALLED_PLUGIN_DATA,
} as const;

function readFromLocalStorage(ns: string): CacheEntry | null {
  try {
    const raw = localStorage.getItem(ns);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) {
      localStorage.removeItem(ns);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeToLocalStorage(ns: string, entry: CacheEntry) {
  try {
    localStorage.setItem(ns, JSON.stringify(entry));
  } catch {

  }
}

function removeFromLocalStorage(ns: string) {
  try {
    localStorage.removeItem(ns);
  } catch {}
}

function getCache(ns: string): PluginItem[] | null {
  const entryMem = memoryCache.get(ns);
  if (entryMem) {
    if (Date.now() > entryMem.expiresAt) {
      memoryCache.delete(ns);
    } else {
      return entryMem.data;
    }
  }

  const entryLs = readFromLocalStorage(ns);
  if (!entryLs) return null;

  memoryCache.set(ns, entryLs);
  return entryLs.data;
}

function setCache(ns: string, data: PluginItem[], ttlMs: number = TTL_MS) {
  const entry: CacheEntry = { data, expiresAt: Date.now() + ttlMs };
  memoryCache.set(ns, entry);
  writeToLocalStorage(ns, entry);
}

function hasCache(ns: string): boolean {
  return getCache(ns) != null;
}

function clearCache(ns: string) {
  memoryCache.delete(ns);
  removeFromLocalStorage(ns);
}

export const PluginCache = {
  all: {
    get: () => getCache(NAMESPACES.ALL),
    set: (data: PluginItem[], ttlMs?: number) =>
      setCache(NAMESPACES.ALL, data, ttlMs),
    has: () => hasCache(NAMESPACES.ALL),
    clear: () => clearCache(NAMESPACES.ALL),
  },
  installed: {
    get: () => getCache(NAMESPACES.INSTALLED),
    set: (data: PluginItem[], ttlMs?: number) =>
      setCache(NAMESPACES.INSTALLED, data, ttlMs),
    has: () => hasCache(NAMESPACES.INSTALLED),
    clear: () => clearCache(NAMESPACES.INSTALLED),
  },
};
