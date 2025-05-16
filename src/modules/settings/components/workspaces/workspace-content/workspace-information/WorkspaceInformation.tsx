import { useState } from 'react';
import { Col, Form, Image, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import UploadImage from '@/shared/components/common/Upload';
import Typography from '@/shared/components/common/Typography';

import * as S from './WorkspaceInformation.styles';

import icTickCircle from '@/assets/icons/contact/ic-tick-circle.svg';
import imgAvatarDefault from '@/assets/images/settings/ic-avatar-default.png';

function WorkspaceInformation() {
  const { t } = useTranslation('settingWorkspace');
  const [form] = Form.useForm();

  const [_, setParams] = useState<{
    isLoading: boolean;
    countUpload: number;
  }>({ isLoading: false, countUpload: 0 });
  const [avatar, setAvatar] = useState<string[]>([]);

  function handleChangePassword() {
    // TODO handle later
  }

  return (
    <S.AccountInformationContainer>
      <S.AccountInformation>
        <S.AccountInformationLabel>
          <Typography
            fontWeight={fontWeight?.semiBold}
            color={themeColors?.secondaryDarker}
          >
            {t('workspace-information.workspace-information')}
          </Typography>
        </S.AccountInformationLabel>

        <Form form={form} onFinish={handleChangePassword}>
          <S.InformationBlock>
            <S.HeaderBlock>
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('workspace-information.general-information')}
              </Typography>
            </S.HeaderBlock>

            <S.BodyBlock>
              <Row gutter={[24, 20]}>
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
                          {t('workspace-information.upload-image')}
                        </Button>
                        <Typography
                          color={themeColors?.newtralDark}
                          margin="8px 0 0 0"
                        >
                          {t('workspace-information.file-smaller-than-2mb')}
                        </Typography>
                      </S.ButtonUpload>
                    }
                  />
                </S.ColumnAvatar>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="domain"
                    rules={[
                      {
                        required: true,
                        message: t('workspace-information.domain-required'),
                      },
                    ]}
                  >
                    <Input
                      isHeight="47px"
                      isRequired
                      label={t('workspace-information.domain')}
                      placeholder={t('workspace-information.enter-domain')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: t('workspace-information.name-required'),
                      },
                    ]}
                  >
                    <Input
                      isHeight="47px"
                      isRequired
                      label={t('workspace-information.name')}
                      placeholder={t('workspace-information.enter-name')}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </S.BodyBlock>
          </S.InformationBlock>

          <S.InformationBlock>
            <S.HeaderBlock>
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('workspace-information.contact-information')}
              </Typography>
            </S.HeaderBlock>

            <S.BodyBlock>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: t('workspace-information.email-required'),
                      },
                      {
                        type: 'email',
                        message: t('workspace-information.email-invalid'),
                      },
                    ]}
                  >
                    <Input
                      isHeight="47px"
                      isRequired
                      type="email"
                      label={t('workspace-information.email')}
                      placeholder={t('workspace-information.email')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: t('workspace-information.phone-required'),
                      },
                    ]}
                  >
                    <Input
                      isHeight="47px"
                      isRequired
                      type="number"
                      label={t('workspace-information.phone')}
                      placeholder={t('workspace-information.phone')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="messenger">
                    <Input
                      isHeight="47px"
                      isRequired
                      label={t('workspace-information.messenger')}
                      placeholder={t('workspace-information.enter-messenger')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="telegram">
                    <Input
                      label={t('workspace-information.telegram')}
                      placeholder={t('workspace-information.enter-telegram')}
                      isHeight="47px"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="twitter">
                    <Input
                      label={t('workspace-information.twitter')}
                      placeholder={t('workspace-information.enter-twitter')}
                      isHeight="47px"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="whatsapp">
                    <Input
                      label={t('workspace-information.whatsapp')}
                      placeholder={t('workspace-information.enter-whatsapp')}
                      isHeight="47px"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="instagram">
                    <Input
                      label={t('workspace-information.instagram')}
                      placeholder={t('workspace-information.enter-instagram')}
                      isHeight="47px"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </S.BodyBlock>
          </S.InformationBlock>
        </Form>
      </S.AccountInformation>

      <S.LookingAccountInformation>
        <S.Automatically>
          <Image src={icTickCircle} preview={false} width={20} height={20} />
          <Typography>
            {t('workspace-information.automatically-saved')}
          </Typography>
        </S.Automatically>
      </S.LookingAccountInformation>
    </S.AccountInformationContainer>
  );
}

export default WorkspaceInformation;
