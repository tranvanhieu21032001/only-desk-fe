import React from "react";
import { Image } from "antd";

import * as S from "./modal.styles";

import closeModal from '@/assets/icons/common/ic-close-modal.svg'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    width?: number;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    width,
}) => {
    if (!isOpen) return null;

    return (
        <S.Overlay onClick={onClose}>
            <S.ModalContainer onClick={(e) => e.stopPropagation()} $width={width}>
                <S.ModalHeader>
                    <div className="" style={{ display: "flex", flexDirection: "column" }}>
                        {title && <S.ModalTitle>{title}</S.ModalTitle>}
                        {description && <S.ModalDescription>{description}</S.ModalDescription>}
                    </div>
                    <S.CloseButton onClick={onClose}>
                        <Image src={closeModal} preview={false} />
                    </S.CloseButton>
                </S.ModalHeader>

                <S.ModalChildren>
                    {children}
                </S.ModalChildren>

                {footer !== undefined ? (
                    <S.Footer>{footer}</S.Footer>
                ) : (
                    <S.Footer>
                        <S.Button onClick={onClose}>Close</S.Button>
                    </S.Footer>
                )}
            </S.ModalContainer>
        </S.Overlay>
    );
};

export default Modal;
