import { createSlice } from '@reduxjs/toolkit';

import { constants } from '@/core/settings';
import webStorageClient from '@/shared/utils/webStorageClient';
import { UserInforInterface } from '@/modules/auth/models/user';

const isAuthFromStorage: boolean =
  webStorageClient.get(constants.IS_AUTH) || false;
const userInfoFromStorage: UserInforInterface = webStorageClient.get(
  constants.USER_INFO,
);

export interface AuthInterface {
  isAuth: boolean;
  userInfo: UserInforInterface | null;
  permissionList: Record<string, boolean>;
  isLoading?: boolean;
}

const initialState: AuthInterface = {
  isAuth: isAuthFromStorage,
  userInfo: userInfoFromStorage,
  permissionList: {},
  isLoading: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    actionSignUp: (state, action) => {
      state.isLoading = action.payload;
    },
    actionLogin: (state, action) => {
      const { isAuth, rememberMe, userInfo, accessToken, refreshToken } =
        action.payload;
      state.isAuth = isAuth;
      state.userInfo = userInfo;
      webStorageClient.set(
        constants.IS_AUTH,
        isAuth,
        rememberMe ? { expires: 30 } : {},
      );
      webStorageClient.set(
        constants.USER_INFO,
        userInfo,
        rememberMe ? { expires: 30 } : {},
      );
      webStorageClient.setToken(accessToken, rememberMe ? { expires: 30 } : {});
      webStorageClient.set(
        constants.REFRESH_TOKEN,
        refreshToken,
        rememberMe ? { expires: 30 } : {},
      );
    },
    actionUpdateUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
      webStorageClient.set(constants.USER_INFO, {
        ...state.userInfo,
        ...action.payload,
      });
    },
    actionLogout: (state) => {
      state.isAuth = false;
      state.userInfo = null;
      webStorageClient.removeAll();
      localStorage.clear();
    },
  },

  extraReducers: () => {},
});

export const { actionLogin, actionLogout, actionUpdateUserInfo, actionSignUp } =
  slice.actions;

export default slice.reducer;
