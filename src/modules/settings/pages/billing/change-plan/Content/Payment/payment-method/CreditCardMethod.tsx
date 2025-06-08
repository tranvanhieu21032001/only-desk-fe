import React from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import * as S from './CreditCardMethod.styles';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import Typography from '@/shared/components/common/Typography';
import Input from '@/shared/components/common/Input';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';

const CreditCardMethod = () => {
  const { t } = useTranslation('billing');

  return (
    <S.BillingDetails>
      <S.Section>
        <S.Title>{t('credit-method.billing-details')}</S.Title>
        <hr />
        <S.FormField>
          <Typography fontWeight={fontWeight.medium}>
            <S.FormInput>
              {t('credit-method.address')}
              <Image preview={false} src={icValid} height={23} width={7} />
            </S.FormInput>
          </Typography>
          <Input placeholder={t('credit-method.address-placeholder')} size="large" />
        </S.FormField>

        <S.GroupField>
          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('credit-method.country')}
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <S.ChangeCountry placeholder={t('credit-method.country-placeholder')}>
              <S.CountryOption value="vn">{t('credit-method.country-vn')}</S.CountryOption>
              <S.CountryOption value="us">{t('credit-method.country-us')}</S.CountryOption>
              <S.CountryOption value="uk">{t('credit-method.country-uk')}</S.CountryOption>
            </S.ChangeCountry>
          </S.FormField>

          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('credit-method.zip-code')}
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder={t('credit-method.zip-code-placeholder')} size="large" />
          </S.FormField>
        </S.GroupField>

        <S.FormField>
          <Typography fontWeight={fontWeight.medium}>
            <S.FormInput>
              {t('credit-method.invoice-info')}
              <Image preview={false} src={icValid} height={23} width={7} />
            </S.FormInput>
          </Typography>
          <Input placeholder={t('credit-method.company-placeholder')} size="large" />
        </S.FormField>

        <S.GroupField>
          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('credit-method.email-invoice')}
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder={t('credit-method.email-placeholder')} size="large" />
          </S.FormField>

          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('credit-method.phone')}
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder={t('credit-method.phone-placeholder')} size="large" />
          </S.FormField>
        </S.GroupField>
      </S.Section>

      <S.Section>
        <S.Title>{t('credit-method.payment-details')}</S.Title>
        <hr />

        <S.GroupField>
          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('credit-method.card-number')}
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder={t('credit-method.card-number-placeholder')} size="large" />
          </S.FormField>

          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('credit-method.expiration')}
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder={t('credit-method.expiration-placeholder')} size="large" />
          </S.FormField>
        </S.GroupField>

        <S.GroupField>
          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('credit-method.name-on-card')}
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder={t('credit-method.name-placeholder')} size="large" />
          </S.FormField>

          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('credit-method.security-code')}
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder={t('credit-method.security-placeholder')} size="large" />
          </S.FormField>
        </S.GroupField>
      </S.Section>
    </S.BillingDetails>
  );
};

export default CreditCardMethod;