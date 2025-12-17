import React, { useState } from 'react';
import {
    ToolbarWrapper,
    ToolbarHeader,
    ToolbarTitle,
    ToggleIcon,
    ToolbarContent,
    ToolbarGrid,
    ToolButton,
    ToolIcon,
    ToolLabel,
} from './index.styled';

export type ShapeType = 'textbox' | 'rectangle' | 'circle' | 'line';

interface ShapesToolbarProps {
    onAddShape: (type: ShapeType) => void;
}

// SVG 아이콘들
const TextIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
    </svg>
);

const RectangleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
);

const CircleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
    </svg>
);

const LineIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
);

const ChevronIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const shapes: { type: ShapeType; label: string; icon: React.ReactNode }[] = [
    { type: 'textbox', label: '텍스트', icon: <TextIcon /> },
    { type: 'rectangle', label: '사각형', icon: <RectangleIcon /> },
    { type: 'circle', label: '원형', icon: <CircleIcon /> },
    { type: 'line', label: '선', icon: <LineIcon /> },
];

export const ShapesToolbar = ({ onAddShape }: ShapesToolbarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <ToolbarWrapper>
            <ToolbarHeader onClick={() => setIsCollapsed(!isCollapsed)}>
                <ToolbarTitle>도형 추가</ToolbarTitle>
                <ToggleIcon $isCollapsed={isCollapsed}>
                    <ChevronIcon />
                </ToggleIcon>
            </ToolbarHeader>
            <ToolbarContent $isCollapsed={isCollapsed}>
                <ToolbarGrid>
                    {shapes.map((shape) => (
                        <ToolButton key={shape.type} onClick={() => onAddShape(shape.type)} title={shape.label}>
                            <ToolIcon>{shape.icon}</ToolIcon>
                            <ToolLabel>{shape.label}</ToolLabel>
                        </ToolButton>
                    ))}
                </ToolbarGrid>
            </ToolbarContent>
        </ToolbarWrapper>
    );
};
