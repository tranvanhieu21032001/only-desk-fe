import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './Company.styles';
import icInfo from '@/assets/icons/contact/ic-info-circle.svg';
import CompanyInfoBody from '@/shared/components/common/CompanyInfoBody/CompanyInfoBody';


function ContactInformation() {
  const { t } = useTranslation('contacts');
  const { isLoading, isDetails } = useAppSelector((state) => state.contacts);

  return (
    <S.Container>
      <S.Header>
        <Image src={icInfo} width={24} height={24} preview={false} />
        <Typography variant="h5" color={themeColors.secondaryDarker}>
          {t('contact-profile.company-information')}
        </Typography>
      </S.Header>

      <CompanyInfoBody isLoading={isLoading || false} isDetails={isDetails} />
    </S.Container>
  );
}

export default ContactInformation;
