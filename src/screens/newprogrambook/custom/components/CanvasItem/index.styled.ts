import styled from 'styled-components';

// Use shouldForwardProp to prevent isSelected from being passed to the DOM
export const ItemWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>`
    position: absolute;
    cursor: move;
    border: 1px solid ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'transparent')};
    box-sizing: border-box;
    border-radius: 4px;

    &:hover {
        border: 1px dashed ${({ theme }) => theme.colors.gray500};
    }

    .react-resizable-handle {
        position: absolute;
        width: 10px;
        height: 10px;
        bottom: 0;
        right: 0;
        cursor: se-resize;
        background-color: ${({ theme }) => theme.colors.primary};
        display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
        z-index: 10;
        border-radius: 2px;
    }
`;

export const ItemContent = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
    word-break: break-word;
    padding: 4px;
    box-sizing: border-box;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
        border-radius: inherit;
    }

    svg {
        display: block;
    }
`;

export const DeleteButton = styled.button`
    position: absolute;
    top: -24px;
    right: 0;
    background: ${({ theme }) => theme.colors.error};
    color: white;
    border: none;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 12px;
    cursor: pointer;
    z-index: 20;
`;
