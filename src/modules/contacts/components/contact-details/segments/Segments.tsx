import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './Segments.styles';
import icTag from '@/assets/icons/contact/ic-tag.svg';
import SegmentsBody from '@/shared/components/common/SegmentsBody/SegmentsBody';


function Segments() {
  const { t } = useTranslation('contacts');
  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );

  const segments = contactDetails?.segments || [];

  return (
    <S.Container>
      <S.Header>
        <Image src={icTag} width={24} height={24} preview={false} />
        <Typography variant="h5" color={themeColors.secondaryDarker}>
          {t('contact-profile.segments')}
        </Typography>
      </S.Header>

      <SegmentsBody
        isDetails={isDetails}
        segments={segments}
        isLoading={isLoading || false}
        t={t}
      />
    </S.Container>
  );
}

export default Segments;
