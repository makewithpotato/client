import React from 'react';
import type { MovieFormData } from '../../type';
import { GENRES } from '../../type';
import {
    Form,
    FormGroup,
    FullWidthGroup,
    Label,
    HelperText,
    Input,
    DynamicInput,
    Select,
    DynamicFieldList,
    DynamicFieldRow,
    RemoveButton,
    AddButton,
    EmptyStateText,
} from './index.styled';

interface MovieFormProps {
    formData: MovieFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onCustomPromptChange: (index: number, value: string) => void;
    onAddCustomPrompt: () => void;
    onRemoveCustomPrompt: (index: number) => void;
    onCustomRetrievalChange: (index: number, value: string) => void;
    onAddCustomRetrieval: () => void;
    onRemoveCustomRetrieval: (index: number) => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({
    formData,
    onChange,
    onCustomPromptChange,
    onAddCustomPrompt,
    onRemoveCustomPrompt,
    onCustomRetrievalChange,
    onAddCustomRetrieval,
    onRemoveCustomRetrieval,
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Video Title*</Label>
                <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    placeholder="Enter video title"
                />
            </FormGroup>
            <FormGroup>
                <Label>Director*</Label>
                <Input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={onChange}
                    placeholder="Enter director's name"
                />
            </FormGroup>
            <FormGroup>
                <Label>Genre*</Label>
                <Select name="genre" value={formData.genre} onChange={onChange}>
                    <option value="">Select a genre</option>
                    {GENRES.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </Select>
            </FormGroup>
            <FormGroup>
                <Label>Release Date*</Label>
                <Input type="date" name="releaseDate" value={formData.releaseDate} onChange={onChange} />
            </FormGroup>
            <FormGroup>
                <Label>Cast (Main Actors)*</Label>
                <Input
                    type="text"
                    name="cast"
                    value={formData.cast}
                    onChange={onChange}
                    placeholder="e.g., Tom Hanks, Morgan Freeman"
                />
            </FormGroup>
            <FullWidthGroup>
                <Label as="span">Custom Prompts*</Label>
                <HelperText>요약이나 분석에서 강조하고 싶은 항목을 입력하세요.</HelperText>
                <DynamicFieldList>
                    {formData.customPrompts.map((prompt, index) => (
                        <DynamicFieldRow key={`prompt-${index}`}>
                            <DynamicInput
                                type="text"
                                value={prompt}
                                placeholder="예: 200자 분량의 요약문"
                                onChange={(e) => onCustomPromptChange(index, e.target.value)}
                            />
                            <RemoveButton
                                type="button"
                                onClick={() => onRemoveCustomPrompt(index)}
                                aria-label={`프롬프트 ${index + 1} 삭제`}
                            >
                                삭제
                            </RemoveButton>
                        </DynamicFieldRow>
                    ))}
                    {formData.customPrompts.length === 0 && (
                        <EmptyStateText>추가된 프롬프트가 없습니다.</EmptyStateText>
                    )}
                </DynamicFieldList>
                <AddButton type="button" onClick={onAddCustomPrompt}>
                    + 프롬프트 추가
                </AddButton>
            </FullWidthGroup>
            <FullWidthGroup>
                <Label as="span">Custom Retrievals*</Label>
                <HelperText>영상에서 추출하고 싶은 구체적인 장면이나 상황을 입력하세요.</HelperText>
                <DynamicFieldList>
                    {formData.customRetrievals.map((retrieval, index) => (
                        <DynamicFieldRow key={`retrieval-${index}`}>
                            <DynamicInput
                                type="text"
                                value={retrieval}
                                placeholder="예: 치료를 받고 있는 모습"
                                onChange={(e) => onCustomRetrievalChange(index, e.target.value)}
                            />
                            <RemoveButton
                                type="button"
                                onClick={() => onRemoveCustomRetrieval(index)}
                                aria-label={`리트리벌 ${index + 1} 삭제`}
                            >
                                삭제
                            </RemoveButton>
                        </DynamicFieldRow>
                    ))}
                    {formData.customRetrievals.length === 0 && (
                        <EmptyStateText>추가된 리트리벌이 없습니다.</EmptyStateText>
                    )}
                </DynamicFieldList>
                <AddButton type="button" onClick={onAddCustomRetrieval}>
                    + 리트리벌 추가
                </AddButton>
            </FullWidthGroup>
        </Form>
    );
};
