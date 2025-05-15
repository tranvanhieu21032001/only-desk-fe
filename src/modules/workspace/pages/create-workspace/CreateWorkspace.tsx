import { useState } from 'react';

import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import Input from '@/shared/components/common/Input';

import add from '@/assets/icons/workspace/ic-add.svg';
import info from '@/assets/icons/workspace/ic-info-red.svg';

import * as S from './CreateWorkspace.styles';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (workspaceName: string, websiteDomain: string) => void;
}

function CreateWorkspaceModal({ isOpen, onClose, onSubmit }: Props) {
  const { t } = useTranslation('workspaces');
  const [workspaceName, setWorkspaceName] = useState('');
  const [websiteDomain, setWebsiteDomain] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleOpenConfirm = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmCreate = () => {
    setIsConfirmModalOpen(false);
    if (onSubmit) onSubmit(workspaceName, websiteDomain);
    onClose();
    setWorkspaceName('');
    setWebsiteDomain('');
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('workspaces.title')}
        description={t('workspaces.description')}
        width={540}
        footer={
          <S.FooterActions>
            <Button onClick={onClose}>{t('workspaces.buttons.cancel')}</Button>
            <Button
              type="primary"
              onClick={handleOpenConfirm}
              icon={<img src={add} alt="" />}
              iconPosition="left"
            >
              {t('workspaces.buttons.create')}
            </Button>
          </S.FooterActions>
        }
      >
        <S.Wrapper>
          <S.FormRow>
            <S.Label>
              {t('workspaces.workspaceName.label')}
              <span> *</span>
            </S.Label>
            <Input
              placeholder={t('workspaces.workspaceName.placeholder')}
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Label>
              {t('workspaces.websiteDomain.label')}
              <span> *</span>
            </S.Label>
            <Input
              placeholder={t('workspaces.websiteDomain.placeholder')}
              value={websiteDomain}
              onChange={(e) => setWebsiteDomain(e.target.value)}
            />
          </S.FormRow>
        </S.Wrapper>
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        width={480}
        hideHeader
        footer={
          <S.FooterActions>
            <Button onClick={() => setIsConfirmModalOpen(false)}>
              {t('workspaces.buttons.cancel')}
            </Button>
            <Button type="danger" onClick={handleConfirmCreate} width="180px">
              {t('workspaces.buttons.confirmCreate')}
            </Button>
          </S.FooterActions>
        }
      >
        <S.ConfirmModalContent>
          <S.ConfirmIconWrap>
            <div>
              <img src={info} alt="" />
            </div>
            <S.ConfirmColumn>
              <S.ConfirmTitle>
                {t('workspaces.confirmModal.title')}
              </S.ConfirmTitle>

              <S.ConfirmDesc>
                {t('workspaces.confirmModal.description')}
              </S.ConfirmDesc>
            </S.ConfirmColumn>
          </S.ConfirmIconWrap>
        </S.ConfirmModalContent>
      </Modal>
    </>
  );
}

export default CreateWorkspaceModal;
