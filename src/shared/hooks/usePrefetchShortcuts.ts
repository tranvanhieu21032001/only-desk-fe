import { useCallback } from "react";
import { getShortcutsList } from "@/modules/settings/api/chatbox";
import { ShortcutsCache } from "@/shared/utils/shortcuts-cache";
import type { Shortcut } from "@/modules/settings/models/chatbox.model";

export const usePrefetchShortcuts = () => {
  const prefetchShortcuts = useCallback(async (): Promise<Shortcut[]> => {
    const cached = ShortcutsCache.get();
    if (cached && cached.length > 0) return cached;

    try {
      const res = await getShortcutsList({ page: 1, limit: 10 });
      ShortcutsCache.set(res.data);
      return res.data;
    } catch {
      return [];
    }
  }, []);

  return { prefetchShortcuts };
};
