import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
`;

export const LeftPanel = styled.div`
    width: 300px;
    background-color: white;
    border-right: 1px solid ${({ theme }) => theme.colors.gray300};
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 0;
`;

export const LeftPanelHeader = styled.div`
    flex-shrink: 0;
    background-color: white;
    z-index: 10;
`;

export const LeftPanelContent = styled.div`
    flex: 1;
    overflow-y: auto;
`;

export const RightPanel = styled.div`
    width: 300px;
    background-color: white;
    border-left: 1px solid ${({ theme }) => theme.colors.gray300};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex-shrink: 0;
`;

export const CanvasArea = styled.div`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.gray100};
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding: 40px;
    gap: 40px;
`;

export const A4Canvas = styled.div`
    width: 595px; // A4 width at 72 DPI
    height: 842px; // A4 height at 72 DPI
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
`;

export const Controls = styled.div`
    height: 60px;
    background-color: white;
    border-top: 1px solid ${({ theme }) => theme.colors.gray300};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    flex-shrink: 0;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 500;

    ${({ theme, variant }) =>
        variant === 'primary'
            ? `
        background-color: ${theme.colors.primary};
        color: white;
        &:hover {
            background-color: ${theme.colors.secondary};
        }
    `
            : `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.text};
        &:hover {
            background-color: ${theme.colors.gray300};
        }
    `}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const MovieTabList = styled.div`
    display: flex;
    overflow-x: auto;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    background: ${({ theme }) => theme.colors.gray100};
    min-height: 44px;
    flex-shrink: 0;

    &::-webkit-scrollbar {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gray300};
        border-radius: 2px;
    }
`;

export const MovieTab = styled.button<{ isActive: boolean }>`
    padding: 12px 16px;
    border: none;
    background: ${({ isActive }) => (isActive ? 'white' : 'transparent')};
    color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.text)};
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    border-bottom: 2px solid ${({ isActive, theme }) => (isActive ? theme.colors.primary : 'transparent')};
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        background: white;
    }
`;

export const PageControls = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

export const PageLabel = styled.div`
    position: absolute;
    top: -25px;
    left: 0;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray500};
`;
