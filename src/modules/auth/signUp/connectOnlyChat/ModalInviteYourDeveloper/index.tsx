import { useEffect } from "react";
import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import themeColors from "@/shared/styles/themes/default/colors";
import fontWeight from "@/shared/styles/themes/default/fontWeight";

import Input from "@/shared/components/common/Input";

import Button from "@/shared/components/common/Button";
import Typography from "@/shared/components/common/Typography";
import ModalCommon from "@/shared/components/common/ModalBase";

import icLink from "@/assets/icons/auth/ic-link.svg";
import icTrash from "@/assets/icons/common/ic-trash.svg";
import icSetting from "@/assets/icons/auth/ic-setting.svg";
import icAddCircle from "@/assets/icons/common/ic-add-circle.svg";

import * as S from "./invite.styles";

interface ModalConfirmDeleteProps {
  title?: string;
  subTitle?: string;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  isLoading?: boolean;
  onCopyInviteLink?: () => void;
  onSendInvite?: () => void;
}

function ModalInvite({
  title,
  open,
  onCancel,
  onOk,
  isLoading,
  onCopyInviteLink,
  onSendInvite,
}: ModalConfirmDeleteProps) {
  const { t } = useTranslation("auth");
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("businessEmails", [{ businessEmail: "" }]);
  }, [form]);

  function handleAddMoreEmail() {
    const getEmails = form.getFieldValue("businessEmails");
    form.setFieldValue("businessEmails", [...getEmails, { businessEmail: "" }]);
  }

  return (
    <S.WrapModal>
      <ModalCommon
        title={title}
        open={open}
        onCancel={onCancel}
        onSubmit={onOk}
        showFooter={false}
        isLoading={isLoading}
        width={700}
      >
        <S.ModalHeader>
          <Image src={icSetting} preview={false} />
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t("invite-modal.invite-your-developer")}
            </Typography>
            <Typography>{t("invite-modal.invite-developer")}</Typography>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalContent>
          <S.FormWrap form={form} onFinish={onSendInvite}>
            <Typography margin="0 0 8px 0">
              {t("invite-your-team.email-address")}
              <span style={{ color: "red" }}> *</span>
            </Typography>
            <S.EmailsWrap>
              <Form.List name="businessEmails">
                {(fields, { remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <S.EmailWrap
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        $isFirst={index === 0}
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

                        {index !== 0 && (
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
            </S.EmailsWrap>

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
          </S.FormWrap>
        </S.ModalContent>

        <S.ModalBottom>
          <S.CopyInviteLinkWrap onClick={onCopyInviteLink}>
            <Image src={icLink} preview={false} />

            <Typography
              color={themeColors?.secondaryDark}
              fontWeight={fontWeight?.semiBold}
            >
              {t("invite-modal.copy-invite-link")}
            </Typography>
          </S.CopyInviteLinkWrap>

          <S.ActionWrap>
            <S.BtnCancel>
              <Button>{t("invite-modal.cancel")}</Button>
            </S.BtnCancel>
            <Button type="primary" onClick={() => form.submit()}>
              {t("invite-modal.send-invite-and-continue")}
            </Button>
          </S.ActionWrap>
        </S.ModalBottom>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalInvite;
