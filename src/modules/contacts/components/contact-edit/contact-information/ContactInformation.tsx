import { useTranslation } from 'react-i18next';
import { Form, Image, Skeleton, Switch, Tooltip } from 'antd';

import { websiteRegex } from '@/shared/regex';
import { useAppSelector } from '@/shared/hooks';
import {
  contactInformationMockup,
  genderOptions,
} from '@/modules/contacts/helpers/contact.data';
import { FormTypeEnums } from '@/shared/helper/enums/common';
import themeColors from '@/shared/styles/themes/default/colors';
import { FormFieldKeyEnums } from '@/modules/contacts/helpers/contact.enums';

import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';
import Typography from '@/shared/components/common/Typography';

import * as S from './ContactInformation.styles';

import icInfo from '@/assets/icons/contact/ic-info-circle.svg';

function ContactInformation() {
  const { t } = useTranslation('contacts');

  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );

  const renderForm = (field: any) => {
    switch (field?.type) {
      case FormTypeEnums?.INPUT:
        return (
          <Form.Item
            name={field?.key}
            rules={[
              {
                validator: (_, value) => {
                  if (
                    FormFieldKeyEnums?.WEBSITE === field?.key &&
                    !websiteRegex.test(value) &&
                    value
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
            <Input placeholder={field?.placeholder} disabled={field?.disable} />
          </Form.Item>
        );
      case FormTypeEnums?.PHONE_NUMBER:
        return (
          <Form.Item name={field?.key}>
            <Input
              placeholder={field?.placeholder}
              disabled={field?.disable}
              type="number"
            />
          </Form.Item>
        );
      case FormTypeEnums?.SELECT:
        return (
          <Form.Item name={field?.key}>
            <Select
              placeholder={field?.placeholder}
              options={genderOptions?.map((option) => ({
                ...option,
                label: t(`gender-options.${option?.label}`),
              }))}
            />
          </Form.Item>
        );
      case FormTypeEnums?.SWITCH:
        return (
          <Form.Item name={field?.key}>
            <Switch />
          </Form.Item>
        );
      default:
        return (
          <Typography>
            {/* {field?.key === FormTypeEnums?.CREATE_DATE &&
            contactDetails?.[field?.key]
              ? dayjs(contactDetails?.[field?.key]).format(
                  DATE_TIME_FORMAT?.EURO_DATE_TIME_FORMAT,
                )
              :  */}
            {contactDetails?.[field?.key]}
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
                    height: '39px',
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
            {contactInformationMockup?.map((item) => {
              return !isDetails ? (
                <S.ContentWrap key={item?.key}>
                  <Typography>{t(`contact-profile.${item?.label}`)}</Typography>
                  {renderForm(item)}
                </S.ContentWrap>
              ) : (
                <S.ContentWrap key={item?.key}>
                  <Typography>{t(`contact-profile.${item?.label}`)}</Typography>
                  <Tooltip title={contactDetails?.[item?.key]}>
                    <Typography>{contactDetails?.[item?.key]}</Typography>
                  </Tooltip>
                </S.ContentWrap>
              );
            })}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default ContactInformation;
