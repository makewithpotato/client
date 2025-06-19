import styled from 'styled-components';

export const ItemWrapper = styled.div`
    padding: 20px;
    background: white;
    border-radius: 12px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const Label = styled.h3`
    font-size: 16px;
    font-weight: 500;
    color: #1c0d0d;
    margin: 0;
`;

export const Content = styled.div`
    font-size: 14px;
    color: #495057;
    line-height: 1.5;
    white-space: pre-wrap;
`;

export const EditButton = styled.button`
    padding: 6px 12px;
    background: #f2e8e8;
    border: none;
    border-radius: 6px;
    color: #1c0d0d;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #ebe0e0;
    }
`;
