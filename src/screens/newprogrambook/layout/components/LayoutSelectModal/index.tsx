import React from 'react';
import { useAtom } from 'jotai';
import { selectedLayoutAtom } from '@/atoms/programBook';
import {
    Modal,
    ModalContent,
    Title,
    LayoutGrid,
    LayoutOption,
    LayoutPreview,
    LayoutTitle,
    CloseButton,
} from './index.styled';

const LAYOUTS = [
    {
        id: '1',
        title: '기본 레이아웃',
        description: '상단, 중단, 하단 영역으로 구성된 기본적인 레이아웃입니다.',
        preview: '/assets/images/layouts/basic.png',
    },
    {
        id: '2',
        title: '포스터 중심',
        description: '영화 포스터를 크게 보여주는 레이아웃입니다.',
        preview: '/assets/images/layouts/poster.png',
    },
    {
        id: '3',
        title: '텍스트 중심',
        description: '분석 내용을 중심으로 보여주는 레이아웃입니다.',
        preview: '/assets/images/layouts/text.png',
    },
    {
        id: '4',
        title: '그리드',
        description: '4개의 영역으로 균등하게 나누어진 레이아웃입니다.',
        preview: '/assets/images/layouts/grid.png',
    },
];

interface LayoutSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LayoutSelectModal: React.FC<LayoutSelectModalProps> = ({ isOpen, onClose }) => {
    const [selectedLayout, setSelectedLayout] = useAtom(selectedLayoutAtom);

    if (!isOpen) return null;

    const handleLayoutSelect = (layoutId: string) => {
        setSelectedLayout(layoutId);
        onClose();
    };

    return (
        <Modal>
            <ModalContent>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>레이아웃 선택</Title>
                <LayoutGrid>
                    {LAYOUTS.map((layout) => (
                        <LayoutOption
                            key={layout.id}
                            onClick={() => handleLayoutSelect(layout.id)}
                            isSelected={selectedLayout === layout.id}
                        >
                            <LayoutPreview src={layout.preview} alt={layout.title} />
                            <LayoutTitle>{layout.title}</LayoutTitle>
                        </LayoutOption>
                    ))}
                </LayoutGrid>
            </ModalContent>
        </Modal>
    );
};
