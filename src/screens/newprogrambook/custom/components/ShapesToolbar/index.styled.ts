import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    background: ${({ theme }) => theme.colors.gray100};
`;

export const ToolbarHeader = styled.button`
    width: 100%;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        background: #e8e8e8;
    }
`;

export const ToolbarTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray700};
    margin: 0;
`;

export const ToggleIcon = styled.span<{ $isCollapsed: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
    transform: ${({ $isCollapsed }) => ($isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)')};
    color: ${({ theme }) => theme.colors.gray500};
`;

export const ToolbarContent = styled.div<{ $isCollapsed: boolean }>`
    padding: ${({ $isCollapsed }) => ($isCollapsed ? '0 16px' : '0 16px 16px 16px')};
    max-height: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '200px')};
    overflow: hidden;
    transition: all 0.2s ease;
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '1')};
`;

export const ToolbarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
`;

export const ToolButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 6px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.gray100};
        border-color: ${({ theme }) => theme.colors.primary};
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const ToolIcon = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.gray700};
`;

export const ToolLabel = styled.span`
    font-size: 9px;
    color: ${({ theme }) => theme.colors.gray500};
`;
