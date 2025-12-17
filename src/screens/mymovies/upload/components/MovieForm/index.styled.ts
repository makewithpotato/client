import styled from 'styled-components';

export const Form = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const FullWidthGroup = styled(FormGroup)`
    grid-column: span 2;

    @media (max-width: 768px) {
        grid-column: span 1;
    }
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
`;

export const HelperText = styled.p`
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Input = styled.input`
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.2s ease;
    background-color: ${({ theme }) => theme.colors.white};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

export const DynamicInput = styled(Input)`
    flex: 1;
`;

export const Select = styled.select`
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.2s ease;
    background-color: ${({ theme }) => theme.colors.white};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

export const DynamicFieldList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const DynamicFieldRow = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const ActionButton = styled.button`
    padding: 10px 14px;
    border-radius: 6px;
    border: 1px solid transparent;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const RemoveButton = styled(ActionButton)`
    background-color: ${({ theme }) => theme.colors.gray100};
    border-color: ${({ theme }) => theme.colors.gray300};
    color: ${({ theme }) => theme.colors.text};

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.gray300};
    }
`;

export const AddButton = styled(ActionButton)`
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    align-self: flex-start;

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.secondaryHover};
        border-color: ${({ theme }) => theme.colors.secondaryHover};
    }
`;

export const EmptyStateText = styled.p`
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray500};
`;
