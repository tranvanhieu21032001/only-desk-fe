import { useMemo } from 'react';
import { Form, Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';

import TextArea from '@/shared/components/common/TextArea';
import Typography from '@/shared/components/common/Typography';

import * as S from './PrivateNotepad.styles';

import icPrivateNodepads from '@/assets/icons/contact/ic-private-notepads.svg';

function PrivateNotepad() {
  const { t } = useTranslation('contacts');
  const { isLoading, contactDetails, isDetails } = useAppSelector(
    (state) => state.contacts,
  );

  const renderNotes = useMemo(() => {
    if (!contactDetails?.notes) {
      return (
        <Typography color={themeColors?.primary} margin="8px 0 0 0">
          {t('contact-profile.this-is-content')}
        </Typography>
      );
    }

    return (
      <Form.Item name="notes">
        <TextArea
          disabled={isDetails}
          placeholder={t('contact-profile.enter-notes')}
        />
      </Form.Item>
    );
  }, [contactDetails?.notes, isDetails]);

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
            <Skeleton.Input
              active
              style={{
                height: '140px',
                width: '100%',
              }}
            />
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

          <S.Body>{renderNotes}</S.Body>
        </S.Container>
      )}
    </>
  );
}

export default PrivateNotepad;
