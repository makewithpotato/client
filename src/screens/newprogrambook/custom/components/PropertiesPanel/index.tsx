import React from 'react';
import styled from 'styled-components';
import type { CanvasItemData } from '../CanvasItem';

const PanelWrapper = styled.div`
    width: 300px;
    height: 100%;
    max-height: calc(100vh - 120px);
    background: white;
    border-left: 1px solid ${({ theme }) => theme.colors.gray300};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    flex-shrink: 0;
    box-sizing: border-box;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SectionTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray700};
    margin: 0;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Label = styled.label`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray500};
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const TextArea = styled.textarea`
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
    min-height: 80px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const Select = styled.select`
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const ColorInput = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ColorPreview = styled.input`
    width: 32px;
    height: 32px;
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
`;

const LayerButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

const LayerButton = styled.button`
    flex: 1;
    min-width: 100px;
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${({ theme }) => theme.colors.gray100};
        border-color: ${({ theme }) => theme.colors.primary};
    }

    &:active {
        background: ${({ theme }) => theme.colors.gray300};
    }
`;

const ZIndexDisplay = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray500};
    text-align: center;
    padding: 4px 0;
`;

const RangeInput = styled.input`
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.gray300};
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.primary};
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.primary};
        cursor: pointer;
        border: none;
    }
`;

const RangeWithInput = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const SmallInput = styled.input`
    width: 60px;
    padding: 6px 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    font-size: 13px;
    text-align: center;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const RotationPresetButtons = styled.div`
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
`;

const PresetButton = styled.button`
    padding: 4px 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${({ theme }) => theme.colors.gray100};
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

interface PropertiesPanelProps {
    selectedItem: CanvasItemData | null;
    onUpdate: (id: string, data: Partial<CanvasItemData>) => void;
    onBringToFront?: (id: string) => void;
    onSendToBack?: (id: string) => void;
    onBringForward?: (id: string) => void;
    onSendBackward?: (id: string) => void;
}

export const PropertiesPanel = ({
    selectedItem,
    onUpdate,
    onBringToFront,
    onSendToBack,
    onBringForward,
    onSendBackward,
}: PropertiesPanelProps) => {
    // Stop propagation for all clicks inside the panel to prevent deselection
    const handlePanelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!selectedItem) {
        return (
            <PanelWrapper onClick={handlePanelClick}>
                <SectionTitle>Properties</SectionTitle>
                <p style={{ color: '#999', fontSize: '14px' }}>Select an item to edit properties</p>
            </PanelWrapper>
        );
    }

    const handleChange = (key: keyof CanvasItemData, value: any) => {
        onUpdate(selectedItem.id, { [key]: value });
    };

    return (
        <PanelWrapper onClick={handlePanelClick}>
            <SectionTitle>Properties</SectionTitle>

            <Section>
                <SectionTitle>Layout</SectionTitle>
                <FormGroup>
                    <Label>{selectedItem.type === 'line' ? 'Length (px)' : 'Width (px)'}</Label>
                    <Input
                        type="number"
                        value={Math.round(selectedItem.width)}
                        onChange={(e) => handleChange('width', Number(e.target.value))}
                    />
                </FormGroup>
                {selectedItem.type === 'line' ? (
                    <FormGroup>
                        <Label>Thickness (px)</Label>
                        <RangeWithInput>
                            <RangeInput
                                type="range"
                                min={1}
                                max={50}
                                value={selectedItem.lineThickness || 4}
                                onChange={(e) => handleChange('lineThickness', Number(e.target.value))}
                            />
                            <SmallInput
                                type="number"
                                min={1}
                                max={100}
                                value={selectedItem.lineThickness || 4}
                                onChange={(e) => handleChange('lineThickness', Number(e.target.value))}
                            />
                        </RangeWithInput>
                    </FormGroup>
                ) : (
                    <FormGroup>
                        <Label>Height (px)</Label>
                        <Input
                            type="number"
                            value={Math.round(selectedItem.height)}
                            onChange={(e) => handleChange('height', Number(e.target.value))}
                        />
                    </FormGroup>
                )}
            </Section>

            <Section>
                <SectionTitle>Transform</SectionTitle>
                <FormGroup>
                    <Label>Rotation ({selectedItem.rotation || 0}°)</Label>
                    <RangeWithInput>
                        <RangeInput
                            type="range"
                            min={0}
                            max={360}
                            value={selectedItem.rotation || 0}
                            onChange={(e) => handleChange('rotation', Number(e.target.value))}
                        />
                        <SmallInput
                            type="number"
                            min={0}
                            max={360}
                            value={selectedItem.rotation || 0}
                            onChange={(e) => handleChange('rotation', Number(e.target.value) % 360)}
                        />
                    </RangeWithInput>
                </FormGroup>
                <FormGroup>
                    <Label>Quick Rotate</Label>
                    <RotationPresetButtons>
                        <PresetButton onClick={() => handleChange('rotation', 0)}>0°</PresetButton>
                        <PresetButton onClick={() => handleChange('rotation', 45)}>45°</PresetButton>
                        <PresetButton onClick={() => handleChange('rotation', 90)}>90°</PresetButton>
                        <PresetButton onClick={() => handleChange('rotation', 135)}>135°</PresetButton>
                        <PresetButton onClick={() => handleChange('rotation', 180)}>180°</PresetButton>
                        <PresetButton onClick={() => handleChange('rotation', 270)}>270°</PresetButton>
                    </RotationPresetButtons>
                </FormGroup>
            </Section>

            <Section>
                <SectionTitle>Layer Order</SectionTitle>
                <ZIndexDisplay>Current Z-Index: {selectedItem.zIndex}</ZIndexDisplay>
                <LayerButtonGroup>
                    <LayerButton onClick={() => onBringToFront?.(selectedItem.id)}>Bring to Front</LayerButton>
                    <LayerButton onClick={() => onSendToBack?.(selectedItem.id)}>Send to Back</LayerButton>
                </LayerButtonGroup>
                <LayerButtonGroup>
                    <LayerButton onClick={() => onBringForward?.(selectedItem.id)}>Bring Forward</LayerButton>
                    <LayerButton onClick={() => onSendBackward?.(selectedItem.id)}>Send Backward</LayerButton>
                </LayerButtonGroup>
            </Section>

            <Section>
                <SectionTitle>Appearance</SectionTitle>
                <FormGroup>
                    <Label>{selectedItem.type === 'line' ? 'Color' : 'Background Color'}</Label>
                    <ColorInput>
                        <ColorPreview
                            type="color"
                            value={
                                selectedItem.backgroundColor || (selectedItem.type === 'line' ? '#000000' : '#ffffff')
                            }
                            onChange={(e) => handleChange('backgroundColor', e.target.value)}
                        />
                        <Input
                            type="text"
                            value={selectedItem.backgroundColor || ''}
                            placeholder={selectedItem.type === 'line' ? '#000000' : 'transparent'}
                            onChange={(e) => handleChange('backgroundColor', e.target.value)}
                        />
                    </ColorInput>
                </FormGroup>
                {selectedItem.type !== 'line' && (
                    <>
                        <FormGroup>
                            <Label>Border Radius (px)</Label>
                            <Input
                                type="number"
                                value={selectedItem.borderRadius || 4}
                                min={0}
                                onChange={(e) => handleChange('borderRadius', Number(e.target.value))}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Border Width (px)</Label>
                            <Input
                                type="number"
                                value={selectedItem.borderWidth || 0}
                                min={0}
                                onChange={(e) => handleChange('borderWidth', Number(e.target.value))}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Border Color</Label>
                            <ColorInput>
                                <ColorPreview
                                    type="color"
                                    value={selectedItem.borderColor || '#000000'}
                                    onChange={(e) => handleChange('borderColor', e.target.value)}
                                />
                                <Input
                                    type="text"
                                    value={selectedItem.borderColor || ''}
                                    placeholder="#000000"
                                    onChange={(e) => handleChange('borderColor', e.target.value)}
                                />
                            </ColorInput>
                        </FormGroup>
                    </>
                )}
            </Section>

            {(selectedItem.type === 'text' || selectedItem.type === 'textbox') && (
                <Section>
                    <SectionTitle>Text Style</SectionTitle>
                    <FormGroup>
                        <Label>Content</Label>
                        <TextArea
                            value={selectedItem.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Font Size (px)</Label>
                        <Input
                            type="number"
                            value={selectedItem.fontSize || 14}
                            onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Text Color</Label>
                        <ColorInput>
                            <ColorPreview
                                type="color"
                                value={selectedItem.color || '#000000'}
                                onChange={(e) => handleChange('color', e.target.value)}
                            />
                            <Input
                                type="text"
                                value={selectedItem.color || ''}
                                onChange={(e) => handleChange('color', e.target.value)}
                            />
                        </ColorInput>
                    </FormGroup>
                    <FormGroup>
                        <Label>Alignment</Label>
                        <Select
                            value={selectedItem.textAlign || 'left'}
                            onChange={(e) => handleChange('textAlign', e.target.value)}
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </Select>
                    </FormGroup>
                </Section>
            )}
        </PanelWrapper>
    );
};
