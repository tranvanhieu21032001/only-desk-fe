import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Form, Image, Skeleton, Switch, Tooltip } from 'antd';

import { websiteRegex } from '@/shared/regex';
import { useAppSelector } from '@/shared/hooks';

import {
  contactInformationMockup,
  genderOptions,
} from '@/modules/contacts/helpers/contact.data';
import { DATE_TIME_FORMAT } from '@/core/settings/dataTime';
import { FormTypeEnums } from '@/shared/helper/enums/common';
import themeColors from '@/shared/styles/themes/default/colors';

import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';
import Typography from '@/shared/components/common/Typography';

import * as S from './ContactInformation.styles';

import icInfo from '@/assets/icons/contact/ic-info-circle.svg';
import { isEmpty } from 'lodash';

function ContactInformation() {
  const { t } = useTranslation('contacts');

  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );

  const renderForm = (field: any) => {
    switch (field?.type) {
      case FormTypeEnums?.INPUT:
        return (
          <Form.Item name={field?.key}>
            <Input
              placeholder={field?.placeholder}
              disabled={
                field?.key === 'email'
                  ? !isEmpty(contactDetails?.email)
                  : field?.disable
              }
            />
          </Form.Item>
        );
      case FormTypeEnums?.WEBSITE:
        return (
          <Form.Item
            name={field?.key}
            rules={[
              {
                validator: (_, value) => {
                  if (!websiteRegex.test(value) && value) {
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
      case FormTypeEnums?.CREATE_DATE:
        return (
          <Typography>
            {dayjs(contactDetails?.[field?.key]).format(
              DATE_TIME_FORMAT?.EURO_DATE_TIME_FORMAT,
            )}
          </Typography>
        );
      default:
        return <Typography>{contactDetails?.[field?.key]}</Typography>;
    }
  };

  const renderDetails = (field: any) => {
    switch (field?.type) {
      case FormTypeEnums?.CREATE_DATE:
        return dayjs(contactDetails?.[field?.key]).format(
          DATE_TIME_FORMAT?.EURO_DATE_TIME_FORMAT,
        );
      case FormTypeEnums?.SWITCH:
        return contactDetails?.[field?.key]
          ? t('contact-profile.active')
          : t('contact-profile.inactive');

      default:
        return contactDetails?.[field?.key];
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
                    marginTop: '8px',
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
                    <Typography>{renderDetails(item)}</Typography>
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
