import { TFunction } from 'i18next';

import { postRequest } from '@/core/services/requests';

const prefixAuth: string = '';

const endpointAuth = {
  WORKSPACE: `${prefixAuth}/workspaces`,
};

const handleCreateWorkspaceApi = async (
  values: any,
  t: TFunction,
  handleOpenModalCreateWorkspace: () => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  await postRequest(endpointAuth?.WORKSPACE, {
    data: values,
    messageSuccess: t('create-workspace.create-workspace-success'),
  })
    .then(() => {
      handleOpenModalCreateWorkspace();
    })
    .catch((err) => err)
    .finally(() => setIsLoading((prev) => !prev));
};

export { handleCreateWorkspaceApi };
