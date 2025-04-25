import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { handleSignInApi } from "../api/auth";
import { passwordRegex } from "@/shared/regex";
import { AUTH_ROUTES } from "@/core/routes/constants";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";

import Input from "@/shared/components/common/Input";
import Checkbox from "@/shared/components/common/Checkbox";
import Typography from "@/shared/components/common/Typography";

import icApple from "@/assets/icons/common/ic-apple.svg";
import icGoogle from "@/assets/icons/common/ic-google.svg";
import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-in.styles";

function SignIn() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const [form] = Form.useForm();
  const {isLoading} = useAppSelector((state) => state?.auth);

  function handleSignIn(values: any) {
    handleSignInApi(values, dispatch, navigate , t);
  }

  function handleLoginWithGoogle() {
    //Handle later
  }

  function handleLoginWithFacebook() {
    //Handle later
  }

  function handleSignUp() {
    navigate(AUTH_ROUTES?.SIGN_UP);
  }

  function handleForgotPassWord() {
    navigate(AUTH_ROUTES?.FORGOT_PASSWORD);
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleSignIn} validateTrigger="onSubmit">
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("login")}
            </S.Title>
            <S.Subtitle textAlign="center">
              {t("dont-have")}{" "}
              <S.SignInAction onClick={handleSignUp}>
                {t("sign-up")}
              </S.SignInAction>
            </S.Subtitle>
          </S.LoginLabelWrap>

          <S.FormItem
            name="email"
            rules={[
              {
                required: true,
                message: t("please-enter-email"),
              },
              {
                type: "email",
                message: t("email-invalid"),
              },
            ]}
          >
            <Input
              label={t("email")}
              isRequired
              placeholder={t("enter-your-email")}
              type="email"
            />
          </S.FormItem>

          <S.ForgotPassword>
            <Typography>{t('password')}
              <span style={{ color: "red" }}> *</span>
            </Typography>
            <S.SignInAction onClick={handleForgotPassWord}>{t("forgot-password")}</S.SignInAction>
          </S.ForgotPassword>

          <S.FormItem
            name="password"
            $margin="0 0 36px 0"
            rules={[
              {
                required: true,
                message: t("please-enter-password"),
              },
              {
                pattern: passwordRegex,
               message: t("sign-up-form.password-invalid"),
              },
            ]}
          >
            <Input
              isRequired
              placeholder={t("enter-your-password")}
              type="password"
            />
          </S.FormItem>

          <S.RememberMe>
            <Typography>{t("remember-me")}</Typography>

            <S.FormItem name="remember" $isRememberMe={true} valuePropName="checked">
              <Checkbox />
            </S.FormItem>
          </S.RememberMe>

          <S.LoginButton type="primary" onClick={form.submit} isLoading={isLoading} disabled={isLoading}>
            {t("login")}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>

          <S.DriversLicenseWrap />

          <S.LoginButton onClick={handleLoginWithGoogle}>
            <Image src={icGoogle} preview={false} />
            {t("sign-in-with-google")}
          </S.LoginButton>

          <S.LoginButton onClick={handleLoginWithFacebook}>
            <Image src={icApple} preview={false} />
            {t("sign-in-with-facebook")}
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default SignIn;
