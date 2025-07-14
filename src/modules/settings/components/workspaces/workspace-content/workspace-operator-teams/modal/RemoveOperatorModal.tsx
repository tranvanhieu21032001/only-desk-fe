// RemoveOperatorModal.tsx
import Modal from '@/shared/components/common/Modal';
import * as S from './modal.styles';
import iconInfo from '@/assets/icons/setting/ic-info-red.svg';
import Button from '@/shared/components/common/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onConfirm: () => void;
  t: (key: string) => string;
}

const RemoveOperatorModal = ({
  isOpen,
  onClose,
  isLoading,
  onConfirm,
  t,
}: Props) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    hideHeader
    footer={
      <S.ModalEmptyFooter>
        <Button type="default" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button
          type="danger"
          width="180px"
          isLoading={isLoading}
          onClick={onConfirm}
        >
          {t('operators.remove-operator')}
        </Button>
      </S.ModalEmptyFooter>
    }
  >
    <S.ModalEmpty>
      <img src={iconInfo} alt="info" />
      <S.ModalEmptyColumn>
        <p>{t('operators.remove-confirm-title')}</p>
        <span>{t('operators.remove-confirm-desc')}</span>
      </S.ModalEmptyColumn>
    </S.ModalEmpty>
  </Modal>
);

export default RemoveOperatorModal;
