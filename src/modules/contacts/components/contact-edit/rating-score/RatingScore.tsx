import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './RatingScore.styles';

import icStar from '@/assets/icons/contact/ic-star.svg';
import imgRatingEmpty from '@/assets/images/contact/img-rating-empty.png';

interface ContactInformationProps {
  isLoading?: boolean;
}

function RatingScore({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icStar} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.rating-score')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <Image
              src={imgRatingEmpty}
              width={120}
              height={120}
              preview={false}
            />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-rating-submitted')}
            </Typography>
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icStar} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.rating-score')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <Image
              src={imgRatingEmpty}
              width={120}
              height={120}
              preview={false}
            />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-rating-submitted')}
            </Typography>
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default RatingScore;
