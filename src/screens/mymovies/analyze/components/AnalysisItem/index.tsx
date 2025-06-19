import React from 'react';
import { ItemWrapper, ItemHeader, Label, Content, EditButton } from './index.styled';

interface AnalysisItemProps {
    label: string;
    content: string;
    onEdit?: () => void;
    editable?: boolean;
}

export const AnalysisItem: React.FC<AnalysisItemProps> = ({ label, content, onEdit, editable = true }) => {
    return (
        <ItemWrapper>
            <ItemHeader>
                <Label>{label}</Label>
                {editable && onEdit && <EditButton onClick={onEdit}>Edit</EditButton>}
            </ItemHeader>
            <Content>{content}</Content>
        </ItemWrapper>
    );
};
