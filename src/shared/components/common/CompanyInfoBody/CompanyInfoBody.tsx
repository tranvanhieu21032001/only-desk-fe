// components-in-contact/CompanyInfoBody.tsx
import { Form, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import { websiteRegex } from '@/shared/regex';
import { useAppSelector } from '@/shared/hooks';
import { FormTypeEnums } from '@/shared/helper/enums/common';
import {
  companyMockup,
  ContactCompanyFormItem,
} from '@/modules/contacts/helpers/contact.data';
import { FormFieldKeyEnums } from '@/modules/contacts/helpers/contact.enums';

import Input from '@/shared/components/common/Input';
import Typography from '@/shared/components/common/Typography';

import * as S from './Company.styles';

interface Props {
  isLoading: boolean;
  isDetails: boolean;
}

function CompanyInfoBody({ isLoading, isDetails }: Props) {
  const { t } = useTranslation('contacts');
  const { contactDetails } = useAppSelector((state) => state.contacts);

  const renderForm = (field: ContactCompanyFormItem) => {
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
            {contactDetails?.companyInfo?.[field.key] || '-'}
          </Typography>
        );
    }
  };

  if (isLoading) {
    return (
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
    );
  }

  return (
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
              {contactDetails?.companyInfo?.[item.key] || '-'}
            </Typography>
          </S.ContentWrap>
        ),
      )}
    </S.Body>
  );
}

export default CompanyInfoBody;
