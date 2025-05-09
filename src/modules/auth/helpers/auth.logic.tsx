import { TFunction } from 'i18next';

import { AuthStatusInstalledCodeEnums } from './auth.enums';

import Typography from '@/shared/components/common/Typography';

import themeColors from '@/shared/styles/themes/default/colors';

import * as S from '@/modules/auth/components/sign-up/connect-only-chat/ModalInviteYourDeveloper.styles';

const renderStatusInstalled = (
  status: AuthStatusInstalledCodeEnums,
  t: TFunction,
) => {
  switch (status) {
    case AuthStatusInstalledCodeEnums?.NOT_INSTALLED:
      return (
        <S.StatusWrap>
          <Typography color={themeColors?.errorDark}>
            {t('connect-onlychat.not-installed')}
          </Typography>
        </S.StatusWrap>
      );

    default:
      break;
  }
};

export { renderStatusInstalled };
