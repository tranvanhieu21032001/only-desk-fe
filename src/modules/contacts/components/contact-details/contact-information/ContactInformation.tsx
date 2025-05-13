import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import { contactInformationMockup } from '@/modules/contacts/helpers/contact.data';

import Typography from '@/shared/components/common/Typography';

import * as S from './ContactInformation.styles';

import icInfo from '@/assets/icons/contact/ic-info-circle.svg';

interface ContactInformationProps {
  isLoading?: boolean;
}

function ContactInformation({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

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
                <Typography>{t(item?.value)}</Typography>
              </S.ContentWrap>
            ))}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default ContactInformation;
