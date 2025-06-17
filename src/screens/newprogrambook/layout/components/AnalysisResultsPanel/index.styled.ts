import styled from 'styled-components';

export const ResultsWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const ResultsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
`;

export const ResultItem = styled.div`
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ResultTitle = styled.h3`
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin: 0 0 8px 0;
`;

export const ResultContent = styled.p`
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    margin: 0;
`;
