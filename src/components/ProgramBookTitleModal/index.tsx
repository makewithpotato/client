import { useState } from 'react';
import { Modal } from '../Modal';
import { ModalTitle, Input, ButtonContainer, SaveButton, CancelButton } from './index.styled';

interface ProgramBookTitleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string) => void;
    initialTitle?: string;
}

export const ProgramBookTitleModal = ({ isOpen, onClose, onSave, initialTitle = '' }: ProgramBookTitleModalProps) => {
    const [title, setTitle] = useState(initialTitle);

    const handleSave = () => {
        if (title.trim()) {
            onSave(title.trim());
            onClose();
            setTitle('');
        }
    };

    const handleClose = () => {
        onClose();
        setTitle(initialTitle);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} width="500px" height="250px">
            <ModalTitle>프로그램북 제목 입력</ModalTitle>
            <Input
                type="text"
                placeholder="프로그램북 제목을 입력하세요"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
            />
            <ButtonContainer>
                <CancelButton onClick={handleClose}>취소</CancelButton>
                <SaveButton onClick={handleSave} disabled={!title.trim()}>
                    저장
                </SaveButton>
            </ButtonContainer>
        </Modal>
    );
};
