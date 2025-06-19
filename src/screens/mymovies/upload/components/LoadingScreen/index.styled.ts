import styled from 'styled-components';

export const LoadingWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const LoadingTitle = styled.h2`
    font-size: 32px;
    font-weight: 600;
    color: #212529;
    margin-bottom: 24px;
`;

export const ProgressBarContainer = styled.div`
    width: 80%;
    max-width: 600px;
    height: 8px;
    background-color: #dee2e6;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 16px;
`;

export const ProgressBar = styled.div<{ progress: number }>`
    width: ${(props) => props.progress}%;
    height: 100%;
    background-color: #fd7e14;
    transition: width 0.3s ease;
`;

export const LoadingText = styled.p`
    font-size: 16px;
    color: #6c757d;
    text-align: center;
    max-width: 600px;
    line-height: 1.5;
`;
