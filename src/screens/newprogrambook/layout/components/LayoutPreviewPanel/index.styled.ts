import styled from 'styled-components';

export const LayoutSection = styled.div`
    margin-bottom: 40px;
`;

export const LayoutTitle = styled.h2`
    font-family: 'Plus Jakarta Sans', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    font-weight: bold;
    font-size: 22px;
    margin: 0 0 20px 0;
    color: #222;
`;

export const LayoutInfo = styled.div`
    margin-bottom: 16px;
    padding: 12px 16px;
    background: #f8f8f8;
    border-radius: 8px;
    border-left: 4px solid #a14d4d;
`;

export const LayoutName = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #222;
    margin: 0 0 4px 0;
`;

export const LayoutDescription = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.4;
`;

export const LayoutPreview = styled.div`
    width: 100%;
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

export const PreviewContent = styled.div`
    width: 100%;
    height: 800px;
    background: #f0f0f0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 16px;
    text-align: center;
    line-height: 1.6;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const LayoutButton = styled.button<{ disabled?: boolean }>`
    background: white;
    color: #222;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 24px;
    font-weight: 500;
    font-size: 14px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: all 0.2s;

    &:hover {
        background: ${({ disabled }) => (disabled ? 'white' : '#f5f5f5')};
        border-color: ${({ disabled }) => (disabled ? '#ddd' : '#bbb')};
    }
`;
