import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ToastMessageType } from '@/shared/helper/enums/common';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import * as S from './toast-message.styles';

import icError from '@/assets/icons/common/ic-danger.svg';
import icSuccess from '@/assets/icons/common/ic-tick.svg';

interface ToastMessageProps {
  typeToast?: ToastMessageType;
  message?: string;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ typeToast, message }) => {
  const { t } = useTranslation('messages');

  const renderContentToast = useMemo(() => {
    switch (typeToast) {
      case ToastMessageType?.INFO:
        return (
          <S.ToastMessageWrap>
            <S.ToastIcon src={icSuccess} preview={false} />
            <S.ToastContent>
              <S.ToastLabel
                variant="body-text-larger"
                fontWeight={fontWeight?.semiBold}
              >
                {t('success')}
              </S.ToastLabel>
              {message && <S.Toast>{message}</S.Toast>}
            </S.ToastContent>
          </S.ToastMessageWrap>
        );
      case ToastMessageType?.ERROR:
        return (
          <S.ToastMessageWrap>
            <S.ToastIcon src={icError} preview={false} />
            <S.ToastContent>
              <S.ToastLabel
                variant="body-text-larger"
                fontWeight={fontWeight?.semiBold}
              >
                {t('error')}
              </S.ToastLabel>
              {message && <S.Toast>{message}</S.Toast>}
            </S.ToastContent>
          </S.ToastMessageWrap>
        );
      default:
        return (
          <S.ToastMessageWrap>
            <S.ToastIcon src={icSuccess} preview={false} />
            <S.ToastContent>
              <S.ToastLabel
                variant="body-text-larger"
                fontWeight={fontWeight?.semiBold}
              >
                {t('success')}
              </S.ToastLabel>
              {message && <S.Toast>{message}</S.Toast>}
            </S.ToastContent>
          </S.ToastMessageWrap>
        );
    }
  }, [typeToast, message]);

  return <Fragment>{renderContentToast}</Fragment>;
};

export default ToastMessage;
