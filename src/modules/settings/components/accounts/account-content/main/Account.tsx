import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { AccountMenusEnums } from '@/modules/settings/helpers/enums/account';
import { accountMenuType } from '@/modules/settings/constants/account.constant';

import AccountInformation from '../account-information/main/AccountInformation';

import * as S from './Account.styles';

function Account() {
  const [search] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );

  const typeAccount =
    currentObjHistory?.find((item: any) => item?.key === accountMenuType)
      ?.value ||
    search?.get(accountMenuType) ||
    AccountMenusEnums?.ACCOUNT_INFORMATION;

  const renderContentAccount = useMemo(() => {
    switch (typeAccount) {
      case AccountMenusEnums?.ACCOUNT_INFORMATION:
        return <AccountInformation />;
      default:
        return null;
    }
  }, []);

  return <S.AccountContainer>{renderContentAccount}</S.AccountContainer>;
}

export default Account;
