import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { WorkspaceMenusEnums } from '@/modules/settings/helpers/enums/workspace';
import { workspaceMenuType } from '@/modules/settings/constants/workspace.constant';
import WorkspaceSetupIntegrations from '../workspace-setup-integrations/WorkspaceSetupIntefrations';

import WorkspaceInformation from '../workspace-information/WorkspaceInformation';

import * as S from './WorkspaceContent.styles';

function Account() {
  const [search] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );

  const typeAccount =
    currentObjHistory?.find((item: any) => item?.key === workspaceMenuType)
      ?.value ||
    search?.get(workspaceMenuType) ||
    WorkspaceMenusEnums?.WORKSPACE_INFORMATION;

  const renderContentAccount = useMemo(() => {
    switch (typeAccount) {
      case WorkspaceMenusEnums?.WORKSPACE_INFORMATION:
        return <WorkspaceInformation />;
      case WorkspaceMenusEnums?.SETUP_INTEGRATIONS:
        return <WorkspaceSetupIntegrations />;
      default:
        break;
    }
  }, [typeAccount]);

  return <S.AccountContainer>{renderContentAccount}</S.AccountContainer>;
}

export default Account;
