import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { SignUpStepEnums } from '../../helpers/enums/auth';

import YourName from '@/modules/auth/components/sign-up/your-name/YourName';
import Customer from '@/modules/auth/components/sign-up/customer/Customer';
import StartForFree from '@/modules/auth/components/sign-up/form-sign-up/FormSignUp';
import ConfirmCode from '@/modules/auth/components/sign-up/confirm-code/ConfirmCode';
import CompanySize from '@/modules/auth/components/sign-up/company-size/CompanySize';
import WebsiteAddress from '@/modules/auth/components/sign-up/website-address/WebsiteAddress';
import InviteYourTeam from '@/modules/auth/components/sign-up/invite-your-team/InviteYourTeam';
import ConnectOnlyChat from '@/modules/auth/components/sign-up/connect-only-chat/ModalInviteYourDeveloper';
import ActivationProduct from '@/modules/auth/components/sign-up/activation-product/ActivationProduct';

import * as S from './SignUp.styles';

function SignUp() {
  const [search] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );

  const signUpType =
    (currentObjHistory || [])?.find((item: any) => item?.key === 'type')
      ?.value || search.get('type');

  const renderContentSignUp = useMemo(() => {
    switch (signUpType) {
      case SignUpStepEnums?.SIGN_UP:
        return <StartForFree />;
      case SignUpStepEnums?.CONFIRM_CODE:
        return <ConfirmCode />;
      case SignUpStepEnums?.ACTIVATING_PRODUCT:
        return <ActivationProduct />;
      case SignUpStepEnums?.YOUR_NAME:
        return <YourName />;
      case SignUpStepEnums?.WEBSITE_ADDRESS:
        return <WebsiteAddress />;
      case SignUpStepEnums?.CONNECT_ONLY_CHAT:
        return <ConnectOnlyChat />;
      case SignUpStepEnums?.COMPANY_SIZE:
        return <CompanySize />;
      case SignUpStepEnums?.INVITE_YOUR_TEAM:
        return <InviteYourTeam />;
      case SignUpStepEnums?.CUSTOMER:
        return <Customer />;
      default:
        return <StartForFree />;
    }
  }, [signUpType]);

  return <S.SignInWrap>{renderContentSignUp}</S.SignInWrap>;
}

export default SignUp;
