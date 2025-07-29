import React, { useEffect, useRef, useState } from 'react';
import { Form, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';

import * as S from './CustomizeKnowledgeBase.styles';

import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';

import iconTickCircle from '@/assets/icons/setting/ic-tick.svg';
import iconImage from '@/assets/icons/common/ic-image-add.svg';

import Input from '@/shared/components/common/Input';
import UploadImage from '@/shared/components/common/Upload/main';

import { langOptions } from '@/modules/auth/helpers/data/signIn';
import { OptionsInterface } from '@/core/model/common';
import { updateKnowledgeBaseSetting } from '@/modules/settings/api/knowledge-base';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';
import { fetchKnowledgeBaseString } from '@/modules/settings/store/features/knowledgebase';
import { useAppDispatch } from '@/shared/hooks';

const CustomizeKnowledgeBase = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation('knowledgeBase');
  const dispatch = useAppDispatch();
  const [uploadParams, setUploadParams] = useState({
    isLoading: false,
    countUpload: 0,
    progressPercent: 0,
  });

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [domain, setDomain] = useState('');
  const [language, setLanguage] = useState<string>(langOptions?.[0]?.value);

  const domainRef = useRef(domain);
  const updateSettingField = async (field: string, value: any) => {
    const payload: Record<string, any> = {};

    if (field === 'domain') payload.customDomain = value;
    else if (field === 'language') payload.languages = [value];
    else payload[field] = value;

    try {
      await updateKnowledgeBaseSetting(payload);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDomain(value);
  };

  const handleDomainBlur = () => {
    if (domain !== domainRef.current) {
      updateSettingField('domain', domain);
      domainRef.current = domain;
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    updateSettingField('language', value);
  };

  const { settings, isFetching } = useSelector((state: RootState) => state.knowledgeBaseSettings);

  useEffect(() => {
    dispatch(fetchKnowledgeBaseString());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setDomain(settings.customDomain || '');
      setLogoUrl(settings.logo || null);
      setBannerUrl(settings.banner || null);
      setLanguage(settings.languages?.[0] || langOptions?.[0]?.value || '');
      domainRef.current = settings.customDomain || '';
      form.setFieldsValue({
        logo: settings.logo || '',
        banner: settings.banner || '',
      });
    }
  }, [settings, form]);

  return (
    <S.KnowledgeBaseInformationContainer>
      <S.KnowledgeBaseInformation>
        <S.KnowledgeBaseInformationLabel>
          <Typography
            fontWeight={fontWeight.semiBold}
            color={themeColors.secondaryDarker}
          >
            Customize Knowledge Base
          </Typography>
        </S.KnowledgeBaseInformationLabel>

        <Skeleton active loading={isFetching}>
          <Form form={form} layout="vertical" onFinish={() => {}} onSubmitCapture={(e) => e.preventDefault()}>
            <S.SectionBox>
              <S.Tỉtle>General</S.Tỉtle>

              <S.WrapSection>
                <S.GroupInput>
                  <S.FormField>
                    <Typography fontWeight={fontWeight.medium}>
                      <S.FormInput>
                        Basic domain <span style={{ color: 'red' }}>*</span>
                      </S.FormInput>
                    </Typography>
                    <Input
                      value={domain}
                      onChange={handleDomainChange}
                      onBlur={handleDomainBlur}
                      size="large"
                      placeholder="help.t2bo.com"
                    />
                  </S.FormField>

                  <S.FormField>
                    <Typography fontWeight={fontWeight.medium}>
                      <S.FormInput>Language</S.FormInput>
                    </Typography>
                    <S.ChangeLang
                      value={language}
                      popupClassName="auth-lang"
                      onChange={handleLanguageChange}
                    >
                      {langOptions.map((lang: OptionsInterface) => (
                        <S.LangOption key={lang.key} value={lang.value}>
                          <Image src={lang.flag as string} preview={false} />
                          <Typography>
                            {t(`article-menu.language.${lang.label}`)}
                          </Typography>
                        </S.LangOption>
                      ))}
                    </S.ChangeLang>
                  </S.FormField>
                </S.GroupInput>
              </S.WrapSection>

              <S.WrapUpload>
                <UploadImage
                  isRequired
                  fieldName="logo"
                  currentForm={form}
                  onParams={setUploadParams}
                  content={
                    <div
                      style={{
                        width: 120,
                        height: 120,
                        border: '1px solid #253A8E',
                        borderRadius: 8,
                        background: '#FAFAFA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt="Logo"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <ReactSVG src={iconImage} />
                      )}
                    </div>
                  }
                  handleUpdateAvatarInformation={(url) => {
                    setLogoUrl(url);
                    form.setFieldValue('logo', url);
                    updateSettingField('logo', url);
                  }}
                />
                <S.WrapContent>
                  <Typography>Header logo</Typography>
                  <S.Desc>
                    File smaller than 10MB and at least 400px x 400px
                  </S.Desc>
                </S.WrapContent>
              </S.WrapUpload>

              <S.WrapUpload2>
                <UploadImage
                  isRequired
                  fieldName="banner"
                  currentForm={form}
                  onParams={setUploadParams}
                  content={
                    <div
                      style={{
                        width: 400,
                        height: 160,
                        border: '1px solid #253A8E',
                        borderRadius: 8,
                        background: '#FAFAFA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      {bannerUrl ? (
                        <img
                          src={bannerUrl}
                          alt="Banner"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <ReactSVG src={iconImage} />
                      )}
                    </div>
                  }
                  handleUpdateAvatarInformation={(url) => {
                    setBannerUrl(url);
                    form.setFieldValue('banner', url);
                    updateSettingField('banner', url);
                  }}
                />
                <S.WrapContent>
                  <Typography>Banner</Typography>
                  <S.Desc>
                    File smaller than 10MB and at least 800px x 320px
                  </S.Desc>
                </S.WrapContent>
              </S.WrapUpload2>
            </S.SectionBox>
          </Form>
        </Skeleton>
      </S.KnowledgeBaseInformation>

      <S.KnowledgeBaseInformation2>
        <S.AutoSaveIndicator>
          <img src={iconTickCircle} alt="auto-save" />
          <p>Automatically saved</p>
        </S.AutoSaveIndicator>
      </S.KnowledgeBaseInformation2>
    </S.KnowledgeBaseInformationContainer>
  );
};

export default CustomizeKnowledgeBase;
