import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { useRouter } from '@/shared/hooks/useRouter';
import { workspaceMenus } from '@/modules/settings/helpers/data/workspace';
import { accountMenuType } from '@/modules/settings/constants/account.constant';
import { WorkspaceMenusEnums } from '@/modules/settings/helpers/enums/workspace';
import { WorkspaceMenuInterface } from '@/modules/settings/models/workspace.model';

import Typography from '@/shared/components/common/Typography';

import * as S from './Workspace.styles';

function WorkspaceMenus() {
  const { t } = useTranslation('settingWorkspace');

  const { replaceState } = useRouter();
  const [search] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );

  const typeAccount =
    currentObjHistory?.find((item: any) => item?.key === accountMenuType)
      ?.value ||
    search?.get(accountMenuType) ||
    WorkspaceMenusEnums?.WORKSPACE_INFORMATION;

  function handleTriggerMenu(e: WorkspaceMenusEnums) {
    replaceState({
      [accountMenuType]: e,
    });
  }

  return (
    <S.WorkspaceContainer>
      <S.Categories>
        {workspaceMenus?.map((menu: WorkspaceMenuInterface) => (
          <S.CategoryWrap
            key={menu?.key}
            $isActive={typeAccount === menu?.key}
            onClick={() => handleTriggerMenu(menu?.key)}
          >
            <Typography>{t(`workspace-menus.${menu?.label}`)}</Typography>
          </S.CategoryWrap>
        ))}
      </S.Categories>
    </S.WorkspaceContainer>
  );
}

export default WorkspaceMenus;
