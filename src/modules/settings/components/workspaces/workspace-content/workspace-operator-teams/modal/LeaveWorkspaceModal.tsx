import * as S from './modal.styles';
import iconInfo from '@/assets/icons/info.svg';
import Button from '@/shared/components/common/Button';
import Modal from '@/shared/components/common/Modal';

type LeaveWorkspaceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LeaveWorkspaceModal = ({ isOpen, onClose }: LeaveWorkspaceModalProps) => (
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
          Leave Workspace
        </Button>
      </S.ModalEmptyFooter>
    }
  >
    <S.ModalEmpty>
      <img src={iconInfo} alt="" />
      <S.ModalEmptyColumn>
        <p>Are you sure you want to leave the workspace?</p>
        <span>You will not be able to access the workspace anymore.</span>
      </S.ModalEmptyColumn>
    </S.ModalEmpty>
  </Modal>
);

export default LeaveWorkspaceModal;
