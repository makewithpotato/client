import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.div`
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
`;

export const BackButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        opacity: 0.9;
    }
`;

export const PDFViewer = styled.iframe`
    width: 100%;
    height: calc(100vh - 200px);
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
