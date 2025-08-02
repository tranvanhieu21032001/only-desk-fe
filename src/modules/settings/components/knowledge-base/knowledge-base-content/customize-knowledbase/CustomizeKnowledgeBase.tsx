import React, { useEffect, useRef, useState } from 'react';
import { Form, Image, Skeleton, Select } from 'antd';
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

import { updateKnowledgeBaseSetting } from '@/modules/settings/api/knowledge-base';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';
import { langOptions } from '@/modules/auth/helpers/data/signIn';

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
  const [name, setName] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const nameRef = useRef(name);

  const updateSettingField = async (field: string, value: any) => {
    const payload: Record<string, any> = {};
    if (field === 'language') payload.languages = value;
    else payload[field] = value;

    try {
      await updateKnowledgeBaseSetting(payload);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleNameBlur = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    if (name !== nameRef.current) {
      updateSettingField('name', name);
      nameRef.current = name;
    }
  };

  const handleLanguageChange = (values: string[]) => {
    setLanguages(values);
    updateSettingField('language', values);
  };

  const { settings, isFetching } = useSelector(
    (state: RootState) => state.knowledgeBaseSettings,
  );

  useEffect(() => {
    if (settings) {
      setName(settings.name || '');
      setLogoUrl(settings.logo || null);
      setBannerUrl(settings.banner || null);
      setLanguages(settings.languages || []);
      nameRef.current = settings.name || '';
      form.setFieldsValue({
        logo: settings.logo || '',
        banner: settings.banner || '',
        name: settings.name || '',
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
          <Form
            form={form}
            layout="vertical"
            onFinish={() => {}}
            onSubmitCapture={(e) => e.preventDefault()}
          >
            <S.SectionBox>
              <S.Tỉtle>General</S.Tỉtle>

              <S.WrapSection>
                <S.GroupInput>
                  <S.FormField>
                    <Typography fontWeight={fontWeight.medium}>
                      <S.FormInput>
                        Name <span style={{ color: 'red' }}>*</span>
                      </S.FormInput>
                    </Typography>
                    <Input
                      value={name}
                      onChange={handleNameChange}
                      onBlur={handleNameBlur}
                      size="large"
                      placeholder="e.g. Helpdesk Support"
                    />
                  </S.FormField>

                  <S.FormField>
                    <Typography fontWeight={fontWeight.medium}>
                      <S.FormInput>Languages</S.FormInput>
                    </Typography>

                    <Select
                      mode="multiple"
                      value={languages}
                      onChange={handleLanguageChange}
                      placeholder="Select languages"
                      style={{ width: '100%' }}
                      size="large"
                      optionLabelProp="label"
                      maxTagCount="responsive"
                      tagRender={({ label, value, closable, onClose }) => {
                        const selectedLang = langOptions.find(
                          (lang) => lang.value === value,
                        );
                        return (
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              background: '#F0F0F0',
                              borderRadius: 4,
                              padding: '2px 8px',
                              marginInlineEnd: 4,
                            }}
                          >
                            {selectedLang?.flag && (
                              <img
                                src={selectedLang.flag}
                                alt={selectedLang.label}
                                width={20}
                                style={{ marginRight: 6 }}
                              />
                            )}
                            <span>{label}</span>
                            {closable && (
                              <span
                                onClick={onClose}
                                style={{ marginLeft: 6, cursor: 'pointer' }}
                              >
                                ×
                              </span>
                            )}
                          </div>
                        );
                      }}
                    >
                      {langOptions.map((lang) => (
                        <Select.Option
                          key={lang.key}
                          value={lang.value}
                          label={lang.label}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            {lang.flag && (
                              <img
                                src={lang.flag}
                                alt={lang.label}
                                width={20}
                              />
                            )}
                            <span>{lang.label}</span>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
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
