import { useAtom } from 'jotai';
import { currentLayoutIndexAtom } from '@/atoms';
import type { LayoutOption } from '../../types';
import {
    LayoutSection,
    LayoutTitle,
    LayoutPreview,
    PreviewContent,
    ButtonContainer,
    LayoutButton,
    LayoutInfo,
    LayoutName,
    LayoutDescription,
} from './index.styled';

const layoutOptions: LayoutOption[] = [
    {
        id: 0,
        name: '클래식 레이아웃',
        description: '전통적인 세로 배치로 깔끔하고 정돈된 느낌',
    },
    {
        id: 1,
        name: '모던 그리드',
        description: '격자 형태로 정보를 효율적으로 배치',
    },
    {
        id: 2,
        name: '매거진 스타일',
        description: '잡지 같은 자유로운 레이아웃',
    },
    {
        id: 3,
        name: '미니멀 디자인',
        description: '간결하고 세련된 미니멀 스타일',
    },
    {
        id: 4,
        name: '컴팩트 뷰',
        description: '정보를 압축적으로 표현하는 레이아웃',
    },
];

export const LayoutPreviewPanel = () => {
    const [currentLayoutIndex, setCurrentLayoutIndex] = useAtom(currentLayoutIndexAtom);

    const handlePreviousLayout = () => {
        setCurrentLayoutIndex(Math.max(0, currentLayoutIndex - 1));
    };

    const handleNextLayout = () => {
        setCurrentLayoutIndex(Math.min(layoutOptions.length - 1, currentLayoutIndex + 1));
    };

    const currentLayout = layoutOptions[currentLayoutIndex];

    return (
        <LayoutSection>
            <LayoutTitle>Select Layout</LayoutTitle>

            <LayoutPreview>
                <PreviewContent>
                    Layout Preview
                    <br />
                    {currentLayoutIndex + 1} / {layoutOptions.length}
                </PreviewContent>
            </LayoutPreview>

            <LayoutInfo>
                <LayoutName>{currentLayout.name}</LayoutName>
                <LayoutDescription>{currentLayout.description}</LayoutDescription>
            </LayoutInfo>

            <ButtonContainer>
                <LayoutButton onClick={handlePreviousLayout} disabled={currentLayoutIndex === 0}>
                    Previous Layout
                </LayoutButton>
                <LayoutButton onClick={handleNextLayout} disabled={currentLayoutIndex === layoutOptions.length - 1}>
                    Next Layout
                </LayoutButton>
            </ButtonContainer>
        </LayoutSection>
    );
};
