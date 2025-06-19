import styled from 'styled-components';

export const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #495057;
`;

export const Input = styled.input`
    padding: 12px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 14px;
    color: #212529;
    transition: border-color 0.2s ease;

    &:focus {
        outline: none;
        border-color: #4dabf7;
    }
`;

export const Select = styled.select`
    padding: 12px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 14px;
    color: #212529;
    transition: border-color 0.2s ease;

    &:focus {
        outline: none;
        border-color: #4dabf7;
    }
`;
