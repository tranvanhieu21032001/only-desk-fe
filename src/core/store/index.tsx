// store.ts
import { configureStore } from '@reduxjs/toolkit';

import historyRoute from './features/historyRoute';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import constants from '../settings/constants';
import { WorkspaceInterface } from '@/modules/auth/models/user';
import webStorageClient from '@/shared/utils/webStorageClient';
import authReducer from '@/modules/auth/store/features/auth';
import contactsReducer from '@/modules/contacts/store/features/contacts';
import inboxReducer, {
  initialState as inboxInitialState,
} from '@/modules/inbox/store/features/inbox';
import messageRudecer from '@/modules/inbox/store/features/message'
import helpdeskCategorySlice, {initialState as helpdeskInitialState} from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import helpdeskArticlesReducer from '@/modules/knowledge-base/store/helpdeskArticleSlice';
import operatorsReducer from '@/modules/settings/store/features/operators';
import knowledgeBaseSettingsReducer from '@/modules/settings/store/features/knowledgebase';
import helpdeskSettingReducer from '@/modules/knowledge-base/store/helpdeskSettingsSlice';
import pluginsReducer, {initialState as pluginsInitialState} from '@/modules/plugins/store/pluginsSlice';
import adminWorkspacesReducer from '@/modules/admin/store/adminWorkspacesSlice';
import adminUserReducer from '@/modules/admin/store/adminUsersSlice';
import { User } from '@/shared/interfaces/user.interface';
export const loadState = () => {
  const currentWorkspaceFromStorage: WorkspaceInterface = webLocalStorage.get(
    constants.CURRENT_WORKSPACE,
  );
  const userInfoFromStorage: User = webStorageClient.get(constants.USER_INFO);
  const isAuthFromStorage: boolean =
    webStorageClient.get(constants.IS_AUTH) || false;

  const isSidebarOpenFromStorage: boolean =
    webStorageClient.get(constants.IS_SIDEBAR_OPEN) || false;

  const pluginsData = webLocalStorage.get(constants.ALL_PLUGIN_DATA) || [];
  const installedPluginsData = webLocalStorage.get(constants.INSTALLED_PLUGIN_DATA) || [];
  const helpdeskCategories = webLocalStorage.get(constants.KNOWLEGE_BASE_DATA) || [];

  return {
    auth: {
      isAuth: isAuthFromStorage,
      userInfo: userInfoFromStorage,
      currentWorkspace: currentWorkspaceFromStorage,
    },
    inbox: {
      ...inboxInitialState,
      isSidebarOpen: isSidebarOpenFromStorage,
    },
     plugins: {
      ...pluginsInitialState,
      data: pluginsData,
      installedPlugins: installedPluginsData,
    },
    helpdeskCategory: {
    ...helpdeskInitialState,
    categories: helpdeskCategories,
  },
  };
};

export const store = configureStore({
  reducer: {
    historyRoute: historyRoute,
    auth: authReducer,
    contacts: contactsReducer,
    operators: operatorsReducer,
    helpdeskArticles: helpdeskArticlesReducer,
    helpdeskCategory: helpdeskCategorySlice,
    helpdeskSetting: helpdeskSettingReducer,
    knowledgeBaseSettings: knowledgeBaseSettingsReducer,
    inbox: inboxReducer,
    message: messageRudecer,
    plugins: pluginsReducer,
    adminWorkspaces: adminWorkspacesReducer,
    adminUser: adminUserReducer,
  },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
