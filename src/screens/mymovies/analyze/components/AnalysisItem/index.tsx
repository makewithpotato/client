import React from 'react';
import { Wrapper, Label, Content, EditButton, ImageGrid, ImageContainer, Image } from './index.styled';

interface Props {
    label: string;
    content?: string | string[];
    onEdit: () => void;
}

export const AnalysisItem: React.FC<Props> = ({ label, content, onEdit }) => {
    const renderContent = () => {
        if (!content) {
            return <Content>-</Content>;
        }
        if (label === 'Gallery' && Array.isArray(content)) {
            return (
                <ImageGrid>
                    {content.map((imageUrl, index) => (
                        <ImageContainer key={index}>
                            <Image src={imageUrl} alt={`Movie image ${index + 1}`} />
                        </ImageContainer>
                    ))}
                </ImageGrid>
            );
        }
        return <Content>{typeof content === 'string' ? content : content.join(', ')}</Content>;
    };

    return (
        <Wrapper>
            <Label>
                {label}
                <EditButton onClick={onEdit}>Edit</EditButton>
            </Label>
            {renderContent()}
        </Wrapper>
    );
};
