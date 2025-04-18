import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import { useRouter } from "@/hooks/useRouter";
import { SignUpStepEnums } from "@/helpers/enums/auth";

import Input from "@/components/common/Input";

import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-up.styles";

function YourName() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();

  const { replaceState } = useRouter();

  function handleSignUp() {
    replaceState({
      type: SignUpStepEnums?.WEBSITE_ADDRESS,
    });
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("your-name.whats-your-name")}
            </S.Title>
          </S.LoginLabelWrap>

          <S.FormItem
            name="yourName"
            rules={[
              {
                required: true,
                message: t("your-name.please-enter-your-name"),
              },
            ]}
          >
            <Input
              isRequired
              placeholder={t("your-name.enter-your-name")}
              type="email"
            />
          </S.FormItem>

          <S.LoginButton type="primary" onClick={handleSignUp}>
            {t("your-name.continue")}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default YourName;
