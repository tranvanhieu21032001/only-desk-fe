import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('auth');
  const location = useLocation();

  // ✅ Lấy bước từ path cuối cùng
  const currentPath = location.pathname;
  const stepFromPath = currentPath.split('/').pop() || SignUpStepEnums.SIGN_UP;

  const renderContentSignUp = () => {
    switch (stepFromPath) {
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
  };

  return <S.SignInWrap>{renderContentSignUp()}</S.SignInWrap>;
}

export default SignUp;
