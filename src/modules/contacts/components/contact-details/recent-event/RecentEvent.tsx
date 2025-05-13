import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './RecentEvent.styles';

import icCalendar from '@/assets/icons/contact/ic-calendar.svg';
import imgEventEmpty from '@/assets/images/contact/img-recent-event-empy.png';

interface ContactInformationProps {
  isLoading?: boolean;
}

function RecentEvent({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icCalendar} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.recent-event')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <Image
              src={imgEventEmpty}
              width={120}
              height={120}
              preview={false}
            />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-event-added')}
            </Typography>
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icCalendar} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.recent-event')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <Image
              src={imgEventEmpty}
              width={120}
              height={120}
              preview={false}
            />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-event-added')}
            </Typography>
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default RecentEvent;
