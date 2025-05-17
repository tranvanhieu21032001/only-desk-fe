import { Form, Image, Skeleton, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import { FormTypeEnums } from '@/shared/helper/enums/common';
import themeColors from '@/shared/styles/themes/default/colors';
import { contactInformationMockup } from '@/modules/contacts/helpers/contact.data';

import Typography from '@/shared/components/common/Typography';

import * as S from './ContactInformation.styles';

import icInfo from '@/assets/icons/contact/ic-info-circle.svg';
import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';

interface ContactInformationProps {
  isLoading?: boolean;
}

function ContactInformation({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  const renderForm = useCallback((field: any) => {
    switch (field?.type) {
      case FormTypeEnums?.INPUT:
        return (
          <Input placeholder={field?.placeholder} disabled={field?.disable} />
        );
      case FormTypeEnums?.SELECT:
        return <Select placeholder={field?.placeholder} />;
      case FormTypeEnums?.SWITCH:
        return <Switch />;
      default:
        return <Typography>{t(field?.value)}</Typography>;
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <Image src={icInfo} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors?.secondaryDarker}>
              {t('contact-profile.contact-information')}
            </Typography>
          </S.Header>

          <S.Body>
            {contactInformationMockup?.map((item) => (
              <S.ContentWrap key={item?.key}>
                <Typography>{t(`contact-profile.${item?.label}`)}</Typography>
                <Skeleton.Input
                  active
                  style={{
                    height: '23px',
                    width: '100%',
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
            <Typography variant="h5" color={themeColors?.secondaryDarker}>
              {t('contact-profile.contact-information')}
            </Typography>
          </S.Header>

          <S.Body>
            {contactInformationMockup?.map((item) => (
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

export default ContactInformation;
