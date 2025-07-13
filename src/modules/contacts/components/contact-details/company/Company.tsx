import { Form, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import { websiteRegex } from '@/shared/regex';
import { useAppSelector } from '@/shared/hooks';
import { FormTypeEnums } from '@/shared/helper/enums/common';
import themeColors from '@/shared/styles/themes/default/colors';
import { companyMockup } from '@/modules/contacts/helpers/contact.data';
import { FormFieldKeyEnums } from '@/modules/contacts/helpers/contact.enums';

import Input from '@/shared/components/common/Input';
import Typography from '@/shared/components/common/Typography';

import * as S from './Company.styles';

import icInfo from '@/assets/icons/contact/ic-info-circle.svg';

function ContactInformation() {
  const { t } = useTranslation('contacts');
  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );
  const renderForm = (field: any) => {
    switch (field.type) {
      case FormTypeEnums.INPUT:
        return (
          <Form.Item
            name={field.key}
            rules={[
              {
                validator: (_, value) => {
                  if (
                    field.key === FormFieldKeyEnums.WEBSITE &&
                    value &&
                    !websiteRegex.test(value)
                  ) {
                    return Promise.reject(
                      new Error(t('website-domain-invalid')),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              placeholder={t(`contact-profile.${field.placeholder}`)}
              disabled={field.disable}
            />
          </Form.Item>
        );

      case FormTypeEnums.PHONE_NUMBER:
        return (
          <Form.Item name={field.key}>
            <Input
              placeholder={field.placeholder}
              disabled={field.disable}
              type="text"
            />
          </Form.Item>
        );

      default:
        return (
          <Typography>
            {contactDetails?.companyInfo?.[field.fieldName] || '-'}
          </Typography>
        );
    }
  };

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <Image src={icInfo} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors.secondaryDarker}>
              {t('contact-profile.company-information')}
            </Typography>
          </S.Header>

          <S.Body>
            {companyMockup.map((item) => (
              <S.ContentWrap key={item.key}>
                <Typography>{t(`contact-profile.${item.label}`)}</Typography>
                <Skeleton.Input
                  active
                  style={{
                    height: 39,
                    width: '100%',
                    marginTop: 8,
                    minHeight: 39,
                  }}
                />
              </S.ContentWrap>
            ))}
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <Image src={icInfo} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors.secondaryDarker}>
              {t('contact-profile.company-information')}
            </Typography>
          </S.Header>

          <S.Body>
            {companyMockup.map((item) =>
              !isDetails ? (
                <S.ContentWrap key={item.key}>
                  <Typography>{t(`contact-profile.${item.label}`)}</Typography>
                  {renderForm(item)}
                </S.ContentWrap>
              ) : (
                <S.ContentWrap key={item.key}>
                  <Typography>{t(`contact-profile.${item.label}`)}</Typography>
                  <Typography>
                    {contactDetails?.companyInfo?.[item.fieldName] || '-'}
                  </Typography>
                </S.ContentWrap>
              ),
            )}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default ContactInformation;
