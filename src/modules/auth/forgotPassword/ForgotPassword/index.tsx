import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useRouter } from "@/shared/hooks/useRouter";
import { AUTH_ROUTES } from "@/core/routes/constants";
import { RecoverPassStepEnums } from "../../helpers/enums/auth";
import themeColors from "@/shared/styles/themes/default/colors";
import fontWeight from "@/shared/styles/themes/default/fontWeight";

import Input from "@/shared/components/common/Input";
import Typography from "@/shared/components/common/Typography";

import icArrowLeft from "@/assets/icons/auth/ic-arrow-left.svg";

import * as S from "./sign-up.styles";

function Recover() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();

  const { replaceState } = useRouter();
  const navigate = useNavigate();

  function handleSignUp() {
    replaceState({
      type: RecoverPassStepEnums?.CREATE_NEW_PASS,
    });
  }

  function handleReturnToSignIn() {
       navigate(AUTH_ROUTES?.SIGN_IN);
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth center-column-forgot">
        <S.FormWrap form={form} onFinish={handleSignUp}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("forgot.recover-your-password")}
            </S.Title>
             <S.Subtitle dangerouslySetInnerHTML={{__html: t("forgot.we-will")}} />
          </S.LoginLabelWrap>

          <S.FormItem
            name="email"
            rules={[
              {
               required: true,
               message: t("forgot.please-enter-email"),
              },
              {
               type: "email",
                message: t("email-invalid"),
              },]}
          >
            <Input
              label={t("forgot.email")}
              isRequired
              placeholder={t("forgot.enter-your-email")}
              type="email"
            />
          </S.FormItem>

          <S.LoginButton type="primary" onClick={form.submit}>
            {t("forgot.recovery-password")}
          </S.LoginButton>

          <S.ReturnToSignIn>
            <S.ReturnWrap onClick={handleReturnToSignIn}>
            <Image src={icArrowLeft} preview={false} />
            <Typography color={themeColors?.secondaryDark} fontWeight={fontWeight?.semiBold}>{t('forgot.return-to-sign-in')}</Typography>
            </S.ReturnWrap>
          </S.ReturnToSignIn>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default Recover;
