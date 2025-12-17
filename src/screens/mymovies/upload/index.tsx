import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@/components';
import type { MovieFormData } from './type';
import { INITIAL_FORM_DATA } from './type';
import { MovieForm } from './components';
import { useMovieUpload } from '@/hooks/useMovieUpload';
import {
    Wrapper,
    Content,
    Title,
    UploadArea,
    UploadText,
    SubText,
    SelectButton,
    FileInput,
    SupportedText,
    MoviePreview,
    PreviewHeader,
    VideoPreview,
    NextButtonWrapper,
    NextButton,
} from './index.styled';

type CustomFieldKey = 'customPrompts' | 'customRetrievals';

const cloneInitialFormData = (): MovieFormData => ({
    ...INITIAL_FORM_DATA,
    customPrompts: [...INITIAL_FORM_DATA.customPrompts],
    customRetrievals: [...INITIAL_FORM_DATA.customRetrievals],
});

const sanitizeCustomValues = (values: string[]) =>
    values.map((value) => value.trim()).filter((value) => value.length > 0);

export const MovieUploadScreen = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<MovieFormData>(cloneInitialFormData);
    const [videoUrl, setVideoUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { startUploadInBackground, isLoading, error } = useMovieUpload();

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isLoading) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isLoading]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        // 파일 크기 체크 (5GB)
        const maxSize = 5 * 1024 * 1024 * 1024; // 5GB in bytes
        if (file.size > maxSize) {
            alert('File size exceeds 5GB limit');
            return;
        }

        if (file.type.startsWith('video/')) {
            setUploadedFile(file);
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
        } else {
            alert('Please upload a video file');
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const files = event.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateCustomField = (key: CustomFieldKey, updater: (current: string[]) => string[]) => {
        setFormData((prev) => ({
            ...prev,
            [key]: updater(prev[key]),
        }));
    };

    const handleCustomPromptChange = (index: number, value: string) => {
        updateCustomField('customPrompts', (current) => {
            const next = [...current];
            next[index] = value;
            return next;
        });
    };

    const handleAddCustomPrompt = () => {
        updateCustomField('customPrompts', (current) => [...current, '']);
    };

    const handleRemoveCustomPrompt = (index: number) => {
        updateCustomField('customPrompts', (current) => current.filter((_, idx) => idx !== index));
    };

    const handleCustomRetrievalChange = (index: number, value: string) => {
        updateCustomField('customRetrievals', (current) => {
            const next = [...current];
            next[index] = value;
            return next;
        });
    };

    const handleAddCustomRetrieval = () => {
        updateCustomField('customRetrievals', (current) => [...current, '']);
    };

    const handleRemoveCustomRetrieval = (index: number) => {
        updateCustomField('customRetrievals', (current) => current.filter((_, idx) => idx !== index));
    };

    const handleNext = async () => {
        if (
            uploadedFile &&
            formData.title &&
            formData.director &&
            formData.genre &&
            formData.releaseDate &&
            formData.cast
        ) {
            try {
                const customPrompts = sanitizeCustomValues(formData.customPrompts);
                const customRetrievals = sanitizeCustomValues(formData.customRetrievals);

                const result = await startUploadInBackground({
                    title: formData.title,
                    director: formData.director,
                    genre: formData.genre,
                    releaseDate: formData.releaseDate,
                    actor: formData.cast,
                    file: uploadedFile,
                    customPrompts: customPrompts.length ? customPrompts : undefined,
                    customRetrievals: customRetrievals.length ? customRetrievals : undefined,
                });
                if (!result.success) throw new Error(error || '업로드에 실패했습니다.');
                navigate('/mymovies/list');
            } catch (err) {
                alert(err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다.');
            }
        } else {
            alert('Please fill in all required fields');
        }
    };

    return (
        <Wrapper>
            <TopBar />
            <Content>
                <Title>Upload your video</Title>
                {!uploadedFile ? (
                    <UploadArea
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        isDragging={isDragging}
                    >
                        <UploadText>Drag and drop your file here</UploadText>
                        <SubText>Or, click to select a file from your computer</SubText>
                        <SelectButton>
                            Select File
                            <FileInput ref={fileInputRef} type="file" onChange={handleFileSelect} accept="video/*" />
                        </SelectButton>
                        <SupportedText>Supported file types: MP4, MOV, AVI, MKV. Maximum file size: 5GB</SupportedText>
                    </UploadArea>
                ) : (
                    <MoviePreview>
                        <PreviewHeader>
                            <VideoPreview src={videoUrl} controls />
                            <MovieForm
                                formData={formData}
                                onChange={handleInputChange}
                                onCustomPromptChange={handleCustomPromptChange}
                                onAddCustomPrompt={handleAddCustomPrompt}
                                onRemoveCustomPrompt={handleRemoveCustomPrompt}
                                onCustomRetrievalChange={handleCustomRetrievalChange}
                                onAddCustomRetrieval={handleAddCustomRetrieval}
                                onRemoveCustomRetrieval={handleRemoveCustomRetrieval}
                            />
                        </PreviewHeader>
                    </MoviePreview>
                )}
            </Content>
            <NextButtonWrapper>
                <NextButton
                    disabled={
                        !uploadedFile ||
                        !formData.title ||
                        !formData.director ||
                        !formData.genre ||
                        !formData.releaseDate ||
                        !formData.cast ||
                        formData.customPrompts.every((prompt) => prompt.trim() === '') ||
                        formData.customRetrievals.every((retrieval) => retrieval.trim() === '') ||
                        isLoading
                    }
                    onClick={handleNext}
                >
                    {isLoading ? 'Uploading...' : 'Next'}
                </NextButton>
            </NextButtonWrapper>
        </Wrapper>
    );
};
