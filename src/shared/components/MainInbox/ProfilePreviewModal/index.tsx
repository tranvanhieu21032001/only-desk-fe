import React from 'react';
import { Image } from "antd";

import Button from '../../common/Button';

import * as S from './profile-preview-styles'

import closeModal from '@/assets/icons/common/ic-close-modal.svg'

interface ProfilePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const ProfilePreviewModal: React.FC<ProfilePreviewModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <S.Overlay onClick={onClose}>
            <S.Panel onClick={(e) => e.stopPropagation()}>
                <S.Header>
                    <S.ModalColumn>
                        <S.Title>
                            Profile Preview
                        </S.Title>
                        <S.Description>
                            Insert page description here.
                        </S.Description>
                    </S.ModalColumn>
                    <S.CloseButton onClick={onClose}>
                        <Image src={closeModal} preview={false} />
                    </S.CloseButton>
                </S.Header>
                <S.Body>{children}</S.Body>
                <S.Footer>
                    <Button onClick={onClose} width='100px'>Back</Button>
                    <Button type='primary' width='190   px'>View Profile Detail</Button>
                </S.Footer>
            </S.Panel>
        </S.Overlay>
    );
};

export default ProfilePreviewModal;
