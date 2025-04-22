import { createSlice } from "@reduxjs/toolkit";

import { UserInforInterface } from "@/modules/auth/model/user";

import { constants } from "@/core/settings";
import webStorageClient from "@/shared/utils/webStorageClient";

const isAuthFromStorage: boolean = webStorageClient.get(constants.IS_AUTH);
const userInfoFromStorage: UserInforInterface = webStorageClient.get(
  constants.USER_INFO
);

export interface AuthInterface {
  isAuth: boolean;
  userInfo: UserInforInterface | null;
  permissionList: Record<string, boolean>;
}

const initialState: AuthInterface = {
  isAuth: isAuthFromStorage || false,
  userInfo: userInfoFromStorage,
  permissionList: {},
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionLogin: (state, action) => {
      const { isAuth, rememberMe, userInfo, accessToken, refreshToken } =
        action.payload;
      state.isAuth = isAuth;
      state.userInfo = userInfo;
      webStorageClient.set(
        constants.IS_AUTH,
        isAuth,
        rememberMe ? { expires: 30 } : {}
      );
      webStorageClient.set(
        constants.USER_INFO,
        userInfo,
        rememberMe ? { expires: 30 } : {}
      );
      webStorageClient.setToken(accessToken, rememberMe ? { expires: 30 } : {});
      webStorageClient.set(
        constants.REFRESH_TOKEN,
        refreshToken,
        rememberMe ? { expires: 30 } : {}
      );
    },
    actionUpdateAvatar: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        avatar: action.payload,
      };
      webStorageClient.set(constants.USER_INFO, {
        ...state.userInfo,
        avatar: action.payload,
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

export const { actionLogin, actionLogout, actionUpdateAvatar } = slice.actions;

export default slice.reducer;
