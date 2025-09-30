// LIMIT THE FILE CONTENT TO AT MOST 300 LINES. IF MORE CONTENT NEEDS TO BE ADDED USE THE str-replace-editor TOOL TO EDIT THE FILE AFTER IT HAS BEEN CREATED.

// Simple in-memory cache with TTL for profile info (User/Contact) used by ProfileCard
// Keyed by `${type}:${id}`

export type ProfileCacheType = 'USER' | 'CONTACT';

export type CachedProfileData = {
  name?: string;
  email?: string;
  avatar?: string;
  // For Contact: context.countryCode is used for flag
  countryCode?: string;
};

type CacheEntry = {
  data: CachedProfileData;
  expiresAt: number; // epoch ms
};

const TTL_MS = 15 * 60 * 1000; // 15 minutes

const memoryCache = new Map<string, CacheEntry>();
const LS_NAMESPACE = 'profile-cache-v1';

function makeKey(type: ProfileCacheType, id: string) {
  return `${type}:${id}`;
}

function readFromLocalStorage(key: string): CacheEntry | null {
  try {
    const raw = localStorage.getItem(`${LS_NAMESPACE}:${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) {
      localStorage.removeItem(`${LS_NAMESPACE}:${key}`);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeToLocalStorage(key: string, entry: CacheEntry) {
  try {
    localStorage.setItem(`${LS_NAMESPACE}:${key}`, JSON.stringify(entry));
  } catch {
    // ignore quota or serialization errors
  }
}

function removeFromLocalStorage(key: string) {
  try {
    localStorage.removeItem(`${LS_NAMESPACE}:${key}`);
  } catch {}
}

export const ProfileCache = {
  get(type: ProfileCacheType, id: string): CachedProfileData | null {
    const key = makeKey(type, id);
    // 1) Memory
    const entryMem = memoryCache.get(key);
    if (entryMem) {
      if (Date.now() > entryMem.expiresAt) {
        memoryCache.delete(key);
      } else {
        return entryMem.data;
      }
    }
    // 2) LocalStorage fallback
    const entryLs = readFromLocalStorage(key);
    if (!entryLs) return null;
    // hydrate memory for faster subsequent reads
    memoryCache.set(key, entryLs);
    return entryLs.data;
  },

  set(
    type: ProfileCacheType,
    id: string,
    data: CachedProfileData,
    ttlMs: number = TTL_MS,
  ) {
    const key = makeKey(type, id);
    const entry: CacheEntry = { data, expiresAt: Date.now() + ttlMs };
    memoryCache.set(key, entry);
    writeToLocalStorage(key, entry);
  },

  has(type: ProfileCacheType, id: string): boolean {
    return this.get(type, id) != null;
  },

  delete(type: ProfileCacheType, id: string) {
    const key = makeKey(type, id);
    memoryCache.delete(key);
    removeFromLocalStorage(key);
  },

  clear() {
    memoryCache.clear();
    // optional: clear only our namespace
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(`${LS_NAMESPACE}:`))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}
  },
};
