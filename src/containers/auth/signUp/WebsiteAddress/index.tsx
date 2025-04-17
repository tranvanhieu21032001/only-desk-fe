import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import { useRouter } from "@/hooks/useRouter";
import { SignUpStepEnums } from "@/helpers/enums/auth";

import Input from "@/components/common/Input";

import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-up.styles";

function WebsiteAddress() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();

  const { replaceState } = useRouter();

  function handleSignUp() {
    replaceState({
      type: SignUpStepEnums?.CONFIRM_CODE,
    });
  }

  return (
    <S.SignInWrap>
      <S.SignInForm>
        <S.FormWrap form={form}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("website.whats-the-website")}
            </S.Title>
          </S.LoginLabelWrap>

          <S.FormItem
            name="websiteAddress"
            rules={[
              {
                required: true,
                message: t("website.please-enter-website-address"),
              },
            ]}
          >
            <Input
              isRequired
              placeholder={t("website.enter-your-website")}
              type="email"
            />
          </S.FormItem>

          <S.LoginButton type="primary" onClick={handleSignUp}>
            {t("website.continue")}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default WebsiteAddress;
