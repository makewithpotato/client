import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
    width: 80%;
    margin: 32px 0 24px 0;
`;

export const Input = styled.input`
    width: 100%;
    padding: 14px 20px;
    border-radius: 8px;
    border: none;
    background: #f5eaea;
    font-size: 16px;
    color: #a08b8b;
    outline: none;
    &::placeholder {
        color: #a08b8b;
        opacity: 1;
    }
`;
