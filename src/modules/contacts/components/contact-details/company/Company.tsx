import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import { companyMockup } from '@/modules/contacts/helpers/contact.data';

import Typography from '@/shared/components/common/Typography';

import * as S from './Company.styles';

import icCompany from '@/assets/icons/contact/company.svg';

interface ContactInformationProps {
  isLoading?: boolean;
}

function Company({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

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
            {companyMockup?.map((index) => (
              <S.ContentWrap key={index}>
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
              <S.ContentWrap key={item}>
                <Typography>{item}</Typography>
              </S.ContentWrap>
            ))}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Company;
