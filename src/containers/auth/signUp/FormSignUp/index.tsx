import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import { useRouter } from "@/hooks/useRouter";
import { SignUpStepEnums } from "@/helpers/enums/auth";

import Input from "@/components/common/Input";
import Checkbox from "@/components/common/Checkbox";
import Typography from "@/components/common/Typography";
import PhoneNumberByCountry from "@/components/common/PhoneNumber";

import icApple from "@/assets/icons/common/ic-apple.svg";
import icGoogle from "@/assets/icons/common/ic-google.svg";

import * as S from "./sign-up.styles";

function StartForFree() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();
  const policyWatch = Form.useWatch("policy", form);

  const { replaceState } = useRouter();

  function handleSignUp() {
    replaceState({
      type: SignUpStepEnums?.CONFIRM_CODE,
    });
  }

  function handleLoginWithGoogle() {
    //Handle later
  }

  function handleLoginWithFacebook() {
    //Handle later
  }

  return (
    <S.SignInWrap>
      <S.SignInForm>
        <S.FormWrap form={form}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("sign-up-form.start-for-free")}
            </S.Title>
            <S.Subtitle textAlign="center">
              {t("sign-up-form.already-have-an-account")}
              <S.SignInAction> {t("sign-up-form.login")}</S.SignInAction>
            </S.Subtitle>
          </S.LoginLabelWrap>

          <S.FormItem
            name="businessEmail"
            rules={[
              {
                required: true,
                message: t("sign-up-form.please-enter-business-email"),
              },
              {
                type: "email",
                message: t("email-invalid"),
              },
            ]}
          >
            <Input
              label={t("sign-up-form.business-email")}
              isRequired
              placeholder={t("sign-up-form.enter-your-business-email")}
              type="email"
            />
          </S.FormItem>

          <S.FormItem
            name="password"
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
              placeholder={t("sign-up-form.enter-your-password")}
              isPassword
            />
          </S.FormItem>

          <S.FormItem
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: t("sign-up-form.please-enter-confirm-password"),
              },
            ]}
          >
            <Input
              label={t("sign-up-form.confirm-password")}
              isRequired
              placeholder={t("sign-up-form.enter-your-confirm-password")}
              isPassword
            />
          </S.FormItem>

          <S.FormItem
            name="mobilePhoneNumber"
            rules={[
              {
                required: true,
                message: t("sign-up-form.please-enter-mobile-phone-number"),
              },
            ]}
          >
            <PhoneNumberByCountry
              nameFormList="mobilePhoneNumber"
              currentInstanceForm={form}
              label={t("sign-up-form.mobile-phone-number")}
              isRequired
              placeholder={t("sign-up-form.enter-your-mobile-phone-number")}
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
              {t("sign-up-form.you-agree")}
              <S.SignInAction> {t("sign-up-form.term-of-use")} </S.SignInAction>
              {t("sign-up-form.and")}{" "}
              <S.SignInAction>
                {t("sign-up-form.privacy-policy")}
              </S.SignInAction>
            </Typography>
          </S.YouAgree>

          <S.LoginButton
            type="primary"
            onClick={handleSignUp}
            disabled={!policyWatch}
          >
            {t("sign-up-form.sign-up")}
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

export default StartForFree;
