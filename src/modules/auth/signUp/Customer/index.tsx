import { useEffect } from "react";
import { Form, Image, Switch } from "antd";
import { useTranslation } from "react-i18next";

import { useRouter } from "@/shared/hooks/useRouter";
import { SignUpStepEnums } from "../../helpers/enums/auth";
import { chatWithCustomersInterface } from "../../model/auth";
import { chatWithCustomers } from "../../helpers/data/signUp";
import fontWeight from "@/shared/styles/themes/default/fontWeight";

import Typography from "@/shared/components/common/Typography";

import * as S from "./customer.styles";

function Customer() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();
  const { replaceState } = useRouter();

  useEffect(() => {
    form.setFieldValue("businessEmails", [{ businessEmail: "" }]);
  }, [form]);

  function handleInviteYourTeam() {
    replaceState({
      type: SignUpStepEnums?.CUSTOMER,
    });
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleInviteYourTeam}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center">
              {t("chat-with-customer.where-do-you-chat-with-customer")}
            </S.Title>
          </S.LoginLabelWrap>

          <S.SocialChatWrap>
            {chatWithCustomers?.map((social: chatWithCustomersInterface) => (
              <S.SocialChat key={social?.key}>
                <S.LogoChatWrap>
                  <Image src={social?.icon as string} preview={false} />
                  <Typography fontWeight={fontWeight?.extraBold}>
                    {t(`chat-with-customer.${social?.label}`)}
                  </Typography>
                </S.LogoChatWrap>

                <Form.Item name={`${social?.key}`} valuePropName="checked">
                  <Switch />
                </Form.Item>
              </S.SocialChat>
            ))}
          </S.SocialChatWrap>

          <S.LoginButton type="primary" onClick={() => form.submit()}>
            {t("chat-with-customer.submit")}
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default Customer;
