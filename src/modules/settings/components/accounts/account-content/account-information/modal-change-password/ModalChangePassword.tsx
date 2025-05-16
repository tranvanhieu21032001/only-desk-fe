import React, { useMemo, useState } from 'react';
import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { passwordRegex } from '@/shared/regex';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { sensitiveActionMockup } from '@/modules/settings/helpers/data/account';
import { ChangePasswordStepEnums } from '@/modules/settings/helpers/enums/account';

import Input from '@/shared/components/common/Input';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';
import { ToastMessageType } from '@/shared/helper/enums/common';
import ToastMessage from '@/shared/components/common/ToastMessage';

import * as S from './ModalChangePassword.styles';

import icTickCircle from '@/assets/icons/contact/ic-tick-circle.svg';
import icSubmitBtn from '@/assets/icons/setting/ic-submit-prefix.svg';
import icArrowRight from '@/assets/icons/setting/ic-arrow-right-white.svg';
import icTickCircleWhite from '@/assets/icons/setting/ic-tick-circle-white.svg';

interface ModalChangePasswordProps {
  title?: string;
  subTitle?: string;
  open: boolean;
  onCancel: () => void;
  isLoading?: boolean;
}

function ModalChangePassword({
  title,
  open,
  onCancel,
  isLoading,
}: ModalChangePasswordProps) {
  const { t } = useTranslation('settings');
  const [form] = Form.useForm();
  const passwordWatch = Form.useWatch('password', form);
  const verifyPasswordWatch = Form.useWatch('verifyPassword', form);

  const [stepChangePassword, setStepChangePassword] =
    useState<ChangePasswordStepEnums>(ChangePasswordStepEnums?.NEW_PASSWORD);
  const [activeSensitiveAction, setActiveSensitiveAction] =
    useState<string>('');

  function handleSendInvite() {
    switch (stepChangePassword) {
      case ChangePasswordStepEnums?.NEW_PASSWORD:
        return setStepChangePassword(ChangePasswordStepEnums?.SENSITIVE_ACTION);
      case ChangePasswordStepEnums?.SENSITIVE_ACTION:
        return setStepChangePassword(ChangePasswordStepEnums?.VERIFY_PASSWORD);
      case ChangePasswordStepEnums?.VERIFY_PASSWORD:
        return setStepChangePassword(ChangePasswordStepEnums?.CREDENTIALS);
      default:
        break;
    }
  }

  function handleSensitiveAction(key: string) {
    setActiveSensitiveAction(key);
  }

  function handleSavePassword() {
    // TODO handle later
    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.SUCCESS,
        message: t('modal-change-password.your-password-has-been-saved'),
      }),
    );
    onCancel();
  }

  const renderActionFooter = useMemo(() => {
    switch (stepChangePassword) {
      case ChangePasswordStepEnums?.CREDENTIALS:
        return (
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-change-password.cancel')}
            </Button>
            <Button type="primary" onClick={handleSavePassword}>
              <Image
                src={icTickCircleWhite}
                preview={false}
                width={18}
                height={18}
              />
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-change-password.save-password')}
              </Typography>
            </Button>
          </S.ActionWrap>
        );

      default:
        return (
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-change-password.cancel')}
            </Button>
            <Button type="primary" onClick={form.submit}>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-change-password.continue')}
              </Typography>
              <Image
                src={icArrowRight}
                preview={false}
                width={18}
                height={18}
              />
            </Button>
          </S.ActionWrap>
        );
    }
  }, [stepChangePassword]);

  const renderContentChangePassword = useMemo(() => {
    switch (stepChangePassword) {
      case ChangePasswordStepEnums?.NEW_PASSWORD:
        return (
          <S.FormWrap>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t('modal-change-password.please-enter-new-password'),
                },
                {
                  pattern: passwordRegex,
                  message: t('modal-change-password.new-password-is-valid'),
                },
              ]}
            >
              <Input
                label={t('modal-change-password.new-password')}
                isRequired
                placeholder={t(
                  'modal-change-password.please-enter-confirm-password',
                )}
                isPassword
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(
                        new Error(
                          t(
                            'modal-change-password.please-enter-confirm-password',
                          ),
                        ),
                      );
                    } else if (value && value !== passwordWatch) {
                      return Promise.reject(
                        new Error(
                          t('modal-change-password.passwords-do-not-match'),
                        ),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                label={t('modal-change-password.confirm-password')}
                isRequired
                placeholder={t('modal-change-password.enter-confirm-password')}
                isPassword
              />
            </Form.Item>
          </S.FormWrap>
        );

      case ChangePasswordStepEnums?.SENSITIVE_ACTION:
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
      case ChangePasswordStepEnums?.VERIFY_PASSWORD:
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
              {t('modal-change-password.now-generate-OnlyChat')}
            </Typography>

            <S.VerifyYourPassword $isValueVerifyPassword={verifyPasswordWatch}>
              <Form.Item
                name="verifyPassword"
                rules={[
                  {
                    required: true,
                    message: t(
                      'modal-change-password.please-enter-your-onlychat-password',
                    ),
                  },
                ]}
              >
                <Input
                  label={t('modal-change-password.verify-your-password')}
                  isRequired
                  placeholder={t(
                    'modal-change-password.enter-your-onlychat-account-password',
                  )}
                  suffix={icSubmitBtn}
                />
              </Form.Item>
            </S.VerifyYourPassword>
          </S.SensitiveActionWrap>
        );
      case ChangePasswordStepEnums?.CREDENTIALS:
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
    stepChangePassword,
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
        <Form form={form} onFinish={handleSendInvite}>
          <S.ModalHeader>
            <S.ModalHeaderContent>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-change-password.change-password')}
              </Typography>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-change-password.please-insert-modal')}
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

export default ModalChangePassword;
