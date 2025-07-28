import { useState } from 'react';
import { Form, Image } from 'antd';
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

const CustomizeKnowledgeBase = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation('knowledgeBase');

  const [uploadParams, setUploadParams] = useState({
    isLoading: false,
    countUpload: 0,
    progressPercent: 0,
  });

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [domain, setDomain] = useState('help.t2bo.com');
  const [language, setLanguage] = useState<string>(langOptions?.[0]?.value);

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDomain(value);
    console.log('Domain changed:', value);
  };

  const handleDomainBlur = () => {
    console.log('Domain on blur:', domain);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    console.log('Language changed:', value);
  };

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
        <Form form={form} layout="vertical">
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
                    placeholder=""
                  />
                </S.FormField>

                <S.FormField>
                  <Typography fontWeight={fontWeight.medium}>
                    <S.FormInput>Language</S.FormInput>
                  </Typography>
                  <S.ChangeLang
                    defaultValue={language}
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

            {/* Logo Upload */}
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
                  console.log('Logo uploaded:', url);
                }}
              />
              <S.WrapContent>
                <Typography>Header logo</Typography>
                <S.Desc>
                  File smaller than 10MB and at least 400px x 400px
                </S.Desc>
              </S.WrapContent>
            </S.WrapUpload>

            {/* Banner Upload */}
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
                  console.log('Banner uploaded:', url);
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
