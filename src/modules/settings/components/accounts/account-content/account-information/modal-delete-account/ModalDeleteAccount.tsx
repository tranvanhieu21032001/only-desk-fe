import React, { useMemo, useState } from 'react';
import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { sensitiveActionMockup } from '@/modules/settings/helpers/data/account';
import { DeleteAccountStepEnums } from '@/modules/settings/helpers/enums/account';

import Input from '@/shared/components/common/Input';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';
import { ToastMessageType } from '@/shared/helper/enums/common';
import ToastMessage from '@/shared/components/common/ToastMessage';

import * as S from './ModalDeleteAccount.styles';

import icTickCircle from '@/assets/icons/contact/ic-tick-circle.svg';

interface ModalChangePasswordProps {
  title?: string;
  subTitle?: string;
  open: boolean;
  onCancel: () => void;
  isLoading?: boolean;
}

function ModalDeleteAccount({
  title,
  open,
  onCancel,
  isLoading,
}: ModalChangePasswordProps) {
  const { t } = useTranslation('settings');
  const [form] = Form.useForm();
  const passwordWatch = Form.useWatch('password', form);
  const verifyPasswordWatch = Form.useWatch('verifyPassword', form);

  const [stepDeleteAccount, setStepDeleteAccount] =
    useState<DeleteAccountStepEnums>(DeleteAccountStepEnums?.ENTER_EMAIL);
  const [activeSensitiveAction, setActiveSensitiveAction] =
    useState<string>('');

  function handleSensitiveAction(key: string) {
    setActiveSensitiveAction(key);
  }

  function handleDeleteAccount() {
    // TODO handle later
    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.SUCCESS,
        message: t('modal-delete-account.delete-your-onlychat-account-success'),
      }),
    );
    onCancel();
  }

  function handleDeleteEmail() {
    switch (stepDeleteAccount) {
      case DeleteAccountStepEnums?.ENTER_EMAIL:
        return setStepDeleteAccount(DeleteAccountStepEnums?.SENSITIVE_ACTION);
      case DeleteAccountStepEnums?.SENSITIVE_ACTION:
        return setStepDeleteAccount(DeleteAccountStepEnums?.CREDENTIALS);
      default:
        break;
    }
  }

  const renderActionFooter = useMemo(() => {
    switch (stepDeleteAccount) {
      case DeleteAccountStepEnums?.ENTER_EMAIL:
        return (
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-change-password.cancel')}
            </Button>
            <Button
              type="primary"
              onClick={form.submit}
              backgroundColor={themeColors?.errorDark}
            >
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-delete-account.delete-my-onlychat-account')}
              </Typography>
            </Button>
          </S.ActionWrap>
        );

      case DeleteAccountStepEnums?.SENSITIVE_ACTION:
        return (
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-change-password.cancel')}
            </Button>
            <Button
              type="primary"
              onClick={form.submit}
              backgroundColor={themeColors?.errorDark}
              disabled={!activeSensitiveAction}
            >
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-delete-account.delete-my-onlychat-account')}
              </Typography>
            </Button>
          </S.ActionWrap>
        );

      case DeleteAccountStepEnums?.CREDENTIALS:
        return (
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-change-password.cancel')}
            </Button>
            <Button
              type="primary"
              onClick={handleDeleteAccount}
              backgroundColor={themeColors?.errorDark}
              disabled={!activeSensitiveAction}
            >
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-delete-account.delete-my-onlychat-account')}
              </Typography>
            </Button>
          </S.ActionWrap>
        );

      default:
        break;
    }
  }, [stepDeleteAccount, activeSensitiveAction]);

  const renderContentChangePassword = useMemo(() => {
    switch (stepDeleteAccount) {
      case DeleteAccountStepEnums?.ENTER_EMAIL:
        return (
          <S.FormWrap>
            <S.Description>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
              >
                {t('modal-delete-account.all-account-data-will-be')}
              </Typography>
            </S.Description>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t(
                    'modal-delete-account.please-enter-your-account-email',
                  ),
                },
                {
                  type: 'email',
                  message: t('modal-delete-account.email-is-invalid'),
                },
              ]}
            >
              <Input
                isRequired
                type="email"
                label={t('modal-delete-account.email')}
                placeholder={t('modal-delete-account.enter-your-account-email')}
              />
            </Form.Item>
          </S.FormWrap>
        );

      case DeleteAccountStepEnums?.SENSITIVE_ACTION:
        return (
          <S.SensitiveActionWrap>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-change-password.this-is-a-sensitive-action')}
            </Typography>
            <Typography
              color={themeColors?.newtralLight}
              variant="caption-small"
              margin="4px 0 0 0"
            >
              {t('modal-change-password.please-verify-you')}
            </Typography>

            <S.SensitiveAction>
              {sensitiveActionMockup?.map((item) => (
                <S.SensitiveActionCard
                  onClick={() => handleSensitiveAction(item?.key)}
                  $isActive={activeSensitiveAction === item?.key}
                >
                  <Image
                    src={item?.icon}
                    preview={false}
                    width={24}
                    height={24}
                  />
                  <S.SensitiveActionCardContent>
                    <Typography fontWeight={fontWeight?.semiBold}>
                      {item?.label}
                    </Typography>
                    <Typography>{item?.description}</Typography>
                  </S.SensitiveActionCardContent>
                </S.SensitiveActionCard>
              ))}
            </S.SensitiveAction>
          </S.SensitiveActionWrap>
        );
      case DeleteAccountStepEnums?.CREDENTIALS:
        return (
          <S.SensitiveActionWrap>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-change-password.this-is-a-sensitive-action')}
            </Typography>
            <Typography
              color={themeColors?.newtralLight}
              variant="caption-small"
              margin="4px 0 0 0"
            >
              {t(
                'modal-change-password.please-verify-you-onlychat-credentials',
              )}
            </Typography>

            <S.SuccessWrap>
              <Image
                src={icTickCircle}
                preview={false}
                width={32}
                height={32}
              />

              <S.Success>
                <Typography variant="h5">
                  {t('modal-change-password.success')}
                </Typography>
                <Typography>
                  {t('modal-change-password.you-have-verify-yourself')}
                </Typography>
              </S.Success>
            </S.SuccessWrap>
          </S.SensitiveActionWrap>
        );

      default:
        break;
    }
  }, [
    stepDeleteAccount,
    activeSensitiveAction,
    form,
    passwordWatch,
    verifyPasswordWatch,
  ]);

  return (
    <S.WrapModal>
      <ModalCommon
        title={title}
        open={open}
        onCancel={onCancel}
        showFooter={false}
        isLoading={isLoading}
        width={700}
      >
        <Form form={form} onFinish={handleDeleteEmail}>
          <S.ModalHeader>
            <S.ModalHeaderContent>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-delete-account.delete-account')}
              </Typography>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-delete-account.please-insert-modal')}
              </Typography>
            </S.ModalHeaderContent>
          </S.ModalHeader>

          <S.ModalContent>{renderContentChangePassword}</S.ModalContent>

          <S.ModalBottom>{renderActionFooter}</S.ModalBottom>
        </Form>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalDeleteAccount;
