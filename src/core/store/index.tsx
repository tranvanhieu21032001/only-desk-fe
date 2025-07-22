import { configureStore } from '@reduxjs/toolkit';

import historyRoute from './features/historyRoute';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import constants from '../settings/constants';
import {
  UserInforInterface,
  WorkspaceInterface,
} from '@/modules/auth/models/user';
import webStorageClient from '@/shared/utils/webStorageClient';
import authReducer from '@/modules/auth/store/features/auth';
import contactsReducer from '@/modules/contacts/store/features/contacts';
import inboxReducer from '@/modules/inbox/store/features/inbox';
import helpdeskCategorySlice from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import helpdeskArticlesReducer from '@/modules/knowledge-base/store/helpdeskArticleSlice'
import operatorsReducer from '@/modules/settings/store/features/operators'

export const loadState = () => {
  const currentWorkspaceFromStorage: WorkspaceInterface = webLocalStorage.get(
    constants.CURRENT_WORKSPACE,
  );
  const userInfoFromStorage: UserInforInterface = webStorageClient.get(
    constants.USER_INFO,
  );
  const isAuthFromStorage: boolean =
    webStorageClient.get(constants.IS_AUTH) || false;

  return {
    auth: {
      isAuth: isAuthFromStorage,
      userInfo: userInfoFromStorage,
      currentWorkspace: currentWorkspaceFromStorage,
      permissionList: {} as Record<string, boolean>,
    },
  };
};

export const store = configureStore({
  reducer: {
    historyRoute: historyRoute,

    auth: authReducer,
    contacts: contactsReducer,
    operators: operatorsReducer,
    helpdeskArticles : helpdeskArticlesReducer,
    helpdeskCategory: helpdeskCategorySlice,
    inbox: inboxReducer,
  },
  preloadedState: loadState(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
