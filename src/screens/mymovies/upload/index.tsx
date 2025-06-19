import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@/components';
import type { MovieFormData } from './type';
import { INITIAL_FORM_DATA } from './type';
import { MovieForm, LoadingScreen } from './components';
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

export const MovieUploadScreen = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<MovieFormData>(INITIAL_FORM_DATA);
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isUploading) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isUploading]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
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

    const simulateUpload = () => {
        setIsUploading(true);
        let progress = 0;

        const interval = setInterval(() => {
            progress += 5;
            setUploadProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsUploading(false);
                    navigate('/mymovies/list');
                }, 500);
            }
        }, 200);
    };

    const handleNext = () => {
        if (
            uploadedFile &&
            formData.title &&
            formData.director &&
            formData.genre &&
            formData.releaseDate &&
            formData.cast
        ) {
            // TODO: Replace with actual upload logic
            simulateUpload();
        } else {
            alert('Please fill in all required fields');
        }
    };

    if (isUploading) {
        return <LoadingScreen progress={uploadProgress} />;
    }

    return (
        <Wrapper>
            <TopBar />
            <Content>
                <Title>Upload your movie</Title>
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
                            <MovieForm formData={formData} onChange={handleInputChange} />
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
                        !formData.cast
                    }
                    onClick={handleNext}
                >
                    Next
                </NextButton>
            </NextButtonWrapper>
        </Wrapper>
    );
};
