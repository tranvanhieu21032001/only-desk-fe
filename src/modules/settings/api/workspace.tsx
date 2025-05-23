import { patchRequest } from '@/core/services/requests/patchRequest';
import { WorkspaceInterface } from '@/modules/auth/models/user';
import { actionUpdateCurrentWorkspace } from '@/modules/auth/store/features/auth';
import { WorkspaceFieldsEditEnums } from '../helpers/enums/workspace';

const prefixBase: string = '';

const endpointWorkspacesSetting = {
  UPDATE_WORKSPACES_INFORMATION: `${prefixBase}/workspaces/:id`,
};

const handleUpdateWorkspaceInformation = async (
  messageSuccess: string,
  dataChange: { [key: string]: string },
  setParams: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      countUpload: number;
      progressPercent: number;
    }>
  >,
  dispatch: any,
  currentWorkspace: WorkspaceInterface,
) => {
  const metadata: any = { ...currentWorkspace?.metadata };

  Object.keys(dataChange).forEach((key) => {
    if (
      Object.values(WorkspaceFieldsEditEnums).includes(
        key as WorkspaceFieldsEditEnums,
      )
    ) {
      metadata[key] = dataChange[key];
    }
  });

  await patchRequest(
    endpointWorkspacesSetting?.UPDATE_WORKSPACES_INFORMATION?.replace(
      ':id',
      currentWorkspace?.id as string,
    ),
    {
      data: { ...dataChange, metadata },
      messageSuccess: messageSuccess,
    },
  )
    .then((res) => {
      if (res) {
        dispatch(actionUpdateCurrentWorkspace(res));
      }
    })
    .catch(() => {})
    .finally(() => {
      setParams((prev) => ({
        ...prev,
        isLoading: false,
        isLoadingDifferentField: false,
      }));
    });
};

export { handleUpdateWorkspaceInformation };
