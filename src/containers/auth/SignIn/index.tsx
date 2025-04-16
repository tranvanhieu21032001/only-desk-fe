import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import { OptionsInterface } from "@/model/common";
import { langOptions } from "@/helpers/data/signIn";
import Typography from "@/components/common/Typography";
import themeColors from "@/styles/themes/default/colors";
import fontWeight from "@/styles/themes/default/fontWeight";

import Input from "@/components/common/Input";
import Checkbox from "@/components/common/Checkbox";

import * as S from "./sign-in.styles";

import logo from "@/assets/icons/common/ic-logo.svg";
import icApple from "@/assets/icons/common/ic-apple.svg";
import icGoogle from "@/assets/icons/common/ic-google.svg";

function SignIn() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();

  function handleLogic() {
    //Handle later
  }

  function handleLoginWithGoogle() {
    //Handle later
  }

  function handleLoginWithFacebook() {
    //Handle later
  }

  return (
    <S.SignInWrap>
      <S.HeaderWrap>
        <S.Logo src={logo} />
        <S.MultipleLangWrap>
          <S.NeedHelp
            fontWeight={`${fontWeight?.semiBold}`}
            color={`${themeColors?.secondary}`}
          >
            {t("need-help")}
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

      <S.SignInForm>
        <S.FormWrap form={form} onFinish={handleLogic}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("login")}
            </S.Title>
            <S.Subtitle textAlign="center">
              {t("dont-have")} <S.SignInAction>{t("sign-in")}</S.SignInAction>
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

          <S.FormItem
            name="password"
            $margin="0 0 8px 0"
            rules={[
              {
                required: true,
                message: t("please-enter-password"),
              },
            ]}
          >
            <Input
              label={t("password")}
              isRequired
              placeholder={t("enter-your-password")}
              isPassword
            />
          </S.FormItem>

          <S.ForgotPassword>
            <S.SignInAction>{t("forgot-password")}</S.SignInAction>
          </S.ForgotPassword>

          <S.FormItem name="rememberMe" $isRememberMe={true}>
            <Checkbox />
            <Typography>{t("remember-me")}</Typography>
          </S.FormItem>

          <S.LoginButton type="primary" onClick={form.submit}>
            {t("login")}
          </S.LoginButton>

          <S.DriversLicenseWrap />

          <S.LoginButton onClick={handleLoginWithGoogle}>
            <Image src={icGoogle} />
            {t("sign-in-with-google")}
          </S.LoginButton>

          <S.LoginButton onClick={handleLoginWithFacebook}>
            <Image src={icApple} />
            {t("sign-in-with-facebook")}
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default SignIn;
