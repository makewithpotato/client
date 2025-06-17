import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalContent, CloseButton } from './index.styled';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: string;
    height?: string;
}

export const Modal = ({ isOpen, onClose, children, width, height }: ModalProps) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent width={width} height={height}>
                <CloseButton onClick={onClose}>✕</CloseButton>
                {children}
            </ModalContent>
        </ModalOverlay>,
        document.body
    );
};
