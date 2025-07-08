import { Image } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { MAIN_ROUTES } from '@/core/routes/constants';
import themeColors from '@/shared/styles/themes/default/colors';
import { langOptions } from '@/modules/auth/helpers/data/signIn';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { SignUpStepEnums } from '@/modules/auth/helpers/enums/auth';
import { OptionsInterface } from '@/core/model/common';

import Typography from '@/shared/components/common/Typography';

import logo from '@/assets/icons/common/ic-logo.svg';
import back from '@/assets/icons/auth/ic-arrow-left.svg';

import * as S from './auth.styles';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const pathParts = window.location.pathname.split('/');
  const signUpType = pathParts[pathParts.length - 1] || SignUpStepEnums.SIGN_UP;

  const showInprogress = useMemo(() => {
    return window.location.pathname.includes('/auth/sign-up');
  }, [window.location.pathname]);

  function handleBack() {
    switch (signUpType) {
      case SignUpStepEnums.SIGN_UP:
        return window.history.back();
      case SignUpStepEnums.CONFIRM_CODE:
        return navigate(`/auth/sign-up/${SignUpStepEnums.SIGN_UP}`);
      case SignUpStepEnums.YOUR_NAME:
        return navigate(`/auth/sign-up/${SignUpStepEnums.CONFIRM_CODE}`);
      case SignUpStepEnums.WEBSITE_ADDRESS:
        return navigate(`/auth/sign-up/${SignUpStepEnums.YOUR_NAME}`);
      case SignUpStepEnums.CONNECT_ONLY_CHAT:
        return navigate(`/auth/sign-up/${SignUpStepEnums.WEBSITE_ADDRESS}`);
      case SignUpStepEnums.COMPANY_SIZE:
        return navigate(`/auth/sign-up/${SignUpStepEnums.CONNECT_ONLY_CHAT}`);
      case SignUpStepEnums.INVITE_YOUR_TEAM:
        return navigate(`/auth/sign-up/${SignUpStepEnums.COMPANY_SIZE}`);
      case SignUpStepEnums.CUSTOMER:
        return navigate(`/auth/sign-up/${SignUpStepEnums.INVITE_YOUR_TEAM}`);
      case SignUpStepEnums.ACTIVATING_PRODUCT:
        return navigate(`/auth/sign-up/${SignUpStepEnums.CUSTOMER}`);
      default:
        return window.history.back();
    }
  }

  function handleRedirectHome() {
    navigate(MAIN_ROUTES.HOME, { replace: true });
  }

  return (
    <S.WrapAuthLayout>
      <S.AuthLayout className="box-container">
        <S.Header>
          <S.HeaderWrap>
            <S.Logo src={logo} onClick={handleRedirectHome} />
            <S.MultipleLangWrap>
              <S.NeedHelp
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.secondary}
              >
                {t('need-help')}
              </S.NeedHelp>
              <S.Divider />
              <S.ChangeLang
                defaultValue={langOptions?.[0]?.value}
                popupClassName="auth-lang"
              >
                {langOptions?.map((lang: OptionsInterface) => (
                  <S.LangOption key={lang?.key}>
                    <Image src={lang?.flag as string} preview={false} />
                    <Typography>{t(`language.${lang?.label}`)}</Typography>
                  </S.LangOption>
                ))}
              </S.ChangeLang>
            </S.MultipleLangWrap>
          </S.HeaderWrap>

          {showInprogress && (
            <S.Inprogress>
              <S.Back onClick={handleBack}>
                <Image src={back} preview={false} />
                <Typography
                  color={themeColors?.secondary}
                  fontWeight={fontWeight?.semiBold}
                >
                  {t('back')}
                </Typography>
              </S.Back>

              <S.LineProgressWrap>
                {Object.values(SignUpStepEnums).map((key, index) => {
                  const currentIndex = Object.values(SignUpStepEnums).indexOf(
                    signUpType as SignUpStepEnums,
                  );
                  let lineColor = '';

                  if (index < currentIndex) {
                    lineColor = 'old';
                  } else if (index === currentIndex) {
                    lineColor = 'current';
                  }

                  return <S.Line key={key} $color={lineColor} />;
                })}
              </S.LineProgressWrap>
            </S.Inprogress>
          )}
        </S.Header>

        <S.ChildrenWrap>{children}</S.ChildrenWrap>
      </S.AuthLayout>
    </S.WrapAuthLayout>
  );
}
