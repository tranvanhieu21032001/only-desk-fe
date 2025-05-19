import { patchRequest } from '@/core/services/requests/patchRequest';
import { actionUpdateUserInfo } from '@/modules/auth/store/features/auth';

const prefixBase: string = '';

const endpointAccountInformation = {
  UPDATE_ACCOUNT_INFORMATION: `${prefixBase}/users/profile`,
};

const handleUpdateAccountInformation = async (
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
) => {
  await patchRequest(endpointAccountInformation?.UPDATE_ACCOUNT_INFORMATION, {
    data: dataChange,
    messageSuccess: messageSuccess,
  })
    .then(() => dispatch(actionUpdateUserInfo(dataChange)))
    .catch(() => {})
    .finally(() => {
      setParams((prev) => ({
        ...prev,
        isLoading: false,
        isLoadingDifferentField: false,
      }));
    });
};

export { handleUpdateAccountInformation };
