import { Form, Image } from "antd";
import OTPInput from "react-otp-input";
import { useTranslation } from "react-i18next";

import { constants } from "@/core/settings";
import { useRouter } from "@/shared/hooks/useRouter";
import webLocalStorage from "@/shared/utils/webLocalStorage";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { handleResendOtp, handleVerifyOtp } from "../../api/auth";

import Button from "@/shared/components/common/Button";

import icGoogle from "@/assets/icons/common/ic-google.svg";
import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-up.styles";
import Typography from "@/shared/components/common/Typography";

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
   handleResendOtp(dispatch, t);
  }

  function handleOpenGmail() {
    //Handle later
  }

  console.log(codeWatch);
  
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
              <Image src={icGoogle} preview={false} />
              {t("confirm-code.open-gmail")}
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
