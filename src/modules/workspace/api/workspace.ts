import { TFunction } from 'i18next';

import { decodeGlobalId } from '@/shared/utils/decode';
import { postRequest } from '@/core/services/requests';
import { patchRequest } from '@/core/services/requests/patchRequest';
import {
  actionSetGlobalLoading,
  actionCreateWorkspace,
} from '@/modules/auth/store/features/auth';
import { eventBus } from '@/core/event-bus';
import { EVENTBUS_WORKSPACE_CHANGED } from '@/core/settings/constants';
import { store } from '@/core/store';

const prefixAuth: string = '';

const endpointAuth = {
  WORKSPACE: `${prefixAuth}/workspaces`,
  CURRENT_WORKSPACE: `${prefixAuth}/users/current-workspace`,
};

const handleCreateWorkspaceApi = async (
  values: any,
  t: TFunction,
  handleOpenModalCreateWorkspace: () => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: React.Dispatch<any>,
) => {
  await postRequest(endpointAuth?.WORKSPACE, {
    data: values,
    messageSuccess: t('create-workspace.create-workspace-success'),
  })
    .then((res) => {
      handleOpenModalCreateWorkspace();
      dispatch(actionCreateWorkspace(res));
    })
    .catch((err) => err)
    .finally(() => setIsLoading((prev) => !prev));
};

const handleSwitchWorkspaceApi = async (
  workspaceId: string,
  _t: TFunction,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onSuccess?: (token: string) => void,
) => {
  setIsLoading(true);
  store.dispatch(actionSetGlobalLoading(true));
  try {
    const rawWorkspaceId = decodeGlobalId(workspaceId);
    
    const response = await patchRequest(endpointAuth?.CURRENT_WORKSPACE, {
      data: { workspaceId: rawWorkspaceId },
      messageSuccess: "Switch workspace successfully!",
    });

    if (response?.token) {
      onSuccess?.(response.token);
      eventBus.emit(EVENTBUS_WORKSPACE_CHANGED as any);
    }
  } catch (error) {
    console.error('Failed to switch workspace:', error);
  } finally {
    setIsLoading(false);
    store.dispatch(actionSetGlobalLoading(false));
  }
};

export { handleCreateWorkspaceApi, handleSwitchWorkspaceApi };
