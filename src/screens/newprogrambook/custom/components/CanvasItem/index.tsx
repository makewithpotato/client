import React, { type SyntheticEvent, useRef, useState, useEffect } from 'react';
import Draggable, { type DraggableEvent, type DraggableData } from 'react-draggable';
import { Resizable, type ResizeCallbackData } from 'react-resizable';
import { ItemWrapper, ItemContent, DeleteButton } from './index.styled';

export interface CanvasItemData {
    id: string;
    type: 'text' | 'image' | 'retrieval' | 'textbox' | 'rectangle' | 'circle' | 'line';
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    originalId: string;
    title: string;
    // Style properties
    backgroundColor?: string;
    fontSize?: number;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontFamily?: string;
    // Border properties
    borderRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    // Transform properties
    rotation?: number; // degrees (0-360)
    // Line specific properties
    lineThickness?: number; // Line thickness in pixels (only for line type)
}

interface CanvasItemProps {
    item: CanvasItemData;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onUpdate: (id: string, data: Partial<CanvasItemData>) => void;
    onDelete: (id: string) => void;
    scale?: number;
}

export const CanvasItem = ({ item, isSelected, onSelect, onUpdate, onDelete, scale = 1 }: CanvasItemProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    // Local state for smooth dragging/resizing
    const [position, setPosition] = useState({ x: item.x, y: item.y });
    const [size, setSize] = useState({ width: item.width, height: item.height });

    // 이미지 변환은 AnalysisResultsPanel에서 캐싱 시 처리됨
    // 여기서는 item.content를 그대로 사용 (Base64 또는 원본 URL)

    // Sync local state when props change (e.g. via properties panel)
    useEffect(() => {
        setPosition({ x: item.x, y: item.y });
    }, [item.x, item.y]);

    useEffect(() => {
        if (item.type === 'line') {
            // For lines, height is always lineThickness
            setSize({ width: item.width, height: item.lineThickness || 4 });
        } else {
            setSize({ width: item.width, height: item.height });
        }
    }, [item.width, item.height, item.type, item.lineThickness]);

    const handleDrag = (_: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleDragStop = (_: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
        onUpdate(item.id, { x: data.x, y: data.y });
    };

    const handleResize = (_: SyntheticEvent, data: ResizeCallbackData) => {
        if (item.type === 'line') {
            // For lines, only allow width resizing, keep height fixed to lineThickness
            setSize({ width: data.size.width, height: item.lineThickness || 4 });
        } else {
            setSize({ width: data.size.width, height: data.size.height });
        }
    };

    const handleResizeStop = (_: SyntheticEvent, data: ResizeCallbackData) => {
        if (item.type === 'line') {
            // For lines, only update width, height stays as lineThickness
            setSize({ width: data.size.width, height: item.lineThickness || 4 });
            onUpdate(item.id, { width: data.size.width });
        } else {
            setSize({ width: data.size.width, height: data.size.height });
            onUpdate(item.id, { width: data.size.width, height: data.size.height });
        }
    };

    // Stop propagation on resize handles to prevent dragging while resizing
    const onResizeStart = (e: React.SyntheticEvent) => {
        e.stopPropagation();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(item.id);
    };

    // 도형 및 콘텐츠 렌더링 함수
    const renderItemContent = () => {
        switch (item.type) {
            case 'image':
            case 'retrieval':
                return <img src={item.content} alt={item.title} />;

            case 'textbox':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <p style={{ margin: 0 }}>{item.content || 'Text'}</p>
                    </div>
                );

            case 'rectangle':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: item.backgroundColor || '#e0e0e0',
                            borderRadius: item.borderRadius ? `${item.borderRadius}px` : '4px',
                        }}
                    />
                );

            case 'circle':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: item.backgroundColor || '#e0e0e0',
                            borderRadius: '50%',
                        }}
                    />
                );

            case 'line':
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: item.backgroundColor || '#000000',
                        }}
                    />
                );

            case 'text':
            default:
                return (
                    <div>
                        {/* prompt 아이템은 질문(title)을 숨기고 결과(content)만 표시 */}
                        {!item.originalId.startsWith('prompt-') && <strong>{item.title}</strong>}
                        <p>{item.content}</p>
                    </div>
                );
        }
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            position={position}
            onDrag={handleDrag}
            onStop={handleDragStop}
            onStart={() => onSelect(item.id)}
            scale={scale}
            bounds="parent"
            cancel=".react-resizable-handle" // Prevents dragging when clicking resize handle
        >
            <div
                ref={nodeRef}
                style={{
                    position: 'absolute',
                    zIndex: item.zIndex,
                }}
                onMouseDown={handleMouseDown}
                // Explicitly handle click to ensure selection works even after customization
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item.id);
                }}
            >
                <div
                    style={{
                        transform: item.rotation ? `rotate(${item.rotation}deg)` : undefined,
                        transformOrigin: 'center center',
                    }}
                >
                    <Resizable
                        width={size.width}
                        height={size.height}
                        onResize={handleResize}
                        onResizeStop={handleResizeStop}
                        onResizeStart={onResizeStart} // Stop propagation here
                        resizeHandles={['se']}
                        draggableOpts={{ enableUserSelectHack: false }}
                    >
                        <ItemWrapper
                            isSelected={isSelected}
                            style={{
                                width: size.width,
                                height: size.height,
                                backgroundColor:
                                    item.type === 'circle' ? 'transparent' : item.backgroundColor || 'transparent',
                                borderRadius: item.borderRadius ? `${item.borderRadius}px` : '4px',
                                border: item.borderWidth
                                    ? `${item.borderWidth}px solid ${item.borderColor || '#000'}`
                                    : undefined,
                            }}
                        >
                            {isSelected && (
                                <DeleteButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(item.id);
                                    }}
                                >
                                    Delete
                                </DeleteButton>
                            )}
                            <ItemContent
                                style={{
                                    fontSize: item.fontSize ? `${item.fontSize}px` : '14px',
                                    color: item.color || 'inherit',
                                    textAlign: item.textAlign || 'left',
                                    fontFamily: item.fontFamily || 'inherit',
                                }}
                            >
                                {renderItemContent()}
                            </ItemContent>
                        </ItemWrapper>
                    </Resizable>
                </div>
            </div>
        </Draggable>
    );
};
