import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import { useEffect, useState } from 'react';
import { constants } from '@/core/settings';
import { handleSignUp } from '@/modules/auth/api/auth';
import { passwordRegex } from '@/shared/regex';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTES } from '@/core/routes/constants';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import webLocalStorage from '@/shared/utils/webLocalStorage';

import Input from '@/shared/components/common/Input';
import Checkbox from '@/shared/components/common/Checkbox';
import Typography from '@/shared/components/common/Typography';
import PhoneNumberByCountry from '@/shared/components/common/PhoneNumber';
import icGoogle from '@/assets/icons/common/ic-google.svg';

import * as S from './FormSignUp.styles';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

function StartForFree() {
  const { t } = useTranslation('auth');
  const API_SERVER = import.meta.env.VITE_API_SERVER;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  const policyWatch = Form.useWatch('policy', form);
  const passwordWatch = Form.useWatch('password', form);
  const { isLoading } = useAppSelector((state) => state?.auth);
  const signUpFromLocal = webLocalStorage?.get(constants?.SIGN_UP_INFO);

  useEffect(() => {
    if (!isEmpty(signUpFromLocal)) {
      form.setFieldsValue(signUpFromLocal);
    }
  }, []);

  async function handleFinish(values: any) {
    handleSignUp(values, dispatch, navigate);
  }

  function handleLoginWithGoogle() {
    setGoogleLoading(true);
    const googleLoginUrl = `${API_SERVER}/auth/google`;
    window.location.href = googleLoginUrl;
  }


  function handleLogin() {
    navigate(AUTH_ROUTES?.SIGN_IN);
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap
          form={form}
          onFinish={handleFinish}
          validateTrigger="onSubmit"
        >
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t('sign-up-form.start-for-free')}
            </S.Title>
            <S.Subtitle textAlign="center">
              {t('sign-up-form.already-have-an-account')}
              <S.SignInAction onClick={handleLogin}>
                {' '}
                {t('sign-up-form.login')}
              </S.SignInAction>
            </S.Subtitle>
          </S.LoginLabelWrap>

          <S.FormItem
            name="email"
            rules={[
              {
                required: true,
                message: t('sign-up-form.please-enter-business-email'),
              },
              {
                type: 'email',
                message: t('email-invalid'),
              },
            ]}
          >
            <Input
              label={t('sign-up-form.business-email')}
              isRequired
              placeholder={t('sign-up-form.enter-your-business-email')}
              type="email"
            />
          </S.FormItem>

          <S.FormItem
            name="password"
            rules={[
              {
                required: true,
                message: t('please-enter-password'),
              },
              {
                pattern: passwordRegex,
                message: t('sign-up-form.password-invalid'),
              },
            ]}
          >
            <Input
              label={t('password')}
              isRequired
              placeholder={t('sign-up-form.enter-your-password')}
              isPassword
            />
          </S.FormItem>

          <S.FormItem
            name="confirmPassword"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(
                      new Error(
                        t('sign-up-form.please-enter-confirm-password'),
                      ),
                    );
                  } else if (value && value !== passwordWatch) {
                    return Promise.reject(
                      new Error(t('sign-up-form.password-not-match')),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              label={t('sign-up-form.confirm-password')}
              isRequired
              placeholder={t('sign-up-form.enter-your-confirm-password')}
              isPassword
            />
          </S.FormItem>

          <S.FormItem
            name="phoneNumber"
            rules={[
              {
                required: false,
                message: t('sign-up-form.please-enter-mobile-phone-number'),
              },
            ]}
          >
            <PhoneNumberByCountry
              label={t('sign-up-form.mobile-phone-number')}
              placeholder={t('sign-up-form.enter-your-mobile-phone-number')}
              nameField="phoneNumber"
              currentInstanceForm={form}
              isParsePhoneNumber={true}
            />
          </S.FormItem>

          <S.YouAgree>
            <S.FormItem
              name="policy"
              valuePropName="checked"
              $isRememberMe={true}
            >
              <Checkbox />
            </S.FormItem>
            <Typography>
              {t('sign-up-form.you-agree')}
              <S.SignInAction> {t('sign-up-form.term-of-use')} </S.SignInAction>
              {t('sign-up-form.and')}{' '}
              <S.SignInAction>
                {t('sign-up-form.privacy-policy')}
              </S.SignInAction>
            </Typography>
          </S.YouAgree>

          <S.LoginButton
            type="primary"
            onClick={form.submit}
            disabled={!policyWatch || isLoading}
            isLoading={isLoading}
          >
            {t('sign-up-form.sign-up')}
          </S.LoginButton>

          <S.DriversLicenseWrap />

          <S.LoginButton onClick={handleLoginWithGoogle} isLoading={googleLoading}>
            <Image src={icGoogle} />
            <Typography fontWeight={fontWeight?.semiBold} margin='0 0 0 8px'>{t('sign-in-with-google')}</Typography>
          </S.LoginButton>

          {/* <S.LoginButton onClick={handleLoginWithFacebook}>
            <Image src={icApple} />
            {t('sign-in-with-facebook')}
          </S.LoginButton> */}
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default StartForFree;
