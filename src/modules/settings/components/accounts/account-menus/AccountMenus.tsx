import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { useRouter } from '@/shared/hooks/useRouter';
import { accountMenus } from '../../../helpers/data/account';
import { AccountMenusEnums } from '../../../helpers/enums/account';
import { AccountMenuInterface } from '../../../models/account.model';
import { accountMenuType } from '../../../constants/account.constant';

import Typography from '@/shared/components/common/Typography';

import * as S from './AccountMenus.styles';

function AccountMenus() {
  const { t } = useTranslation('settings');

  const { replaceState } = useRouter();
  const [search] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );

  const typeAccount =
    currentObjHistory?.find((item: any) => item?.key === accountMenuType)
      ?.value ||
    search?.get(accountMenuType) ||
    AccountMenusEnums?.ACCOUNT_INFORMATION;

  function handleTriggerMenu(e: AccountMenusEnums) {
    replaceState({
      [accountMenuType]: e,
    });
  }

  return (
    <S.CategoryContainer>
      <S.Categories>
        {accountMenus?.map((menu: AccountMenuInterface) => (
          <S.CategoryWrap
            key={menu?.key}
            $isActive={typeAccount === menu?.key}
            onClick={() => handleTriggerMenu(menu?.key)}
          >
            <Typography>{t(`account-menus.${menu?.label}`)}</Typography>
          </S.CategoryWrap>
        ))}
      </S.Categories>
    </S.CategoryContainer>
  );
}

export default AccountMenus;
