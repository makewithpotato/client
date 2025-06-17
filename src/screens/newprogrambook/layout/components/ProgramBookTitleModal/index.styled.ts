import styled from 'styled-components';

export const ModalTitle = styled.h2`
    font-family: 'Plus Jakarta Sans', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    font-weight: bold;
    font-size: 24px;
    margin: 0 0 24px 0;
    color: #222;
    text-align: center;
`;

export const Input = styled.input`
    width: 90%;
    padding: 16px;
    border: 2px solid #e5e5e5;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 24px;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #a14d4d;
    }

    &::placeholder {
        color: #999;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;

export const BaseButton = styled.button`
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 80px;
`;

export const CancelButton = styled(BaseButton)`
    background: white;
    color: #666;
    border: 1px solid #ddd;

    &:hover {
        background: #f5f5f5;
        border-color: #bbb;
    }
`;

export const SaveButton = styled(BaseButton)<{ disabled?: boolean }>`
    background: ${({ disabled }) => (disabled ? '#ccc' : '#a14d4d')};
    color: white;
    border: none;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        background: ${({ disabled }) => (disabled ? '#ccc' : '#8b3d3d')};
    }
`;
