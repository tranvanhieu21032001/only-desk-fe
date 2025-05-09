import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import Typography from '@/shared/components/common/Typography';

import * as S from './EmptyFilter.styles';

import imgFilterEmpty from '@/assets/images/contact/img-filter-empty.png';

function EmptyFilter() {
  const { t } = useTranslation('contacts');

  return (
    <S.ContactEmptyContainer>
      <Image src={imgFilterEmpty} width={200} height={200} preview={false} />
      <Typography variant="h5" textAlign="center" margin="8xp 0 0 0">
        {t('empty.you-have-no-contact')}
      </Typography>
      <Typography textAlign="center" margin="12px 0 0 0">
        {t('empty.contacts-are-stored')}
      </Typography>
    </S.ContactEmptyContainer>
  );
}

export default EmptyFilter;
