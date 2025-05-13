import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '@/shared/components/common/Typography';

import * as S from './Data.styles';

import icData from '@/assets/icons/contact/ic-data.svg';
import empty from '@/assets/images/contact/img-contact-empty.png';

interface ContactInformationProps {
  isLoading?: boolean;
}

function Data({ isLoading }: ContactInformationProps) {
  const { t } = useTranslation('contacts');

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icData} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.data')}
              </Typography>
            </S.HeaderWrap>
            <S.HeaderActionWrap>
              <PlusOutlined />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.add-data')}
              </Typography>
            </S.HeaderActionWrap>
          </S.Header>

          <S.Body>
            <Image src={empty} width={120} height={120} preview={false} />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-data-added')}
            </Typography>
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderWrap>
              <Image src={icData} width={24} height={24} preview={false} />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.data')}
              </Typography>
            </S.HeaderWrap>
            <S.HeaderActionWrap>
              <PlusOutlined />
              <Typography variant="h5" color={themeColors?.secondaryDarker}>
                {t('contact-profile.add-data')}
              </Typography>
            </S.HeaderActionWrap>
          </S.Header>

          <S.Body>
            <Image src={empty} width={120} height={120} preview={false} />
            <Typography color={themeColors?.primary} margin="8px 0 0 0">
              {t('contact-profile.no-data-added')}
            </Typography>
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Data;
