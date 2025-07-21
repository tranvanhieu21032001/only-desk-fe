import { Image as AntImage } from 'antd';
import { useTranslation } from 'react-i18next';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import { useAppSelector } from '@/shared/hooks';
import * as S from './LastReportedLocation.styles';
import icLocation from '@/assets/icons/contact/ic-location.svg';
import LastReportedLocationBody from '@/shared/components/common/ReportedLocation/LastReportedLocationBody';

interface ContactInformationProps {
  isLoading?: boolean;
}

function LastReportedLocation({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');
  const { contactDetails } = useAppSelector((state) => state.contacts);
  const context = contactDetails?.context;

  return (
    <S.Container>
      <S.Header>
        <AntImage src={icLocation} width={24} height={24} preview={false} />
        <Typography variant="h5" color={themeColors?.secondaryDarker}>
          {t('contact-profile.last-reported-location')}
        </Typography>
      </S.Header>

      <S.Body>
        <LastReportedLocationBody context={context} isLoading={isLoading} />
      </S.Body>
    </S.Container>
  );
}

export default LastReportedLocation;
