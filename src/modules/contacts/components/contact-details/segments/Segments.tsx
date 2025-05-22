import { Form, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';

import Select from '@/shared/components/common/Select';
import Typography from '@/shared/components/common/Typography';

import * as S from './Segments.styles';

import icTag from '@/assets/icons/contact/ic-tag.svg';

function Segments() {
  const { t } = useTranslation('contacts');
  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );

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
            {isDetails ? (
              contactDetails?.segments?.map((item: string, index: number) => (
                <S.ContentWrap key={index}>
                  <Typography>{item}</Typography>
                </S.ContentWrap>
              ))
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
