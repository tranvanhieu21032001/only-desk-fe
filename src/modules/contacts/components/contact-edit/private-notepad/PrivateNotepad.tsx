import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './PrivateNotepad.styles';

import icPrivateNodepads from '@/assets/icons/contact/ic-private-notepads.svg';

interface ContactInformationProps {
  isLoading?: boolean;
}

function PrivateNotepad({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image
                src={icPrivateNodepads}
                width={24}
                height={24}
                preview={false}
              />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.private-notepads')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.this-is-content')}
            </Typography>
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image
                src={icPrivateNodepads}
                width={24}
                height={24}
                preview={false}
              />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.private-notepads')}
              </Typography>
            </S.HeaderWrap>
          </S.Header>

          <S.Body>
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.this-is-content')}
            </Typography>
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default PrivateNotepad;
