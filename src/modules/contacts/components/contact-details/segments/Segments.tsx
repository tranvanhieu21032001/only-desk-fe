import { Form, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';

import Select from '@/shared/components/common/Select';
import Typography from '@/shared/components/common/Typography';

import * as S from './Segments.styles';

import icTag from '@/assets/icons/contact/ic-tag.svg';
import empty from '@/assets/images/contact/img-contact-empty.png';

function Segments() {
  const { t } = useTranslation('contacts');
  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );

  const segments = contactDetails?.segments || [];

  return (
    <>
      {isLoading ? (
        <S.Container>
          <S.Header>
            <Image src={icTag} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors.secondaryDarker}>
              {t('contact-profile.segments')}
            </Typography>
          </S.Header>

          <S.Body>
            {Array(8)
              .fill(0)
              .map((_, idx) => (
                <S.ContentWrap key={idx}>
                  <Skeleton.Avatar
                    active
                    style={{ height: 18, width: 40, borderRadius: 0 }}
                  />
                </S.ContentWrap>
              ))}
          </S.Body>
        </S.Container>
      ) : (
        <S.Container>
          <S.Header>
            <Image src={icTag} width={24} height={24} preview={false} />
            <Typography variant="h5" color={themeColors.secondaryDarker}>
              {t('contact-profile.segments')}
            </Typography>
          </S.Header>

          <S.Body>
            {isDetails ? (
              segments.length ? (
                segments.map((seg: string, idx: number) => (
                  <S.ContentWrap key={idx}>
                    <Typography>{seg}</Typography>
                  </S.ContentWrap>
                ))
              ) : (
                <S.EmptyWrap>
                  <Image src={empty} width={120} height={120} preview={false} />
                  <Typography color={themeColors.primary} margin="8px 0 0 0">
                    {t('contact-profile.no-data-added')}
                  </Typography>
                </S.EmptyWrap>
              )
            ) : (
              <Form.Item name="segments">
                <Select
                  mode="tags"
                  allowClear
                  placeholder={t('contact-profile.select-segments')}
                  tokenSeparators={[',']}
                />
              </Form.Item>
            )}
          </S.Body>
        </S.Container>
      )}
    </>
  );
}

export default Segments;
