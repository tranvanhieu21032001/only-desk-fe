import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Recover from '@/modules/auth/components/forgot-password/forgot-password/ForgotPassword';
import CreateNewPassword from '@/modules/auth/components/forgot-password/create-new-password/CreateNewPassword';

import * as S from './ForgotPassword.styles';

function ForgotPassWord() {
  const [search] = useSearchParams();

  const renderContent = useMemo(() => {
    const token = search.get('token');
    if (token) {
      return <CreateNewPassword />;
    }
    return <Recover />;
  }, [search]);

  return <S.SignInWrap>{renderContent}</S.SignInWrap>;
}

export default ForgotPassWord;
