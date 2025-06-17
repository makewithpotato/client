import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContent = styled.div<{ width?: string; height?: string }>`
    background: white;
    border-radius: 12px;
    padding: 24px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    width: ${({ width }) => width || '400px'};
    height: ${({ height }) => height || 'auto'};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #666;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
        background: #f0f0f0;
        color: #333;
    }
`;
