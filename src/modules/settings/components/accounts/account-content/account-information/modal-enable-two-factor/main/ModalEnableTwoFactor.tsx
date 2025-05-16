import React, { useCallback, useMemo, useState } from 'react';

import OTPInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';
import { Form, Image } from 'antd';

import themeColors from '@/shared/styles/themes/default/colors';
import { TabConfigureEnums } from '@/shared/helper/enums/contacts';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import ToastMessage from '@/shared/components/common/ToastMessage';
import { EnableTwoFactorEnums } from '@/modules/settings/helpers/enums/account';
import { progressEnableTwoFactor } from '@/modules/settings/helpers/data/account';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import { ToastMessageType } from '@/shared/helper/enums/common';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalEnableTwoFactor.styles';

import icCaution from '@/assets/icons/setting/ic-caution.svg';
import icCopyLink from '@/assets/icons/contact/ic-copy-link.svg';
import imgQrCode from '@/assets/images/settings/img-qr-mockup.png';
import icArrowRight from '@/assets/icons/setting/ic-arrow-right.svg';
import icTickCircle from '@/assets/icons/contact/ic-tick-circle.svg';

interface ModalImportContactProps {
  open: boolean;
  onCancel: () => void;
  onEnableTwoFactor?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEnableTwoFactor({
  open,
  onCancel,
  onEnableTwoFactor,
}: ModalImportContactProps) {
  const { t } = useTranslation('settings');
  const [form] = Form.useForm();

  const [params] = useState<{
    isLoading: boolean;
    countUpload: number;
  }>({ isLoading: false, countUpload: 0 });
  const [files] = useState<string[]>([]);
  const [stepParams, setStepParams] = useState<{
    step: EnableTwoFactorEnums;
    tab?: TabConfigureEnums;
  }>({
    step: EnableTwoFactorEnums?.PREPARE,
    tab: TabConfigureEnums?.ALL,
  });

  function handleContinueStep() {
    if (stepParams?.step === EnableTwoFactorEnums?.PREPARE) {
      setStepParams((prev) => ({
        ...prev,
        step: EnableTwoFactorEnums?.SCAN_CODE,
      }));
    } else if (stepParams?.step === EnableTwoFactorEnums?.SCAN_CODE) {
      setStepParams((prev) => ({
        ...prev,
        step: EnableTwoFactorEnums?.VERIFY_CODE,
      }));
    } else {
      onCancel();
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(
      'HI3EGZRVLBSC4USVNUVDMWSFERMGEQSUEM5U25LENBEHAYRKMNKA',
    );

    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.SUCCESS,
        message: t('modal-enable-two-factor.copy-invite-link-success'),
      }),
    );
  }

  const renderContentStepUpload = useMemo(() => {
    switch (stepParams?.step) {
      case EnableTwoFactorEnums?.PREPARE:
        return (
          <>
            <S.Description>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-enable-two-factor.enable-two-factor-authentication')}
              </Typography>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
                margin="4px 0 0 0"
              >
                {t('modal-enable-two-factor.two-factor-authentication-makes')}
              </Typography>
            </S.Description>
            <S.CautionWrap>
              <Image src={icCaution} preview={false} width={24} height={24} />

              <S.Caution>
                <Typography variant="h5">
                  {t('modal-enable-two-factor.caution')}
                </Typography>
                <Typography>
                  {t('modal-enable-two-factor.if-you-lose-your-phone')}
                </Typography>
              </S.Caution>
            </S.CautionWrap>
          </>
        );
      case EnableTwoFactorEnums?.SCAN_CODE:
        return (
          <>
            <S.Description>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-enable-two-factor.scan-this-with-your')}
              </Typography>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
                margin="4px 0 0 0"
              >
                {t('modal-enable-two-factor.if-you-are-unable')}
              </Typography>
            </S.Description>
            <S.ScanQrCode>
              <Image src={imgQrCode} preview={false} />

              <S.CopyInviteLink>
                <Typography color={themeColors?.primary}>
                  HI3EGZRVLBSC4USVNUVDMWSFERMGEQSUEM5U25LENBEHAYRKMNKA
                </Typography>
                <Button
                  icon={
                    <Image
                      src={icCopyLink}
                      preview={false}
                      width={18}
                      height={18}
                    />
                  }
                  onClick={handleCopyLink}
                >
                  {t('modal-enable-two-factor.copy-invite-link')}
                </Button>
              </S.CopyInviteLink>
            </S.ScanQrCode>
          </>
        );
      case EnableTwoFactorEnums?.VERIFY_CODE:
        return (
          <>
            <S.Description>
              <Typography fontWeight={fontWeight?.semiBold}>
                {t('modal-enable-two-factor.verify-the-scanned-code')}
              </Typography>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
                margin="4px 0 0 0"
              >
                {t('modal-enable-two-factor.to-ensure')}
              </Typography>
            </S.Description>

            <S.VerifyCode>
              <Form.Item name="code" className="otp-form-item">
                <OTPInput
                  onChange={(value) => {
                    if (value?.length === 6) {
                      form.submit();
                    }
                  }}
                  containerStyle="otp-input-wrapper"
                  shouldAutoFocus={true}
                  numInputs={6}
                  renderInput={(props) => (
                    <S.InputNumber {...props} type="number" />
                  )}
                />
              </Form.Item>
            </S.VerifyCode>
          </>
        );

      default:
        break;
    }
  }, [files, params, stepParams?.step, stepParams?.tab]);

  const renderIconProgress = useCallback(
    (progress: any) => {
      switch (stepParams?.step) {
        case EnableTwoFactorEnums?.PREPARE:
          return (
            <S.IcProgress
              $isActive={
                stepParams?.step === progress?.key ? progress?.key : undefined
              }
            >
              <ReactSVG src={progress?.icon} className="progress-icon" />
            </S.IcProgress>
          );
        case EnableTwoFactorEnums?.SCAN_CODE:
          if (progress?.key === EnableTwoFactorEnums?.SCAN_CODE) {
            return (
              <S.IcProgress
                $isActive={
                  stepParams?.step === progress?.key ? progress?.key : undefined
                }
              >
                <ReactSVG src={progress?.icon} className="progress-icon" />
              </S.IcProgress>
            );
          } else if (progress?.key === EnableTwoFactorEnums?.PREPARE) {
            return (
              <Image
                src={icTickCircle}
                preview={false}
                width={32}
                height={32}
              />
            );
          }
          return (
            <S.IcProgress
              $isActive={
                stepParams?.step === progress?.key ? progress?.key : undefined
              }
            >
              <ReactSVG src={progress?.icon} className="progress-icon" />
            </S.IcProgress>
          );
        case EnableTwoFactorEnums?.VERIFY_CODE:
          if (progress?.key === EnableTwoFactorEnums?.VERIFY_CODE) {
            return (
              <S.IcProgress
                $isActive={
                  stepParams?.step === progress?.key ? progress?.key : undefined
                }
              >
                <ReactSVG src={progress?.icon} className="progress-icon" />
              </S.IcProgress>
            );
          }
          return (
            <Image src={icTickCircle} preview={false} width={32} height={32} />
          );

        default:
          break;
      }
    },
    [stepParams?.step],
  );

  function handleVerifyOtp() {
    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType?.SUCCESS,
        message: t(
          'modal-enable-two-factor.two-factor-authentication-has-been-enabled',
        ),
      }),
    );
    onEnableTwoFactor && onEnableTwoFactor((prev) => !prev);
    onCancel();
  }

  const renderModalFooter = useMemo(() => {
    switch (stepParams?.step) {
      case EnableTwoFactorEnums?.PREPARE:
        return (
          <S.ModalFooter>
            <Button onClick={onCancel}>
              {t('modal-enable-two-factor.cancel')}
            </Button>
            <Button type="primary" onClick={handleContinueStep}>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-enable-two-factor.continue-setup')}
              </Typography>
              <Image src={icArrowRight} preview={false} />
            </Button>
          </S.ModalFooter>
        );
      case EnableTwoFactorEnums?.SCAN_CODE:
        return (
          <S.ModalFooter>
            <Button onClick={onCancel}>
              {t('modal-enable-two-factor.cancel')}
            </Button>
            <Button type="primary" onClick={handleContinueStep}>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-enable-two-factor.i-scanned-the-code')}
              </Typography>
              <Image src={icArrowRight} preview={false} />
            </Button>
          </S.ModalFooter>
        );

      case EnableTwoFactorEnums?.VERIFY_CODE:
        return (
          <S.ModalFooter>
            <Button onClick={onCancel}>
              {t('modal-enable-two-factor.cancel')}
            </Button>
            <Button type="primary" onClick={handleVerifyOtp}>
              <Typography
                fontWeight={fontWeight?.semiBold}
                color={themeColors?.newtralLightest}
              >
                {t('modal-enable-two-factor.verify-code-finalize')}
              </Typography>
            </Button>
          </S.ModalFooter>
        );

      default:
        break;
    }
  }, [stepParams?.step, files]);

  const renderColorLabelStep = useCallback(
    (progress: any) => {
      switch (stepParams?.step) {
        case EnableTwoFactorEnums?.PREPARE:
          if (progress?.key === EnableTwoFactorEnums?.PREPARE) {
            return '#253a8e';
          }
          return themeColors?.newtralLight;
        case EnableTwoFactorEnums?.SCAN_CODE:
          if (progress?.key === EnableTwoFactorEnums?.PREPARE) {
            return themeColors?.primary;
          } else if (progress?.key === EnableTwoFactorEnums?.SCAN_CODE) {
            return '#253a8e';
          }
          return themeColors?.newtralLight;
        case EnableTwoFactorEnums?.VERIFY_CODE:
          if (progress?.key === EnableTwoFactorEnums?.VERIFY_CODE) {
            return '#253a8e';
          }
          return themeColors?.primary;
        default:
          break;
      }
    },
    [stepParams?.step],
  );

  return (
    <S.WrapModal>
      <ModalCommon
        open={open}
        onCancel={onCancel}
        showFooter={false}
        width={700}
      >
        <S.ModalHeader>
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-enable-two-factor.enable-two-factor-authentication')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-enable-two-factor.please-insert-modal')}
              </Typography>
            </S.ModalDescription>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalContent>
          <S.ProgressContainer>
            <S.ProgressWrap>
              {progressEnableTwoFactor?.map((progress) => (
                <S.Progress
                  key={progress?.key}
                  $isDiver={!progress?.icon && !progress?.label}
                  $isActiveDiver={
                    stepParams.step === EnableTwoFactorEnums.SCAN_CODE &&
                    progress?.key === EnableTwoFactorEnums.DRIVER
                  }
                  $isActiveDiverSecond={
                    stepParams.step === EnableTwoFactorEnums.VERIFY_CODE
                  }
                >
                  {progress?.icon && renderIconProgress(progress)}
                  {progress?.label && (
                    <Typography
                      fontWeight={fontWeight?.semiBold}
                      color={renderColorLabelStep(progress)}
                    >
                      {t(`${progress?.label}`)}
                    </Typography>
                  )}
                </S.Progress>
              ))}
            </S.ProgressWrap>
          </S.ProgressContainer>

          <Form form={form}>{renderContentStepUpload}</Form>
        </S.ModalContent>

        {renderModalFooter}
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalEnableTwoFactor;
