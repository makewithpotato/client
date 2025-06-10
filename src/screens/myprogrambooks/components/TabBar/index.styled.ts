import styled from 'styled-components';

export const TabBarWrapper = styled.div`
    display: flex;
    gap: 32px;
    margin-bottom: 16px;
`;

export const Tab = styled.button<{ active?: boolean }>`
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    color: ${({ active }) => (active ? '#a14d4d' : '#222')};
    border-bottom: 2px solid ${({ active }) => (active ? '#a14d4d' : 'transparent')};
    padding: 8px 0;
    cursor: pointer;
    transition:
        color 0.2s,
        border-color 0.2s;
`;
