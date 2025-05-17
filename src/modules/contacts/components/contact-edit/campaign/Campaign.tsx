import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './Campaign.styles';

import icCampaign from '@/assets/icons/contact/ic-campaign.svg';
import imgCampainEmpty from '@/assets/images/contact/img-campain-empty.png';

interface ContactInformationProps {
  isLoading?: boolean;
}

function Campaign({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icCampaign} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.campaign')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <Image
              src={imgCampainEmpty}
              width={120}
              height={120}
              preview={false}
            />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-campaign-found')}
            </Typography>
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icCampaign} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.campaign')}
              </Typography>
              <S.ConversationCount>
                <Typography
                  variant="caption-small"
                  color={themeColors?.secondary}
                >
                  1
                </Typography>
              </S.ConversationCount>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <Image
              src={imgCampainEmpty}
              width={120}
              height={120}
              preview={false}
            />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-campaign-found')}
            </Typography>
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Campaign;
