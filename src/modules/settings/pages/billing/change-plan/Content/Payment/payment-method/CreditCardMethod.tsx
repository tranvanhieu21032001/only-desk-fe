import React from 'react';
import * as S from './CreditCardMethod.styles';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import Typography from '@/shared/components/common/Typography';
import Input from '@/shared/components/common/Input';
import { Image } from 'antd';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';

const CreditCardMethod = () => {
  return (
    <S.BillingDetails>
      <S.Section>
        <S.Title>Your billing details</S.Title>
        <hr />
        <S.FormField>
          <Typography fontWeight={fontWeight.medium}>
            <S.FormInput>
              Address
              <Image preview={false} src={icValid} height={23} width={7} />
            </S.FormInput>
          </Typography>
          <Input placeholder="Enter your address" size="large" />
        </S.FormField>
        <S.GroupField>
          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Country
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <S.ChangeCountry placeholder="Select country">
              <S.CountryOption value="vn">Vietnam</S.CountryOption>
              <S.CountryOption value="us">United States</S.CountryOption>
              <S.CountryOption value="uk">United Kingdom</S.CountryOption>
            </S.ChangeCountry>
          </S.FormField>

          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Zip Code
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder="Enter zip code" size="large" />
          </S.FormField>
        </S.GroupField>

        <S.FormField>
          <Typography fontWeight={fontWeight.medium}>
            <S.FormInput>
              Information for invoices
              <Image preview={false} src={icValid} height={23} width={7} />
            </S.FormInput>
          </Typography>
          <Input placeholder="Enter your company name" size="large" />
        </S.FormField>


        <S.GroupField>
          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Email to send invoices to
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder="Enter you email" size="large" />
          </S.FormField>

          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
               Phone number
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder="Enter your phone number" size="large" />
          </S.FormField>
        </S.GroupField>
      </S.Section>

      <S.Section>
        <S.Title>Payment details</S.Title>
        <hr />

        <S.GroupField>
          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Card number
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder="Enter your address" size="large" />
          </S.FormField>

          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Expiration date
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder="MM/YYYY" size="large" />
          </S.FormField>
        </S.GroupField>

        <S.GroupField>
          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Name on card
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder="Enter your name on card" size="large" />
          </S.FormField>

          <S.FormField style={{ flex: 1 }}>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                Security code
                <Image preview={false} src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input placeholder="CVV" size="large" />
          </S.FormField>
        </S.GroupField>
      </S.Section>
    </S.BillingDetails>
  );
};

export default CreditCardMethod;
