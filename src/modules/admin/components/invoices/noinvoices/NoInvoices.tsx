import * as S from './NoInvoices.styles';

import icEmpty from '@/assets/icons/billing/ic-empty-payment.svg';
import { Image } from 'antd';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { useTranslation } from 'react-i18next';

const NoInvoices = () => {
  const { t } = useTranslation('billing');

  return (
    <S.Wrapper>
      <Image src={icEmpty} preview={false} />
      <Typography
        color={themeColors?.primary}
        variant="h5"
        fontWeight={fontWeight.semiBold}
      >
        {t('no-invoices.title')}
      </Typography>
      <Typography color={themeColors?.primary} fontWeight={fontWeight.light}>
        {t('no-invoices.description')}
      </Typography>
    </S.Wrapper>
  );
};

export default NoInvoices;
