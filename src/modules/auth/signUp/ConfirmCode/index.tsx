import { Form, Image } from "antd";
import OTPInput from "react-otp-input";
import { useTranslation } from "react-i18next";

import { constants } from "@/core/settings";
import { useRouter } from "@/shared/hooks/useRouter";
import webLocalStorage from "@/shared/utils/webLocalStorage";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { handleResendOtp, handleVerifyOtp } from "../../api/auth";

import Button from "@/shared/components/common/Button";
import Typography from "@/shared/components/common/Typography";

import icGoogle from "@/assets/icons/auth/ic-email.svg";
import icEmail from "@/assets/icons/auth/ic-email.svg";
import icGmail from "@/assets/icons/common/ic-google.svg";
import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-up.styles";

function ConfirmCode() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const { replaceState } = useRouter();
  const codeWatch = Form.useWatch("code",form);

  const {isLoading} = useAppSelector((state) => state?.auth);
    
  const signUpFromLocal = webLocalStorage?.get(constants?.SIGN_UP_INFO)
  
  function handleContinue(values:any) {
   const payloads ={
      code: values?.code,
    }
   handleVerifyOtp(payloads, dispatch, replaceState, t);
  }

  function handleGetANewOtp() {
   handleResendOtp(t);
  }

  function handleOpenGmail() {
  const domain: string = signUpFromLocal?.email.split('@')[1]?.toLowerCase() || '';
  const providers = {
    'gmail.com': 'https://mail.google.com',
    'outlook.com': 'https://outlook.live.com',
    'hotmail.com': 'https://outlook.live.com',
    'yahoo.com': 'https://mail.yahoo.com',
    'icloud.com': 'https://www.icloud.com/mail',
    'aol.com': 'https://mail.aol.com',
    'gmx.com': 'https://mail.gmx.com',
    'mail.com': 'https://www.mail.com',
    'proton.me': 'https://proton.me/mail',
    'zoho.com': 'https://mail.zoho.com',
    'yandex.com': 'https://mail.yandex.com',
    'mail.ru': 'https://mail.ru',
    '163.com': 'https://mail.163.com',
    '126.com': 'https://mail.126.com',
    'qq.com': 'https://mail.qq.com',
    'fastmail.com': 'https://fastmail.com',
    'tutanota.com': 'https://mail.tutanota.com',
    'posteo.de': 'https://posteo.de',
    'hushmail.com': 'https://www.hushmail.com'
  };

  const url = providers?.[domain as keyof typeof providers];
  if (url) {
    window.open(url, '_blank');
  } else {
    alert('Unsupported email provider');
  }
}

function isGmail() {
  const domain = signUpFromLocal?.email.split('@')[1]?.toLowerCase();
  return domain === 'gmail.com';
}
  
  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleContinue}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("confirm-code.enter-confirmation-code")}
            </S.Title>
            <Typography textAlign="center">{t('confirm-code.we-sent')} <S.Email>{signUpFromLocal?.email || ' --/-- ' }</S.Email> {t('confirm-code.go-to')}</Typography>
          </S.LoginLabelWrap>

            <Form.Item name="code" className="otp-form-item">
            <OTPInput
              onChange={(value) => {
              if (value?.length === 6) {
              form.submit();
              }
              }}
              containerStyle="otp-input-wrapper"
              shouldAutoFocus={true}
              numInputs={6}
              renderInput={(props) => (
              <S.InputNumber
              {...props}
              type="number"
              />
              )}
            />
            </Form.Item>

          <S.Gmail>
            <Button width="fit-content" onClick={handleOpenGmail}>
              <Image src={icGoogle} preview={false} width={24} height={28} />
              {t("confirm-code.open-email")}
              <Image src={isGmail() ? icGmail : icEmail} preview={false} width={24} height={28} />
              {t(`confirm-code.${isGmail() ? 'open-gmail' :'open-email'}`)}
            </Button>
          </S.Gmail>

          <S.Continue>
            <S.LoginButton type="primary" onClick={form.submit} isLoading={isLoading} disabled={isLoading || codeWatch?.length < 6 || !codeWatch}>
              {t("confirm-code.continue")}
              <Image src={icArrowRight} preview={false} />
            </S.LoginButton>

            <S.Subtitle textAlign="center" margin="12px 0 0 0">
              {t("confirm-code.didnt-get")}
              <S.SignInAction onClick={handleGetANewOtp}>
                {" "}
                {t("confirm-code.get-a-new")}
              </S.SignInAction>
            </S.Subtitle>
          </S.Continue>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default ConfirmCode;
