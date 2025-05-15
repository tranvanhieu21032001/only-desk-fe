import React, { useState } from 'react';

import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import Input from '@/shared/components/common/Input';

import add from '@/assets/icons/workspace/ic-add.svg';
import info from '@/assets/icons/workspace/ic-info-red.svg';

import * as S from './CreateWorkspace.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (workspaceName: string, websiteDomain: string) => void;
}

function CreateWorkspaceModal({ isOpen, onClose, onSubmit }: Props) {
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
        title="Create Workspace"
        description="Please insert modal description here."
        width={540}
        footer={
          <S.FooterActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleOpenConfirm}
              icon={<img src={add} alt="" />}
              iconPosition="left"
            >
              Create Workspace
            </Button>
          </S.FooterActions>
        }
      >
        <S.Wrapper>
          <S.FormRow>
            <S.Label>
              Workspace name<span> *</span>
            </S.Label>
            <Input
              placeholder="Enter workspace name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Label>
              Website domain<span> *</span>
            </S.Label>
            <Input
              placeholder="Enter website domain"
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
            <Button onClick={() => setIsConfirmModalOpen(false)}>Cancel</Button>
            <Button type="danger" onClick={handleConfirmCreate} width="180px">
              Yes, Create Workspace
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
                This domain already exists on OnlyChat
              </S.ConfirmTitle>

              <S.ConfirmDesc>
                You may be duplicating a workspace that already exists on
                OnlyChat, which may create confusion into which workspace is the
                correct one. The workspace may exist on your own OnlyChat
                account or someone else's OnlyChat account.
              </S.ConfirmDesc>
            </S.ConfirmColumn>
          </S.ConfirmIconWrap>
        </S.ConfirmModalContent>
      </Modal>
    </>
  );
}

export default CreateWorkspaceModal;
