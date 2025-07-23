import React from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../shared/components/common/Button';

import * as S from './ProfilePreviewModal.styles';

import closeModal from '@/assets/icons/common/ic-close-modal.svg';

interface ProfilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  redirectUrl?: string;
}

const ProfilePreviewModal: React.FC<ProfilePreviewModalProps> = ({
  isOpen,
  onClose,
  children,
  redirectUrl,
}) => {
  const { t } = useTranslation('inbox');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRedirect = () => {
    if (redirectUrl) {
      navigate(redirectUrl);
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Panel onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.ModalColumn>
            <S.Title>{t('profilePreviewModal.title')}</S.Title>
            <S.Description>{t('profilePreviewModal.description')}</S.Description>
          </S.ModalColumn>
          <S.CloseButton onClick={onClose}>
            <Image src={closeModal} preview={false} />
          </S.CloseButton>
        </S.Header>
        <S.Body>{children}</S.Body>
        <S.Footer>
          <Button onClick={onClose} width="100px">
            {t('profilePreviewModal.back')}
          </Button>
          <Button
            type="primary"
            width="190px"
            onClick={handleRedirect}
            disabled={!redirectUrl}
          >
            {t('profilePreviewModal.viewProfileDetail')}
          </Button>
        </S.Footer>
      </S.Panel>
    </S.Overlay>
  );
};

export default ProfilePreviewModal;
