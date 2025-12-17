import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.div`
    flex: 1;
    padding: 1.5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-shrink: 0;
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
`;

export const BackButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray500};
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        opacity: 0.9;
    }
`;

export const DownloadButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const PDFViewer = styled.iframe`
    width: 100%;
    flex: 1;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.div`
    color: ${({ theme }) => theme.colors.error};
    text-align: center;
    margin-top: 2rem;
    font-size: 1.2rem;
`;

export const LoadingMessage = styled.div`
    text-align: center;
    margin-top: 2rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
`;
