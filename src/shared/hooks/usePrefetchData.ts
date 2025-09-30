import { useCallback } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { fetchHelpdeskCategories } from "@/modules/knowledge-base/store/helpdeskCategorySlice";
import { HelpdeskCache } from "@/shared/utils/helpdesk-cache";
import { fetchPlugins, fetchInstalledPlugins } from "@/modules/plugins/store/pluginsSlice";
import { PluginCache } from "@/shared/utils/plugin-cache";
import { categories } from "@/modules/plugins/helpers/data/allPlugins";

type PluginCategoryKey = typeof categories[number]["key"]; // 'all-plugins' | 'installed-plugins'

const categoryToCacheMap: Record<PluginCategoryKey, { getCache: () => any[] | null; fetchAction: () => any }> = {
  "all-plugins": {
    getCache: PluginCache.all.get,
    fetchAction: fetchPlugins,
  },
  "installed-plugins": {
    getCache: PluginCache.installed.get,
    fetchAction: fetchInstalledPlugins,
  },
};

const usePrefetchData = () => {
  const dispatch = useAppDispatch();

  const prefetchKnowledgeBase = useCallback(() => {
    const cached = HelpdeskCache.get();
    if (!cached || cached.length === 0) {
      dispatch(fetchHelpdeskCategories());
    }
  }, [dispatch]);

  const prefetchPlugin = useCallback(
    (categoryKey: PluginCategoryKey) => {
      const mapEntry = categoryToCacheMap[categoryKey];
      if (!mapEntry) return;

      const cached = mapEntry.getCache();
      if (!cached || cached.length === 0) {
        dispatch(mapEntry.fetchAction());
      }
    },
    [dispatch]
  );

  return { prefetchKnowledgeBase, prefetchPlugin };
};

export default usePrefetchData;
