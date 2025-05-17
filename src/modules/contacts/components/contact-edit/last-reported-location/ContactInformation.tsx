import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import { lastReportedLocation } from '@/modules/contacts/helpers/contact.data';

import Typography from '@/shared/components/common/Typography';

import * as S from './LastReportedLocation.styles';

import icLocation from '@/assets/icons/contact/ic-location.svg';

interface ContactInformationProps {
  isLoading?: boolean;
}

function LastReportedLocation({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <Image src={icLocation} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors?.secondaryDarker}>
              {t('contact-profile.last-reported-location')}
            </Typography>
          </S.Header>

          <S.Body>
            {lastReportedLocation?.map((item) => (
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
            <Image src={icLocation} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors?.secondaryDarker}>
              {t('contact-profile.last-reported-location')}
            </Typography>
          </S.Header>

          <S.Body>
            {lastReportedLocation?.map((item) => (
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

export default LastReportedLocation;
