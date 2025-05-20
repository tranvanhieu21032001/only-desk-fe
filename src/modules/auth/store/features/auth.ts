import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  UserInforInterface,
  WorkSpaceInterface,
} from '@/modules/auth/models/user';
import { meQuery } from '@/relay/MeQuery';
import { fetchQuery } from 'react-relay';
import { constants } from '@/core/settings';
import relayEnvironment from '@/relay/RelayEnvironment';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import webStorageClient from '@/shared/utils/webStorageClient';
import { MeQuery } from '@/relay/__generated__/MeQuery.graphql';
import { workspaceInfoQuery } from '@/relay/WorkspaceInfoQuery';
import { WorkspaceInfoQuery } from '@/relay/__generated__/WorkspaceInfoQuery.graphql';

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
  workSpaceList?: WorkSpaceInterface[] | [];
  currentWorkSpace?: WorkSpaceInterface | null;
}

const initialState: AuthInterface = {
  isAuth: isAuthFromStorage,
  userInfo: userInfoFromStorage,
  permissionList: {},
  isLoading: false,
  workSpaceList: [],
  currentWorkSpace: null,
};

const fetchWorkspace = createAsyncThunk('user-profile/work-space', async () => {
  const workspaceData = await fetchQuery<WorkspaceInfoQuery>(
    relayEnvironment,
    workspaceInfoQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  ).toPromise();

  return workspaceData?.workspaces;
});

const fetchGetUserInfo = createAsyncThunk(
  'user-profile/user-information',
  async () => {
    const userData = await fetchQuery<MeQuery>(
      relayEnvironment,
      meQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    ).toPromise();

    return userData?.me;
  },
);

const slice = createSlice({
  name: 'user-profile',
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
    actionUpdateWorkSpaceCurrent: (
      state,
      action: { payload: WorkSpaceInterface },
    ) => {
      state.currentWorkSpace = action.payload;
      webLocalStorage.set(constants.WORK_SPACE_CURRENT, action?.payload);
    },
    actionUpdateWorkSpaces: (
      state,
      action: { payload: WorkSpaceInterface },
    ) => {
      state.workSpaceList = [
        ...(state.workSpaceList || []),
        {
          id: action.payload?.id,
          logo: action.payload?.logo,
          name: action.payload?.name,
          websiteID: action.payload?.websiteID,
          websiteUrl: action.payload?.websiteUrl,
        },
      ];
    },
  },

  extraReducers: (builder) => {
    // Get user info
    builder.addCase(fetchGetUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGetUserInfo.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      webStorageClient.set(constants.USER_INFO, {
        ...state.userInfo,
        ...action.payload,
      });
    });
    builder.addCase(fetchGetUserInfo.rejected, (state) => {
      state.isLoading = false;
    });
    // Get workspace
    builder.addCase(fetchWorkspace.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWorkspace.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.workSpaceList = action.payload;
    });
    builder.addCase(fetchWorkspace.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  actionLogin,
  actionLogout,
  actionUpdateUserInfo,
  actionSignUp,
  actionUpdateWorkSpaces,
  actionUpdateWorkSpaceCurrent,
} = slice.actions;

export { fetchGetUserInfo, fetchWorkspace };

export default slice.reducer;
