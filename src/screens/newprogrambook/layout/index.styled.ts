import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 100vh;
    background-color: #f8f8f8;
    padding-bottom: 100px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1600px;
    margin: 0 auto;
    margin-top: 50px;
`;

export const MovieSelectionSection = styled.div`
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const MovieCardsWrapper = styled.div`
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 8px 4px;
    margin-top: 16px;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #ccc;
    }
`;

export const PanelsSection = styled.div`
    display: flex;
    gap: 24px;
    flex: 1;
`;

export const LeftPanel = styled.div`
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
`;

export const RightPanel = styled.div`
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
`;

export const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #1c0d0d;
    margin: 0 0 16px 0;
`;

export const SaveButton = styled.button`
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 24px;

    &:hover {
        background: #0056b3;
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;
