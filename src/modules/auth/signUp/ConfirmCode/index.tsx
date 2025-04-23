import { Form, Image } from "antd";
import OTPInput from "react-otp-input";
import { Trans, useTranslation } from "react-i18next";

import { useRouter } from "@/shared/hooks/useRouter";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { handleResendOtp, handleVerifyOtp } from "../../api/auth";

import Button from "@/shared/components/common/Button";

import icGoogle from "@/assets/icons/common/ic-google.svg";
import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-up.styles";

function ConfirmCode() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const { replaceState } = useRouter();

  const {isLoading} = useAppSelector((state) => state?.auth);
    
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

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleContinue}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("confirm-code.enter-confirmation-code")}
            </S.Title>
            <Trans
              textAlign="center"
              i18nKey={t("confirm-code.we-sent")}
              values={{ email: "abc@gmail.com" }}
              components={{ email: <S.Email /> }}
            />
          </S.LoginLabelWrap>

          <Form.Item name="code" className="otp-form-item">
            <OTPInput
              onChange={(value) => {
                if (value?.length === 6) {
                  form.submit();
                }
              }}
              containerStyle="otp-input-wrapper"
              inputStyle="otp-input"
              shouldAutoFocus={true}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  onKeyDown={(event) => {
                    const re = /^[0-9\b]+$/;
                    if (!re.test(event?.key) && event?.key !== "Backspace") {
                      event?.preventDefault();
                    }
                  }}
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
            <S.LoginButton type="primary" onClick={form.submit} isLoading={isLoading} disabled={isLoading}>
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
