// store.ts
import { configureStore } from '@reduxjs/toolkit';

import historyRoute from './features/historyRoute';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import constants from '../settings/constants';
import {
  WorkspaceInterface,
} from '@/modules/auth/models/user';
import webStorageClient from '@/shared/utils/webStorageClient';
import authReducer from '@/modules/auth/store/features/auth';
import contactsReducer from '@/modules/contacts/store/features/contacts';
import inboxReducer, { initialState as inboxInitialState } from '@/modules/inbox/store/features/inbox';
import helpdeskCategorySlice from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import helpdeskArticlesReducer from '@/modules/knowledge-base/store/helpdeskArticleSlice';
import operatorsReducer from '@/modules/settings/store/features/operators';
import knowledgeBaseSettingsReducer from '@/modules/settings/store/features/knowledgebase';
import helpdeskSettingReducer from '@/modules/knowledge-base/store/helpdeskSettingsSlice';
import pluginsReducer from '@/modules/plugins/store/pluginsSlice'
import adminWorkspacesReducer from '@/modules/admin/store/adminWorkspacesSlice';
import adminUserReducer from '@/modules/admin/store/adminUsersSlice';
import { User } from '@/shared/interface/user.interface';
export const loadState = () => {
  const currentWorkspaceFromStorage: WorkspaceInterface = webLocalStorage.get(
    constants.CURRENT_WORKSPACE,
  );
  const userInfoFromStorage: User = webStorageClient.get(
    constants.USER_INFO,
  );
  const isAuthFromStorage: boolean =
    webStorageClient.get(constants.IS_AUTH) || false;

  const isSidebarOpenFromStorage: boolean =
    webStorageClient.get(constants.IS_SIDEBAR_OPEN) || false;

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
    plugins: pluginsReducer,
    adminWorkspaces: adminWorkspacesReducer,
    adminUser : adminUserReducer
  },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
