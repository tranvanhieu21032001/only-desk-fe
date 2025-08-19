import { useEffect, useRef } from 'react';
import * as S from './SetupKnowledgeBase.styles';
import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';
import iconTickCircle from '@/assets/icons/setting/ic-tick.svg';
import icCircle from '@/assets/icons/common/ic-circle-tick.svg';
import icMinitor from '@/assets/icons/common/ic-minitor.svg';
import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';
import { constants } from '@/core/settings';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { RootState } from '@/core/store';
import { useSelector } from 'react-redux';
import { updateKnowledgeBaseSetting } from '@/modules/settings/api/knowledge-base';
import { Form } from 'antd';
import { PermissionGate } from '@/modules/permissions/components/PermissionGate';
import PermissionWarningMessage from '@/shared/components/common/PermissionWarningMessage/PermissionWarningMessage';

const domainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const SetupKnowledgeBase = () => {
  const { t } = useTranslation('knowledgeSetting');
  const currentWorkspace = webLocalStorage.get(constants.CURRENT_WORKSPACE);
  const { settings } = useSelector(
    (state: RootState) => state.knowledgeBaseSettings,
  );
  const [form] = Form.useForm();

  const basicDomainRef = useRef('');
  const customDomainRef = useRef('');

  useEffect(() => {
    if (settings) {
      form.setFieldsValue({
        basicDomain: settings.basicDomain || '',
        customDomain: settings.customDomain || '',
      });
      basicDomainRef.current = settings.basicDomain || '';
      customDomainRef.current = settings.customDomain || '';
    }
  }, [settings, form]);

  const updateSettingField = async (field: string, value: string) => {
    const payload: Record<string, string> = {};
    payload[field] = value;
    try {
      await updateKnowledgeBaseSetting(payload);
    } catch (err) {
      console.error(`Update ${field} failed:`, err);
    }
  };

  const handleBlur = async (field: 'basicDomain' | 'customDomain') => {
    try {
      const value = form.getFieldValue(field);

      // Validate only if basicDomain or customDomain has value
      if (field === 'basicDomain' || value) {
        await form.validateFields([field]);
      }

      const previous =
        field === 'basicDomain'
          ? basicDomainRef.current
          : customDomainRef.current;

      if (value && value !== previous) {
        await updateSettingField(field, value);
        if (field === 'basicDomain') basicDomainRef.current = value;
        if (field === 'customDomain') customDomainRef.current = value;
      }

      // If cleared customDomain and previously had value, send empty string to backend
      if (field === 'customDomain' && !value && previous) {
        await updateSettingField(field, '');
        customDomainRef.current = '';
      }
    } catch (e) {
      // Validation failed – do nothing
    }
  };

  return (
    <S.KnowledgeBaseInformationContainer>
      <S.KnowledgeBaseInformation>
        <S.KnowledgeBaseInformationLabel>
          <Typography
            fontWeight={fontWeight?.semiBold}
            color={themeColors?.secondaryDarker}
          >
            {t('setup-knowledge-base.setup-title')}
          </Typography>
        </S.KnowledgeBaseInformationLabel>

        <PermissionGate feature="knowledge_base">
          {(hasPermission: boolean, message?: string) => (
            <>
              {!hasPermission && <PermissionWarningMessage message={message}/>}
              <Form form={form} layout="vertical">
                <S.GroupInput
                  style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start',
                  }}
                >
                  <S.FormField style={{ flex: 1 }}>
                    <Typography fontWeight={fontWeight.medium}>
                      <S.FormInput>
                        {t('setup-knowledge-base.basic-domain')}{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </S.FormInput>
                    </Typography>
                    <Form.Item
                      name="basicDomain"
                      rules={[
                        { required: true, message: 'Basic domain is required' },
                        {
                          pattern: /^[a-zA-Z0-9-]+$/,
                          message:
                            'Basic domain must be alphanumeric (no dots or special characters)',
                        },
                      ]}
                      validateTrigger="onBlur"
                      style={{ marginBottom: 0, minHeight: '72px' }}
                      extra={null}
                    >
                      <Input
                        placeholder="e.g., t2bo"
                        size="large"
                        onBlur={() => handleBlur('basicDomain')}
                        domainText={t(
                          'setup-knowledge-base.baseHelpdeskDomain',
                        )}
                        disabled={!hasPermission}
                        isDomainHidden={false}
                      />
                    </Form.Item>
                  </S.FormField>

                  <S.FormField style={{ flex: 1 }}>
                    <Typography fontWeight={fontWeight.medium}>
                      <S.FormInput>
                        {t('setup-knowledge-base.custom-domain')}
                      </S.FormInput>
                    </Typography>
                    <Form.Item
                      name="customDomain"
                      rules={[
                        {
                          pattern: domainRegex,
                          message:
                            'Invalid domain format. Example: help.t2bo.com',
                        },
                      ]}
                      validateTrigger="onBlur"
                      style={{ marginBottom: 0, minHeight: '72px' }}
                      extra={
                        <S.Domain style={{ visibility: 'hidden' }}>
                          placeholder
                        </S.Domain>
                      }
                    >
                      <Input
                        placeholder="help.t2bo.com"
                        size="large"
                        onBlur={() => handleBlur('customDomain')}
                        disabled={!hasPermission}
                      />
                    </Form.Item>
                  </S.FormField>
                </S.GroupInput>
              </Form>
            </>
          )}
        </PermissionGate>

        <S.SectionBox>
          <Typography fontWeight={fontWeight.semiBold}>
            {t('setup-knowledge-base.custom-instruction-title')}
          </Typography>

          <S.WrapSection>
            <S.Ordinal>1</S.Ordinal>
            <S.Content>
              {`${t('setup-knowledge-base.instruction-1')} ${
                settings?.customDomain || 'custom domain'
              }`}
            </S.Content>
          </S.WrapSection>

          <S.WrapSection>
            <S.Ordinal>2</S.Ordinal>
            <S.Content>
              {t('setup-knowledge-base.instruction-2-part-1')}{' '}
              <S.Detail>
                {t('setup-knowledge-base.instruction-2-part-2')}
              </S.Detail>{' '}
              {t('setup-knowledge-base.instruction-2-part-3')}{' '}
              <S.Detail>
                {t('setup-knowledge-base.instruction-2-part-4')}{' '}
                {currentWorkspace?.websiteID}
              </S.Detail>
            </S.Content>
          </S.WrapSection>

          <S.WrapSection>
            <S.Ordinal>3</S.Ordinal>
            <S.Content>
              {t('setup-knowledge-base.instruction-3-part-1')}{' '}
              <S.Detail>
                {t('setup-knowledge-base.instruction-3-part-2')}
              </S.Detail>
              {t('setup-knowledge-base.instruction-3-part-3')}{' '}
              <S.Detail>
                {t('setup-knowledge-base.instruction-3-part-4')}
              </S.Detail>
            </S.Content>
          </S.WrapSection>

          <S.WrapSection>
            <S.Ordinal>4</S.Ordinal>
            <S.Content>{t('setup-knowledge-base.instruction-4')}</S.Content>
          </S.WrapSection>

          <S.WrapButton>
            <Button disabled icon={<ReactSVG src={icCircle} />}>
              {t('setup-knowledge-base.verify-button')}
            </Button>
            <Button type="primary" icon={<ReactSVG src={icMinitor} />}>
              {t('setup-knowledge-base.view-button')}
            </Button>
          </S.WrapButton>
        </S.SectionBox>
      </S.KnowledgeBaseInformation>

      <S.KnowledgeBaseInformation2>
        <S.AutoSaveIndicator>
          <img src={iconTickCircle} alt="auto-save" />
          <p>{t('setup-knowledge-base.auto-save')}</p>
        </S.AutoSaveIndicator>
      </S.KnowledgeBaseInformation2>
    </S.KnowledgeBaseInformationContainer>
  );
};

export default SetupKnowledgeBase;
