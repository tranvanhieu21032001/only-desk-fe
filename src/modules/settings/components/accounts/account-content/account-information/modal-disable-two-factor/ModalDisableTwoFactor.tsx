import React, { useMemo, useState } from 'react';
import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { sensitiveActionMockup } from '@/modules/settings/helpers/data/account';
import { DisableTwoFactorStepEnums } from '@/modules/settings/helpers/enums/account';

import Input from '@/shared/components/common/Input';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';
import { ToastMessageType } from '@/shared/helper/enums/common';
import ToastMessage from '@/shared/components/common/ToastMessage';

import * as S from './ModalDisableTwoFactor.styles';

import icTickCircle from '@/assets/icons/contact/ic-tick-circle.svg';
import icSubmitBtn from '@/assets/icons/setting/ic-submit-prefix.svg';

interface ModalChangePasswordProps {
  title?: string;
  subTitle?: string;
  open: boolean;
  onCancel: () => void;
  isLoading?: boolean;
}

function ModalDisableTwoFactor({
  title,
  open,
  onCancel,
  isLoading,
}: ModalChangePasswordProps) {
  const { t } = useTranslation('settings');
  const [form] = Form.useForm();
  const passwordWatch = Form.useWatch('password', form);
  const verifyPasswordWatch = Form.useWatch('verifyPassword', form);

  const [stepDisableTwoFactor, setStepDisableTwoFactor] =
    useState<DisableTwoFactorStepEnums>(
      DisableTwoFactorStepEnums?.DISABLE_TWO_FACTOR,
    );
  const [activeSensitiveAction, setActiveSensitiveAction] =
    useState<string>('');

  function handleDisableTwoFactor() {
    switch (stepDisableTwoFactor) {
      case DisableTwoFactorStepEnums?.DISABLE_TWO_FACTOR:
        return setStepDisableTwoFactor(
          DisableTwoFactorStepEnums?.SENSITIVE_ACTION,
        );
      case DisableTwoFactorStepEnums?.SENSITIVE_ACTION:
        return setStepDisableTwoFactor(
          DisableTwoFactorStepEnums?.VERIFY_PASSWORD,
        );
      case DisableTwoFactorStepEnums?.VERIFY_PASSWORD:
        return setStepDisableTwoFactor(DisableTwoFactorStepEnums?.CREDENTIALS);
      default:
        break;
    }
  }

  function handleSensitiveAction(key: string) {
    setActiveSensitiveAction(key);
  }

  function handleDisableToken() {
    onCancel();

    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.SUCCESS,
        message: t(
          'modal-disable-two-factor.two-factor-authentication-has-been-disabled',
        ),
      }),
    );
  }

  const renderActionFooter = useMemo(() => {
    switch (stepDisableTwoFactor) {
      case DisableTwoFactorStepEnums?.DISABLE_TWO_FACTOR:
        return (
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-disable-two-factor.cancel')}
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
                {t('modal-disable-two-factor.disable-token')}
              </Typography>
            </Button>
          </S.ActionWrap>
        );

      case DisableTwoFactorStepEnums?.CREDENTIALS:
        return (
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-disable-two-factor.cancel')}
            </Button>
            <Button type="primary" onClick={handleDisableToken}>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-disable-two-factor.disable-token')}
              </Typography>
            </Button>
          </S.ActionWrap>
        );

      default:
        return (
          <S.ActionWrap>
            <Button onClick={onCancel}>
              {t('modal-disable-two-factor.cancel')}
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
                {t('modal-disable-two-factor.disable-token')}
              </Typography>
            </Button>
          </S.ActionWrap>
        );
    }
  }, [stepDisableTwoFactor, activeSensitiveAction]);

  const renderContentChangePassword = useMemo(() => {
    switch (stepDisableTwoFactor) {
      case DisableTwoFactorStepEnums?.DISABLE_TWO_FACTOR:
        return (
          <S.FormWrap>
            <Typography
              color={themeColors?.newtralLight}
              variant="caption-small"
              margin="0 0 24px 0"
            >
              {t('modal-disable-two-factor.no-step-code')}
            </Typography>
          </S.FormWrap>
        );

      case DisableTwoFactorStepEnums?.SENSITIVE_ACTION:
        return (
          <S.SensitiveActionWrap>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-disable-two-factor.this-is-a-sensitive-action')}
            </Typography>
            <Typography
              color={themeColors?.newtralLight}
              variant="caption-small"
              margin="4px 0 0 0"
            >
              {t('modal-disable-two-factor.please-verify-you')}
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
      case DisableTwoFactorStepEnums?.VERIFY_PASSWORD:
        return (
          <S.SensitiveActionWrap>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-disable-two-factor.this-is-a-sensitive-action')}
            </Typography>
            <Typography
              color={themeColors?.newtralLight}
              variant="caption-small"
              margin="4px 0 0 0"
            >
              {t('modal-disable-two-factor.now-generate-OnlyChat')}
            </Typography>

            <S.VerifyYourPassword $isValueVerifyPassword={verifyPasswordWatch}>
              <Form.Item
                name="verifyPassword"
                rules={[
                  {
                    required: true,
                    message: t(
                      'modal-disable-two-factor.please-enter-your-onlychat-password',
                    ),
                  },
                ]}
              >
                <Input
                  label={t('modal-disable-two-factor.verify-your-password')}
                  isRequired
                  placeholder={t(
                    'modal-disable-two-factor.enter-your-onlychat-account-password',
                  )}
                  suffix={icSubmitBtn}
                />
              </Form.Item>
            </S.VerifyYourPassword>
          </S.SensitiveActionWrap>
        );
      case DisableTwoFactorStepEnums?.CREDENTIALS:
        return (
          <S.SensitiveActionWrap>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-disable-two-factor.this-is-a-sensitive-action')}
            </Typography>
            <Typography
              color={themeColors?.newtralLight}
              variant="caption-small"
              margin="4px 0 0 0"
            >
              {t(
                'modal-disable-two-factor.please-verify-you-onlychat-credentials',
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
                  {t('modal-disable-two-factor.success')}
                </Typography>
                <Typography>
                  {t('modal-disable-two-factor.you-have-verify-yourself')}
                </Typography>
              </S.Success>
            </S.SuccessWrap>
          </S.SensitiveActionWrap>
        );

      default:
        break;
    }
  }, [
    stepDisableTwoFactor,
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
        <Form form={form} onFinish={handleDisableTwoFactor}>
          <S.ModalHeader>
            <S.ModalHeaderContent>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t(
                  'modal-disable-two-factor.disable-two-factor-authentication',
                )}
              </Typography>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-disable-two-factor.please-insert-modal')}
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

export default ModalDisableTwoFactor;
