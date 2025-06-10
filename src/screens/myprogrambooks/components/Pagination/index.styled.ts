import styled from 'styled-components';

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32px 0 0 0;
    gap: 8px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
    background: none;
    border: none;
    color: ${({ active }) => (active ? '#fff' : '#a08b8b')};
    background-color: ${({ active }) => (active ? '#a14d4d' : 'transparent')};
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition:
        background 0.2s,
        color 0.2s;
`;
