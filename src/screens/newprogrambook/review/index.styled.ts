import styled from '@emotion/styled';

export const Wrapper = styled.div`
    min-height: 100vh;
    background: #f8f9fa;
`;

export const Section = styled.section`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #111;
`;

export const Description = styled.p`
    font-size: 16px;
    color: #666;
    margin: 0 0 40px 0;
`;

export const Container = styled.div`
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    height: 800px;
    margin-bottom: 24px;
`;

export const DownloadButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 24px;
    background: #e11d48;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #be123c;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;
