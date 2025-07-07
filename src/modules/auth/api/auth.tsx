import { omit } from 'lodash';
import { TFunction } from 'i18next';

import { constants } from '@/core/settings';

import { getRequest, postRequest } from '@/core/services/requests';
import { SignUpStepEnums } from '../helpers/enums/auth';
import { omitSubmitSignUp } from '../helpers/data/signUp';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { AUTH_ROUTES, MAIN_ROUTES } from '@/core/routes/constants';
import {
  actionLogin,
  actionSetWorkspaces,
  actionSignUp,
  actionUpdateUserInfo,
  actionUpdateWorkSpaceCurrent,
} from '../store/features/auth';

const prefixAuth: string = '/auth';
const prefixWorkspaces: string = '/workspaces';
const endpointAuth = {
  SIGN_IN: `${prefixAuth}/login`,
  SIGN_UP: `${prefixAuth}/register`,
  VERIFY_OTP: `${prefixAuth}/verify-code`,
  RESEND_OTP: `${prefixAuth}/resend-code`,
  COMPLETE_SIGN_UP: `${prefixAuth}/complete-register`,
  REQUEST_RESET_PASSWORD: `${prefixAuth}/password-reset/request`,
  RESET_PASSWORD: `${prefixAuth}/password-reset/request`,
  GOOGLE_TOKEN_LOGIN: (token: string) => `${prefixAuth}/google/login/${token}`,
  VERIFY_INVITATION: (token: string) =>
    `${prefixWorkspaces}/invitations/check?token=${token}`,
  ACCEPT_INVITATION: (token: string) =>
    `${prefixWorkspaces}/invitations/accept?token=${token}`,
};


const verifyTokenApi = async (token: string) => {
  return await getRequest(endpointAuth.GOOGLE_TOKEN_LOGIN(token), {
    enableFlashMessageError: true,
    enableFlashMessageSuccess: false,
  }).then((res) => res);
};

const handleGoogleTokenLoginApi = async (
  token: string,
  dispatch: any,
  navigate: any,
  t: TFunction,
) => {
  dispatch(actionSignUp(true));

  try {
    const res = await verifyTokenApi(token);

    console.log('res', res);

    const userEmail = res?.email || '';

    dispatch(
      actionLogin({
        isAuth: true,
        rememberMe: true, // Google login → mặc định remember
        userInfo: {
          userId: res?.userId,
          email: userEmail,
        },
        accessToken: res?.token,
      }),
    );

    // Save token to cookie
    const Cookies = (await import('js-cookie')).default;
    Cookies.set('_access_token', res?.token, { expires: 30 });

    // Update relay environment
    const { updateRelayEnvironment } = await import('@/relay/RelayEnvironment');
    updateRelayEnvironment();

    const { default: relayEnvironment } = await import(
      '@/relay/RelayEnvironment'
    );
    const { fetchQuery } = await import('react-relay');
    const { workspaceInfoQuery } = await import('@/relay/WorkspaceInfoQuery');
    const { meQuery } = await import('@/relay/MeQuery');

    // 1. Fetch workspace info
    const workspaceDataRaw = await fetchQuery(
      relayEnvironment,
      workspaceInfoQuery,
      {},
      { fetchPolicy: 'network-only' },
    ).toPromise();
    const workspaceData: any = workspaceDataRaw;
    const workspaces = Array.isArray(workspaceData?.workspaces)
      ? workspaceData.workspaces
      : [];
    if (!workspaces.length) throw new Error('No workspace found');
    const firstWorkspace = workspaces[0];

    // 2. Fetch current user info
    const meDataRaw = await fetchQuery(
      relayEnvironment,
      meQuery,
      {},
      { fetchPolicy: 'network-only' },
    ).toPromise();
    const userInfo = meDataRaw?.me;

    if (userInfo) dispatch(actionUpdateUserInfo(userInfo));
    dispatch(actionSetWorkspaces(workspaces));
    dispatch(actionUpdateWorkSpaceCurrent(firstWorkspace));

    // 3. Switch to current workspace → get new token
    const { handleSwitchWorkspaceApi } = await import(
      '@/modules/workspace/api/workspace'
    );
    let newToken = '';
    await new Promise((resolve) => {
      handleSwitchWorkspaceApi(
        firstWorkspace.id,
        t,
        () => {},
        (token: string) => {
          newToken = token;
          resolve(token);
        },
      );
    });

    if (!newToken)
      throw new Error('No token returned after switching workspace');

    // Save new token
    const webStorageClient = (await import('@/shared/utils/webStorageClient'))
      .default;
    webStorageClient.setToken(newToken, { expires: 30 });

    const constants = (await import('@/core/settings')).constants;
    const webLocalStorage = (await import('@/shared/utils/webLocalStorage'))
      .default;
    webLocalStorage.set(constants.CURRENT_WORKSPACE, firstWorkspace);

    // Navigate
    navigate(MAIN_ROUTES.INBOX);
  } catch (error) {
    console.error('Google login failed:', error);
  } finally {
    dispatch(actionSignUp(false));
  }
};

const handleSignUp = async (
  values: any,
  dispatch: any,
  replaceState: any,
  t: TFunction,
) => {
  const updateData = omit(values, ['confirmPassword', 'policy']);
  dispatch(actionSignUp(true));
  //TODO
  await postRequest(endpointAuth?.SIGN_UP, {
    data: { ...updateData, phoneNumber: '0982123456' },
    messageSuccess: t('sign-up-form.sign-up-success'),
  })
    .then(() => {
      replaceState({
        type: SignUpStepEnums?.CONFIRM_CODE,
      });
      webLocalStorage.set(constants.SIGN_UP_INFO, { email: values?.email });
    })
    .catch((err) => err)
    .finally(() => dispatch(actionSignUp(false)));
};

const handleVerifyOtp = async (
  payloads: {
    code: string;
  },
  dispatch: any,
  replaceState: any,
  t: TFunction,
) => {
  dispatch(actionSignUp(true));
  const email = webLocalStorage.get(constants.SIGN_UP_INFO)?.email;

  await postRequest(endpointAuth?.VERIFY_OTP, {
    data: { ...payloads, email: email },
    messageSuccess: t('confirm-code.confirmation-code'),
  })
    .then((res) => {
      replaceState({
        type: SignUpStepEnums?.ACTIVATING_PRODUCT,
      });
      webLocalStorage.set(constants.ACCESS_TOKEN, res?.token);
    })
    .catch((err) => err)
    .finally(() => dispatch(actionSignUp(false)));
};

const handleResendOtp = async (t: TFunction) => {
  const payloads = webLocalStorage.get(constants.SIGN_UP_INFO)?.email;
  await postRequest(endpointAuth?.RESEND_OTP, {
    data: { email: payloads },
    messageSuccess: t('confirm-code.resend-confirmation-code'),
  })
    .then(() => {})
    .catch((err) => err);
};

const handleFinishSignUp = async (
  values: any,
  dispatch: any,
  navigate: any,
  t: TFunction,
  replaceState: any,
) => {
  dispatch(actionSignUp(true));
  const getInfoFromLocal = webLocalStorage.get(constants.SIGN_UP_INFO);
  const updateValues = Object?.keys(values)?.filter(
    (item: string) => values?.[item],
  );
  const updatePayloads = omit(
    { ...getInfoFromLocal, messagingPlatform: updateValues },
    omitSubmitSignUp || [],
  );

  await postRequest(endpointAuth?.COMPLETE_SIGN_UP, {
    data: updatePayloads,
    messageSuccess: t('sign-up-form.sign-up-success'),
  })
    .then(() => {
      replaceState({
        type: '',
      });
      localStorage.removeItem(constants?.SIGN_UP_INFO);

      navigate(AUTH_ROUTES?.SIGN_IN);
    })
    .catch((err) => err)
    .finally(() => dispatch(actionSignUp(false)));
};

const handleSignInApi = async (
  values: any,
  dispatch: any,
  navigate: any,
  t: TFunction,
) => {
  dispatch(actionSignUp(true));
  const updatePayloads = omit(values, ['remember']);

  try {
    const res = await postRequest(endpointAuth?.SIGN_IN, {
      data: updatePayloads,
      messageSuccess: t('sign-in-success'),
    });
    if (!res?.token) throw new Error('No token returned from login');

    dispatch(
      actionLogin({
        isAuth: true,
        rememberMe: values?.remember || false,
        userInfo: {
          userId: res?.userId,
          email: values?.email,
        },
        accessToken: res?.token,
      }),
    );

    // Save token to cookie for relay
    const Cookies = (await import('js-cookie')).default;
    Cookies.set(
      '_access_token',
      res?.token,
      values?.remember ? { expires: 30 } : {},
    );
    // Update relay environment to use new token
    const { updateRelayEnvironment } = await import('@/relay/RelayEnvironment');
    updateRelayEnvironment();

    await new Promise((resolve) => setTimeout(resolve, 0));
    const { default: relayEnvironment } = await import(
      '@/relay/RelayEnvironment'
    );
    const { fetchQuery } = await import('react-relay');
    const { workspaceInfoQuery } = await import('@/relay/WorkspaceInfoQuery');
    const { meQuery } = await import('@/relay/MeQuery');
    // 1. Call workspaceInfoQuery first
    const workspaceDataRaw = await fetchQuery(
      relayEnvironment,
      workspaceInfoQuery,
      {},
      { fetchPolicy: 'network-only' },
    ).toPromise();
    const workspaceData: any = workspaceDataRaw;
    const workspaces =
      workspaceData && Array.isArray(workspaceData.workspaces)
        ? workspaceData.workspaces
        : [];
    if (!workspaces.length) throw new Error('No workspace found');
    const firstWorkspace = workspaces[0];

    // 2. Call meQuery after having workspace
    const meDataRaw = await fetchQuery(
      relayEnvironment,
      meQuery,
      {},
      { fetchPolicy: 'network-only' },
    ).toPromise();
    const meData: any = meDataRaw;
    const userInfo = meData?.me;

    // 3. Update Redux store
    const {
      actionUpdateUserInfo,
      actionSetWorkspaces,
      actionUpdateWorkSpaceCurrent,
    } = await import('../store/features/auth');
    if (userInfo) dispatch(actionUpdateUserInfo(userInfo));
    if (workspaces) dispatch(actionSetWorkspaces(workspaces));
    if (firstWorkspace) dispatch(actionUpdateWorkSpaceCurrent(firstWorkspace));

    // 4. Set current workspace (get new token)
    const { handleSwitchWorkspaceApi } = await import(
      '@/modules/workspace/api/workspace'
    );
    let newToken = '';
    await new Promise((resolve, reject) => {
      handleSwitchWorkspaceApi(
        firstWorkspace.id,
        t,
        () => {},
        (token) => {
          newToken = token;
          resolve(token);
        },
      );
    });
    if (!newToken)
      throw new Error('No token returned from set current workspace');
    const webStorageClient = (await import('@/shared/utils/webStorageClient'))
      .default;
    webStorageClient.setToken(
      newToken,
      values?.remember ? { expires: 30 } : {},
    );
    const constants = (await import('@/core/settings')).constants;
    const webLocalStorage = (await import('@/shared/utils/webLocalStorage'))
      .default;
    webLocalStorage.set(constants.CURRENT_WORKSPACE, firstWorkspace);

    // 5. Navigate sang inbox
    navigate(MAIN_ROUTES?.INBOX);
  } catch (err) {
    // handle error (optionally show message)
  } finally {
    dispatch(actionSignUp(false));
  }
};

const handleRequestResetPassword = async (
  values: any,
  dispatch: any,
  t: TFunction,
) => {
  dispatch(actionSignUp(true));

  await postRequest(endpointAuth?.REQUEST_RESET_PASSWORD, {
    data: values,
    messageSuccess: t('forgot.a-password-reset'),
  })
    .then(() => {})
    .catch((err) => err)
    .finally(() => dispatch(actionSignUp(false)));
};

const handleResetPassword = async (
  values: any,
  dispatch: any,
  navigate: any,
  t: TFunction,
) => {
  dispatch(actionSignUp(true));
  await postRequest(endpointAuth?.RESET_PASSWORD, {
    data: values,
    messageSuccess: t('forgot.create-new-password-success'),
  })
    .then(() => {
      navigate(AUTH_ROUTES?.SIGN_IN);
    })
    .catch((err) => err)
    .finally(() => dispatch(actionSignUp(false)));
};

export {
  prefixAuth,
  endpointAuth,
  handleSignUp,
  handleVerifyOtp,
  handleResendOtp,
  handleFinishSignUp,
  handleSignInApi,
  handleRequestResetPassword,
  handleResetPassword,
  handleGoogleTokenLoginApi
};
