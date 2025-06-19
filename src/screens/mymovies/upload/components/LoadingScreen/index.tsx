import React from 'react';
import { LoadingWrapper, LoadingTitle, ProgressBarContainer, ProgressBar, LoadingText } from './index.styled';

interface LoadingScreenProps {
    progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
    return (
        <LoadingWrapper>
            <LoadingTitle>Upload your movies</LoadingTitle>
            <ProgressBarContainer>
                <ProgressBar progress={progress} />
            </ProgressBarContainer>
            <LoadingText>
                Our system is currently uploading your movies. This process may take a few minutes. Please do not close
                or refresh this page.
            </LoadingText>
            <LoadingText>{progress}%</LoadingText>
        </LoadingWrapper>
    );
};
