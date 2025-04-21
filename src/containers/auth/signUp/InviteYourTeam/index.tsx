import { useEffect } from "react";
import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import { useRouter } from "@/hooks/useRouter";
import { SignUpStepEnums } from "@/helpers/enums/auth";
import themeColors from "@/styles/themes/default/colors";
import fontWeight from "@/styles/themes/default/fontWeight";

import Input from "@/components/common/Input";
import Typography from "@/components/common/Typography";

import icLink from "@/assets/icons/auth/ic-link.svg";
import icTrash from "@/assets/icons/common/ic-trash.svg";
import icAddCircle from "@/assets/icons/common/ic-add-circle.svg";
import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-up.styles";

function InviteYourTeam() {
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

  function handleAddMoreEmail() {
    const getEmails = form.getFieldValue("businessEmails");
    form.setFieldValue("businessEmails", [...getEmails, { businessEmail: "" }]);
  }

  function handleCopyInviteLink() {
    //TODO handle later
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleInviteYourTeam}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center">
              {t("invite-your-team.invite-your-team")}
            </S.Title>
          </S.LoginLabelWrap>

          <Typography margin="0 0 8px 0">
            {t("invite-your-team.email-address")}
          </Typography>
          <Form.List name="businessEmails">
            {(fields, { remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <S.EmailWrap
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "businessEmail"]}
                      rules={[
                        {
                          required: true,
                          message: t(
                            "invite-your-team.please-enter-business-email"
                          ),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t(
                          "invite-your-team.enter-your-business-email"
                        )}
                      />
                    </Form.Item>

                    {form.getFieldValue("businessEmails").length > 1 && (
                      <Image
                        src={icTrash}
                        onClick={() => remove(name)}
                        width={16}
                        height={18}
                        preview={false}
                      />
                    )}
                  </S.EmailWrap>
                ))}
              </>
            )}
          </Form.List>

          <S.AddMoreEmailWrap>
            <S.AddMoreEmail onClick={handleAddMoreEmail}>
              <Image src={icAddCircle} preview={false} />
              <Typography
                color={themeColors?.secondaryDark}
                fontWeight={fontWeight?.semiBold}
              >
                {t("invite-your-team.add-more-email")}
              </Typography>
            </S.AddMoreEmail>
          </S.AddMoreEmailWrap>

          <S.LoginButton type="primary" onClick={() => form.submit()}>
            {t("website.continue")}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>

          <S.CopyInviteLinkWrap onclick={handleCopyInviteLink}>
            <Image src={icLink} preview={false} />

            <Typography
              color={themeColors?.secondaryDark}
              fontWeight={fontWeight?.semiBold}
            >
              {t("invite-your-team.copy-invite-link")}
            </Typography>
          </S.CopyInviteLinkWrap>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default InviteYourTeam;
