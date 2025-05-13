import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './Segments.styles';

import icTag from '@/assets/icons/contact/ic-tag.svg';

interface ContactInformationProps {
  isLoading?: boolean;
}

function Segments({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <Image src={icTag} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors?.secondaryDarker}>
              {t('contact-profile.segments')}
            </Typography>
          </S.Header>

          <S.Body>
            {Array(8)
              ?.fill(0)
              ?.map((_, index) => (
                <S.ContentWrap key={index}>
                  <Skeleton.Avatar
                    active
                    style={{
                      height: '18px',
                      width: '40px',
                      borderRadius: 0,
                    }}
                  />
                </S.ContentWrap>
              ))}
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <Image src={icTag} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors?.secondaryDarker}>
              {t('contact-profile.segments')}
            </Typography>
          </S.Header>

          <S.Body>
            {Array(8)
              ?.fill(0)
              ?.map((_, index) => (
                <S.ContentWrap key={index}>
                  <Typography>Tag</Typography>
                </S.ContentWrap>
              ))}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Segments;
