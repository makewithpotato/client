import styled from 'styled-components';

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
    padding: 8px 12px;
    border: 1px solid ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.gray300)};
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : 'transparent')};
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.white : theme.colors.gray700)};
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.gray100)};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const PageDots = styled.span`
    color: ${({ theme }) => theme.colors.gray500};
    user-select: none;
`;
