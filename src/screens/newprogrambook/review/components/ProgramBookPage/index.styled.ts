import styled from 'styled-components';

export const PageWrapper = styled.div`
    width: 50%;
    height: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin: 0 8px;

    @media print {
        width: 100%;
        height: auto;
        min-height: 100vh;
        page-break-after: always;
        box-shadow: none;
        border-radius: 0;
        margin: 0;
    }
`;

export const PageContent = styled.div`
    padding: 30px;
    height: 100%;
    position: relative;
    overflow: hidden;

    @media print {
        padding: 40px;
        height: auto;
        min-height: calc(100vh - 80px);
    }
`;

export const MovieSection = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-start;

    @media print {
        gap: 30px;
    }
`;

export const MovieImage = styled.img`
    width: 180px;
    height: 240px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    @media print {
        width: 280px;
        height: 380px;
        border-radius: 8px;
    }
`;

export const MovieTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 6px 0;
    color: white;

    @media print {
        font-size: 32px;
        margin: 0 0 8px 0;
    }
`;

export const AnalysisContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media print {
        gap: 16px;
    }
`;

export const AnalysisItem = styled.div`
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 8px;

    &:last-child {
        border-bottom: none;
    }

    @media print {
        padding-bottom: 12px;
    }
`;

export const AnalysisLabel = styled.div`
    font-weight: bold;
    color: #4caf50;
    font-size: 12px;
    margin-bottom: 4px;

    @media print {
        font-size: 14px;
        margin-bottom: 6px;
    }
`;

export const AnalysisText = styled.div`
    font-size: 12px;
    line-height: 1.4;
    color: #333;

    @media print {
        font-size: 14px;
        line-height: 1.6;
    }
`;
