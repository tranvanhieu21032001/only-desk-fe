import { configureStore } from '@reduxjs/toolkit';

import auth from '@/modules/auth/store/features/auth';
import historyRoute from './features/historyRoute';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import constants from '../settings/constants';
import {
  UserInforInterface,
  WorkspaceInterface,
} from '@/modules/auth/models/user';
import webStorageClient from '@/shared/utils/webStorageClient';

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
    },
  };
};

export const store = configureStore({
  reducer: {
    auth: auth,
    historyRoute: historyRoute,
  },
  preloadedState: loadState(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
