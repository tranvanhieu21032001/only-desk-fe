import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Image, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { RootState } from '@/core/store';
import { websiteRegex } from '@/shared/regex';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';
import { WorkspaceInterface } from '@/modules/auth/models/user';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { handleUpdateWorkspaceInformation } from '@/modules/settings/api/workspace';
import { WorkspaceFieldsEditEnums } from '@/modules/settings/helpers/enums/workspace';

import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import UploadImage from '@/shared/components/common/Upload/main';
import Typography from '@/shared/components/common/Typography';

import * as S from './WorkspaceInformation.styles';

import imgAvatarDefault from '@/assets/images/settings/ic-avatar-default.png';

function WorkspaceInformation() {
  const { t } = useTranslation('settingWorkspace');
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const avatarWatch = Form.useWatch('logo', form) || '';
  const { currentWorkspace }: any = useAppSelector(
    (state: RootState) => state?.auth,
  );

  const [params, setParams] = useState<{
    isLoading: boolean;
    countUpload: number;
    progressPercent: number;
    isLoadingDifferentField?: boolean;
  }>({
    isLoading: false,
    countUpload: 0,
    progressPercent: 0,
    isLoadingDifferentField: false,
  });

  useEffect(() => {
    form.setFieldsValue({
      ...currentWorkspace,
      message: currentWorkspace?.metadata?.message,
      telegram: currentWorkspace?.metadata?.telegram,
      twitter: currentWorkspace?.metadata?.twitter,
      whatsapp: currentWorkspace?.metadata?.whatsapp,
      instagram: currentWorkspace?.metadata?.instagram,
    });
  }, [currentWorkspace]);

  /**
   * @param {string} logoPath - The path to the logo image when was uploaded successfully.
   */
  const handleUpdateLogoInformation = (logoPath: string) => {
    handleUpdateWorkspaceInformation(
      t('workspace-information.update-image-workspace-success'),
      { logo: logoPath },
      setParams,
      dispatch,
      currentWorkspace as WorkspaceInterface,
    );
  };

  /**
   * @param {string} nameFile - The name of the form field need to update (nameField is dynamic).
   */
  function handleBlurUpdateAccountInformation(nameFile: string) {
    const getValueField = form.getFieldValue(nameFile);

    setParams((prev) => ({
      ...prev,
      isLoadingDifferentField: true,
    }));

    handleUpdateWorkspaceInformation(
      t('workspace-information.update-workspace-information-success'),
      { [nameFile]: getValueField },
      setParams,
      dispatch,
      currentWorkspace as WorkspaceInterface,
    );
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
          {params?.isLoadingDifferentField && <Spin />}
        </S.AccountInformationLabel>

        <Form form={form}>
          <S.InformationBlock>
            <S.HeaderBlock>
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('workspace-information.general-information')}
              </Typography>
            </S.HeaderBlock>

            <S.BodyBlock>
              <Row gutter={[24, 20]}>
                <S.Column xs={24} sm={7} md={6} lg={4}>
                  <S.ImageUpload $isLoading={params?.isLoading || false}>
                    <Form.Item name="logo">
                      <Image
                        src={avatarWatch || imgAvatarDefault}
                        preview={false}
                        width={120}
                        height={120}
                        onError={(e) =>
                          (e.currentTarget.src = imgAvatarDefault)
                        }
                      />
                    </Form.Item>

                    {params?.isLoading && (
                      <>
                        <Spin
                          indicator={
                            <LoadingOutlined style={{ fontSize: 48 }} spin />
                          }
                        />
                        <Typography
                          fontWeight={fontWeight?.semiBold}
                          color={themeColors?.successDark}
                        >
                          {params?.progressPercent}%
                        </Typography>
                      </>
                    )}
                  </S.ImageUpload>
                </S.Column>
                <S.ColumnAvatar xs={24} sm={17} md={18} lg={20}>
                  <UploadImage
                    onParams={setParams}
                    currentForm={form}
                    fieldName="logo"
                    maxCount={1}
                    handleUpdateAvatarInformation={handleUpdateLogoInformation}
                    content={
                      <S.ButtonUpload>
                        <Button type="primary" isLoading={params?.isLoading}>
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
                    name="websiteUrl"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!websiteRegex.test(value) && value) {
                            return Promise.reject(
                              new Error(
                                t(
                                  'workspace-information.website-domain-invalid',
                                ),
                              ),
                            );
                          } else if (!value) {
                            return Promise.reject(
                              new Error(
                                t('workspace-information.domain-required'),
                              ),
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      isHeight="47px"
                      disabled={true}
                      isRequired
                      label={t('workspace-information.domain')}
                      placeholder={t('workspace-information.enter-domain')}
                      onBlur={() =>
                        handleBlurUpdateAccountInformation('websiteUrl')
                      }
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
                      onBlur={() => handleBlurUpdateAccountInformation('name')}
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
                    name="contactEmail"
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
                      onBlur={() =>
                        handleBlurUpdateAccountInformation('contactEmail')
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="contactPhone"
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
                      onBlur={() =>
                        handleBlurUpdateAccountInformation('contactPhone')
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name={`${WorkspaceFieldsEditEnums.MESSAGE}`}>
                    <Input
                      isHeight="47px"
                      label={t('workspace-information.messenger')}
                      placeholder={t('workspace-information.enter-messenger')}
                      onBlur={() =>
                        handleBlurUpdateAccountInformation(
                          WorkspaceFieldsEditEnums.MESSAGE,
                        )
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name={`${WorkspaceFieldsEditEnums.TELEGRAM}`}>
                    <Input
                      label={t('workspace-information.telegram')}
                      placeholder={t('workspace-information.enter-telegram')}
                      isHeight="47px"
                      onBlur={() =>
                        handleBlurUpdateAccountInformation(
                          WorkspaceFieldsEditEnums.TELEGRAM,
                        )
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name={`${WorkspaceFieldsEditEnums.TWITTER}`}>
                    <Input
                      label={t('workspace-information.twitter')}
                      placeholder={t('workspace-information.enter-twitter')}
                      isHeight="47px"
                      onBlur={() =>
                        handleBlurUpdateAccountInformation(
                          WorkspaceFieldsEditEnums.TWITTER,
                        )
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name={`${WorkspaceFieldsEditEnums.WHATSAPP}`}>
                    <Input
                      label={t('workspace-information.whatsapp')}
                      placeholder={t('workspace-information.enter-whatsapp')}
                      isHeight="47px"
                      onBlur={() =>
                        handleBlurUpdateAccountInformation(
                          WorkspaceFieldsEditEnums.WHATSAPP,
                        )
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name={`${WorkspaceFieldsEditEnums.INSTAGRAM}`}>
                    <Input
                      label={t('workspace-information.instagram')}
                      placeholder={t('workspace-information.enter-instagram')}
                      isHeight="47px"
                      onBlur={() =>
                        handleBlurUpdateAccountInformation(
                          WorkspaceFieldsEditEnums.INSTAGRAM,
                        )
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </S.BodyBlock>
          </S.InformationBlock>
        </Form>
      </S.AccountInformation>

      {/* TODO */}
      {/* <S.LookingAccountInformation>
        <S.Automatically>
          <Image src={icTickCircle} preview={false} width={20} height={20} />
          <Typography>
            {t('workspace-information.automatically-saved')}
          </Typography>
        </S.Automatically>
      </S.LookingAccountInformation> */}
    </S.AccountInformationContainer>
  );
}

export default WorkspaceInformation;
