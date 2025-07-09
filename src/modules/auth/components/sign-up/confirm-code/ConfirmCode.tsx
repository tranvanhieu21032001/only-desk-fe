import { Form, Image, message, Spin } from 'antd';
import OTPInput from 'react-otp-input';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { constants } from '@/core/settings';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { handleResendOtp, handleVerifyOtp } from '@/modules/auth/api/auth';

import Typography from '@/shared/components/common/Typography';
import icArrowRight from '@/assets/icons/common/ic-arrow-right.svg';

import * as S from './ConfirmCode.styles';
import { useNavigate } from 'react-router-dom';

function ConfirmCode() {
  const { t } = useTranslation('auth');

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const codeWatch = Form.useWatch('code', form);

  const { isLoading } = useAppSelector((state) => state?.auth);
  const signUpFromLocal = webLocalStorage?.get(constants?.SIGN_UP_INFO);

  const [isResending, setIsResending] = useState(false);

  function handleContinue(values: any) {
    const payloads = {
      code: values?.code,
    };
    handleVerifyOtp(payloads, dispatch, navigate);
  }

  async function handleGetANewOtp() {
    setIsResending(true);
    try {
      await handleResendOtp(t);
    } catch (error) {
      message.error(t('confirm-code.sent-failed'));
    } finally {
      setIsResending(false);
    }
  }

  // function handleOpenGmail() {
  //   const domain: string =
  //     signUpFromLocal?.email.split('@')[1]?.toLowerCase() || '';
  //   const providers = {
  //     'gmail.com': 'https://mail.google.com',
  //     'outlook.com': 'https://outlook.live.com',
  //     'hotmail.com': 'https://outlook.live.com',
  //     'yahoo.com': 'https://mail.yahoo.com',
  //     'icloud.com': 'https://www.icloud.com/mail',
  //     'aol.com': 'https://mail.aol.com',
  //     'gmx.com': 'https://mail.gmx.com',
  //     'mail.com': 'https://www.mail.com',
  //     'proton.me': 'https://proton.me/mail',
  //     'zoho.com': 'https://mail.zoho.com',
  //     'yandex.com': 'https://mail.yandex.com',
  //     'mail.ru': 'https://mail.ru',
  //     '163.com': 'https://mail.163.com',
  //     '126.com': 'https://mail.126.com',
  //     'qq.com': 'https://mail.qq.com',
  //     'fastmail.com': 'https://fastmail.com',
  //     'tutanota.com': 'https://mail.tutanota.com',
  //     'posteo.de': 'https://posteo.de',
  //     'hushmail.com': 'https://www.hushmail.com',
  //   };

  //   const url = providers?.[domain as keyof typeof providers];
  //   if (url) {
  //     window.open(url, '_blank');
  //   } else {
  //     alert('Unsupported email provider');
  //   }
  // }

  // function isGmail() {
  //   const domain = signUpFromLocal?.email.split('@')[1]?.toLowerCase();
  //   return domain === 'gmail.com';
  // }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleContinue}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t('confirm-code.enter-confirmation-code')}
            </S.Title>
            <Typography textAlign="center">
              {t('confirm-code.we-sent')}{' '}
              <S.Email>{signUpFromLocal?.email || '--/--'}</S.Email>{' '}
              {t('confirm-code.go-to')}
            </Typography>
          </S.LoginLabelWrap>

          <Form.Item
            name="code"
            className="otp-form-item"
            rules={[{ required: true, message: t('confirm-code.required') }]}
          >
            <OTPInput
              value={codeWatch || ''}
              onChange={(value) => form.setFieldsValue({ code: value })}
              containerStyle="otp-input-wrapper"
              shouldAutoFocus={true}
              numInputs={6}
              renderInput={(props) => (
                <S.InputNumber {...props} type="number" />
              )}
            />
          </Form.Item>

          {/* Gmail button (disabled)
          <S.Gmail>
            <Button width="fit-content" onClick={handleOpenGmail}>
              <Image
                src={isGmail() ? icGmail : icEmail}
                preview={false}
                width={24}
                height={28}
              />
              {t(`confirm-code.${isGmail() ? 'open-gmail' : 'open-email'}`)}
            </Button>
          </S.Gmail>
          */}

          <S.Continue>
            <S.LoginButton
              type="primary"
              onClick={form.submit}
              isLoading={isLoading}
              disabled={isLoading || (codeWatch?.length || 0) < 6}
            >
              {t('confirm-code.continue')}
              <Image src={icArrowRight} preview={false} />
            </S.LoginButton>

            <S.Subtitle textAlign="center" margin="12px 0 0 0">
              {t('confirm-code.didnt-get')}
              <S.SignInAction onClick={!isResending ? handleGetANewOtp : undefined}>
                {isResending ? <Spin size="small" /> : t('confirm-code.get-a-new')}
              </S.SignInAction>
            </S.Subtitle>
          </S.Continue>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default ConfirmCode;
