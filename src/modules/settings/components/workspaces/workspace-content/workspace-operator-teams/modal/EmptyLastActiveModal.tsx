import Button from '@/shared/components/common/Button';
import Modal from '@/shared/components/common/Modal';
import * as S from './modal.styles';
import iconInfo from '@/assets/icons/setting/ic-info-red.svg';
interface EmptyLastActiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmptyLastActiveModal = ({
  isOpen,
  onClose,
}: EmptyLastActiveModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    hideHeader
    footer={
      <S.ModalEmptyFooter>
        <Button type="default" onClick={onClose}>
          Cancel
        </Button>
        <Button type="danger" width="180px" onClick={onClose}>
          Empty Last Active
        </Button>
      </S.ModalEmptyFooter>
    }
  >
    <S.ModalEmpty>
      <img src={iconInfo} alt="" />
      <S.ModalEmptyColumn>
        <p>Empty Last Active</p>
        <span>
          Are you sure to empty last active operators? The list of last
          operators in the chatbox will be cleaned.
        </span>
      </S.ModalEmptyColumn>
    </S.ModalEmpty>
  </Modal>
);

export default EmptyLastActiveModal;
