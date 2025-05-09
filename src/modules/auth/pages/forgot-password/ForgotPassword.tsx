import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { RecoverPassStepEnums } from '../../helpers/enums/auth';

import Recover from '@/modules/auth/components/forgot-password/forgot-password/ForgotPassword';
import CreateNewPassword from '@/modules/auth/components/forgot-password/create-new-password/CreateNewPassword';

import * as S from './ForgotPassword.styles';

function ForgotPassWord() {
  const [search] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );

  const signUpType =
    (currentObjHistory || [])?.find((item: any) => item?.key === 'type')
      ?.value || search.get('type');

  const renderContentSignUp = useMemo(() => {
    switch (signUpType) {
      case RecoverPassStepEnums?.RECOVER_PASS:
        return <Recover />;
      case RecoverPassStepEnums?.CREATE_NEW_PASS:
        return <CreateNewPassword />;
      default:
        return <Recover />;
    }
  }, [signUpType]);

  return <S.SignInWrap>{renderContentSignUp}</S.SignInWrap>;
}

export default ForgotPassWord;
