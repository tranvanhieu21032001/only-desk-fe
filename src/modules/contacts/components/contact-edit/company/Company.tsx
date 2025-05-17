import { Form, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import { FormTypeEnums } from '@/shared/helper/enums/common';
import themeColors from '@/shared/styles/themes/default/colors';
import { companyMockup } from '@/modules/contacts/helpers/contact.data';

import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';
import Typography from '@/shared/components/common/Typography';

import * as S from './Company.styles';

import icCompany from '@/assets/icons/contact/company.svg';

interface ContactInformationProps {
  isLoading?: boolean;
}

function Company({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  const renderForm = useCallback((field: any) => {
    switch (field?.type) {
      case FormTypeEnums?.INPUT:
        return (
          <Input placeholder={t(`contact-profile.${field?.placeholder}`)} />
        );
      case FormTypeEnums?.SELECT:
        return (
          <Select placeholder={t(`contact-profile.${field?.placeholder}`)} />
        );
      default:
        return <Typography>{t(field?.value)}</Typography>;
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <Image src={icCompany} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors?.secondaryDarker}>
              {t('contact-profile.company')}
            </Typography>
          </S.Header>

          <S.Body>
            {companyMockup?.map((item) => (
              <S.ContentWrap key={item?.key}>
                <Skeleton.Input
                  active
                  style={{
                    height: '23px',
                    width: '100%',
                    minWidth: '200px',
                  }}
                />
              </S.ContentWrap>
            ))}
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <Image src={icCompany} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors?.secondaryDarker}>
              {t('contact-profile.company')}
            </Typography>
          </S.Header>

          <S.Body>
            {companyMockup?.map((item) => (
              <S.ContentWrap key={item?.key}>
                <Typography>{t(`contact-profile.${item?.label}`)}</Typography>
                <Form.Item name={item?.key}>{renderForm(item)}</Form.Item>
              </S.ContentWrap>
            ))}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Company;
