import { useState } from 'react';
import { Col, Form, Image, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { useModal } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import UploadImage from '@/shared/components/common/Upload';
import Typography from '@/shared/components/common/Typography';
import ModalDeleteAccount from '../modal-delete-account/ModalDeleteAccount';
import ModalChangePassword from '../modal-change-password/ModalChangePassword';
import ModalDisableTwoFactor from '../modal-disable-two-factor/ModalDisableTwoFactor';
import ModalEnableTwoFactor from '../modal-enable-two-factor/main/ModalEnableTwoFactor';

import * as S from './AccountInformation.styles';

import icTickCircle from '@/assets/icons/contact/ic-tick-circle.svg';
import imgAvatarDefault from '@/assets/images/settings/ic-avatar-default.png';

function AccountInformation() {
  const { t } = useTranslation('settings');
  const [form] = Form.useForm();

  const [_, setParams] = useState<{
    isLoading: boolean;
    countUpload: number;
  }>({ isLoading: false, countUpload: 0 });
  const [avatar, setAvatar] = useState<string[]>([]);
  const [enableTwoFactor, setEnableTwoFactor] = useState<boolean>(false);

  const { visible: modalEnableTwoFactor, toggle: handleEnableTwoFactor } =
    useModal();
  const {
    visible: modalChangePassword,
    toggle: handleOpenModalChangePassword,
  } = useModal();
  const { visible: modalDeleteAccount, toggle: handleOpenModalDeleteAccount } =
    useModal();
  const {
    visible: modalDisableTwoFactor,
    toggle: handleOpenModalDisableTwoFactor,
  } = useModal();

  function handleChangePassword() {
    // TODO handle later
    handleOpenModalChangePassword();
  }

  return (
    <S.AccountInformationContainer>
      <S.AccountInformation>
        <S.AccountInformationLabel>
          <Typography
            fontWeight={fontWeight?.semiBold}
            color={themeColors?.secondaryDarker}
          >
            {t('account-information.account-information')}
          </Typography>
        </S.AccountInformationLabel>

        <Form form={form} onFinish={handleChangePassword}>
          <S.InformationBlock>
            <S.HeaderBlock>
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('account-information.avatar')}
              </Typography>
            </S.HeaderBlock>

            <S.BodyBlock>
              <Row gutter={[24, 24]}>
                <S.Column xs={24} sm={7} md={4}>
                  <Image
                    src={avatar?.[0] || imgAvatarDefault}
                    preview={false}
                    width={120}
                    height={120}
                    onError={(e) => (e.currentTarget.src = imgAvatarDefault)}
                  />
                </S.Column>
                <S.ColumnAvatar xs={24} sm={17} md={20}>
                  <UploadImage
                    onParams={setParams}
                    onFields={setAvatar}
                    // currentForm={form}
                    fields={avatar}
                    maxCount={1}
                    content={
                      <S.ButtonUpload>
                        <Button type="primary">
                          {t('account-information.upload-image')}
                        </Button>
                        <Typography
                          color={themeColors?.newtralDark}
                          margin="8px 0 0 0"
                        >
                          {t('account-information.file-smaller-than-2mb')}
                        </Typography>
                      </S.ButtonUpload>
                    }
                  />
                </S.ColumnAvatar>
              </Row>
            </S.BodyBlock>
          </S.InformationBlock>

          <S.InformationBlock>
            <S.HeaderBlock>
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('account-information.personal-details')}
              </Typography>
            </S.HeaderBlock>

            <S.BodyBlock>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: t('account-information.first-name-required'),
                      },
                    ]}
                  >
                    <Input
                      isRequired
                      label={t('account-information.first-name')}
                      placeholder={t('account-information.first-name')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: t('account-information.last-name-required'),
                      },
                    ]}
                  >
                    <Input
                      isRequired
                      label={t('account-information.last-name')}
                      placeholder={t('account-information.last-name')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: t('account-information.email-required'),
                      },
                      {
                        type: 'email',
                        message: t('account-information.email-invalid'),
                      },
                    ]}
                  >
                    <Input
                      isRequired
                      type="email"
                      label={t('account-information.email')}
                      placeholder={t('account-information.email')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: t('account-information.phone-required'),
                      },
                    ]}
                  >
                    <Input
                      isRequired
                      type="number"
                      label={t('account-information.phone')}
                      placeholder={t('account-information.phone')}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </S.BodyBlock>
          </S.InformationBlock>

          <S.InformationBlock>
            <S.HeaderBlock>
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('account-information.security')}
              </Typography>
            </S.HeaderBlock>

            <S.BodyBlock>
              <Row gutter={[24, 24]}>
                <S.Column sm={3} xs={24}>
                  <Typography>{t('account-information.password')}</Typography>
                </S.Column>
                <S.Column sm={21} xs={24}>
                  <Button type="primary" onClick={form.submit}>
                    {t('account-information.change-password')}
                  </Button>
                </S.Column>
                <S.Column sm={3} xs={24}>
                  <Typography>{t('account-information.two-step')}</Typography>
                </S.Column>
                <S.Column sm={21} xs={24} $isEnableTwoFactor={enableTwoFactor}>
                  <Button
                    onClick={
                      enableTwoFactor
                        ? handleOpenModalDisableTwoFactor
                        : handleEnableTwoFactor
                    }
                  >
                    {t(
                      `${enableTwoFactor ? 'account-information.disable-two-factor-authentication' : 'account-information.enable-two-step'}`,
                    )}
                  </Button>
                </S.Column>
              </Row>
            </S.BodyBlock>
          </S.InformationBlock>
        </Form>
      </S.AccountInformation>

      <S.LookingAccountInformation>
        <S.LookingAccountWrap>
          <Typography>{t('account-information.looking-to-remove')}</Typography>
          <Button onClick={handleOpenModalDeleteAccount}>
            {t('account-information.delete-account')}
          </Button>
        </S.LookingAccountWrap>

        <S.Automatically>
          <Image src={icTickCircle} preview={false} width={20} height={20} />
          <Typography>{t('account-information.delete-account')}</Typography>
        </S.Automatically>
      </S.LookingAccountInformation>

      {modalEnableTwoFactor && (
        <ModalEnableTwoFactor
          open={modalEnableTwoFactor}
          onCancel={handleEnableTwoFactor}
          onEnableTwoFactor={setEnableTwoFactor}
        />
      )}

      {modalChangePassword && (
        <ModalChangePassword
          open={modalChangePassword}
          onCancel={handleOpenModalChangePassword}
        />
      )}

      {modalDeleteAccount && (
        <ModalDeleteAccount
          open={modalDeleteAccount}
          onCancel={handleOpenModalDeleteAccount}
        />
      )}

      {modalDisableTwoFactor && (
        <ModalDisableTwoFactor
          open={modalDisableTwoFactor}
          onCancel={handleOpenModalDisableTwoFactor}
        />
      )}
    </S.AccountInformationContainer>
  );
}

export default AccountInformation;
