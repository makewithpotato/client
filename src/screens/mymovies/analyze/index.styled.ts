import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f8f9fa;
    padding-bottom: 60px;
`;

export const Content = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const Header = styled.div`
    margin-bottom: 32px;
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 600;
    color: #1c0d0d;
    margin: 0 0 8px 0;
`;

export const MovieInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #495057;
    font-size: 16px;
`;

export const Divider = styled.span`
    color: #adb5bd;
`;

export const Section = styled.div`
    margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
    font-size: 24px;
    font-weight: 500;
    color: #1c0d0d;
    margin: 0 0 20px 0;
`;

export const SaveButton = styled.button`
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 12px 32px;
    background: #f2e8e8;
    border: none;
    border-radius: 6px;
    color: #1c0d0d;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        background: #ebe0e0;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
`;
