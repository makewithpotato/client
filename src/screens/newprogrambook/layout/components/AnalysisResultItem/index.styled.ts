import styled from 'styled-components';

export const ResultItem = styled.div`
    background: white;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
`;

export const ResultHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: rgba(161, 77, 77, 0.05);
    }
`;

export const ResultLabel = styled.span`
    font-size: 16px;
    color: #222;
    font-weight: 500;
`;

export const ExpandIcon = styled.span<{ expanded: boolean }>`
    color: #999;
    font-size: 14px;
    transition: transform 0.2s ease;
    transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const ResultContent = styled.div<{ expanded: boolean }>`
    padding: ${({ expanded }) => (expanded ? '0 20px 20px 20px' : '0')};
    max-height: ${({ expanded }) => (expanded ? '300px' : '0')};
    overflow: hidden;
    transition: all 0.3s ease;
    border-top: ${({ expanded }) => (expanded ? '1px solid #f0f0f0' : 'none')};
`;

export const ResultText = styled.p`
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin: 12px 0 0 0;
`;

export const DragIcon = styled.span`
    color: #999;
    font-size: 16px;
    cursor: grab;
    margin-left: 8px;
`;
