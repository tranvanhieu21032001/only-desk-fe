import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import {
  WorkspaceInterface,
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
import { handleSwitchWorkspaceApi } from '@/modules/workspace/api/workspace';
import { User } from '@/shared/interface/user.interface';

export interface AuthInterface {
  isAuth: boolean;
  userInfo: User | null;
  isLoading?: boolean;
  workspaces?: WorkspaceInterface[] | [];
  currentWorkspace?: WorkspaceInterface | null;
}

const initialState: AuthInterface = {
  isAuth: false,
  userInfo: null,
  isLoading: false,
  workspaces: [],
  currentWorkspace: null,
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

const setCurrentWorkspace = (
  state: AuthInterface,
  payload: WorkspaceInterface,
) => {
  state.currentWorkspace = payload;
  webLocalStorage.set(constants.CURRENT_WORKSPACE, payload);
};

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
      // Clear Redux store
      state.isAuth = false;
      state.userInfo = null;
      state.workspaces = [];
      state.currentWorkspace = null;
      state.isLoading = false;

      // Clear all storage
      webStorageClient.removeAll();
      localStorage.clear();
      sessionStorage.clear();
    },
    actionUpdateWorkSpaceCurrent: (
      state,
      action: { payload: WorkspaceInterface },
    ) => {
      setCurrentWorkspace(state, action?.payload);
    },
    actionCreateWorkspace: (state, action: { payload: WorkspaceInterface }) => {
      state.workspaces = [
        ...(state.workspaces || []),
        {
          id: action.payload?.id,
          rawId:action.payload?.rawId,
          logo: action.payload?.logo,
          name: action.payload?.name,
          websiteID: action.payload?.websiteID,
          websiteUrl: action.payload?.websiteUrl,
        },
      ];
    },
    actionSetGlobalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    actionUpdateCurrentWorkspace: (state, action: { payload: any }) => {
      state.currentWorkspace = {
        ...state.currentWorkspace,
        ...action.payload,
      } as WorkspaceInterface;

      webLocalStorage.set(constants.CURRENT_WORKSPACE, {
        ...state.currentWorkspace,
        ...action.payload,
      });

      state.workspaces = state.workspaces?.map((workspace) => {
        if (workspace.id === action.payload.id) {
          return {
            ...workspace,
            ...action.payload,
          };
        }
        return workspace;
      });
    },
    actionSetWorkspaces: (state, action) => {
      state.workspaces = action.payload;
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
      state.workspaces = action.payload;

      if (
        (!state.currentWorkspace ||
          Object.keys(state.currentWorkspace).length == 0) &&
        (state.workspaces ?? []).length > 0
      ) {
        const firstWorkspace = (state.workspaces ?? [])[0];
        setCurrentWorkspace(state, firstWorkspace);

        const { t } = useTranslation();
        handleSwitchWorkspaceApi(
          firstWorkspace.id,
          t,
          () => {},
          (newToken) => {
            webStorageClient.setToken(newToken);
          },
        );
      }
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
  actionCreateWorkspace,
  actionUpdateWorkSpaceCurrent,
  actionSetGlobalLoading,
  actionUpdateCurrentWorkspace,
  actionSetWorkspaces,
} = slice.actions;

export { fetchGetUserInfo, fetchWorkspace };

export default slice.reducer;
