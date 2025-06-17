import styled from 'styled-components';

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 48px 0 32px 0;
    gap: 8px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
    background: none;
    border: none;
    color: ${({ active }) => (active ? '#a14d4d' : '#a08b8b')};
    border-radius: 4px;
    min-width: 32px;
    height: 32px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
        color: #a14d4d;
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const PageDots = styled.span`
    color: #a08b8b;
    padding: 0 4px;
`;
