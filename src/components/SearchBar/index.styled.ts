import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
    width: 100%;
    margin: 32px 0 24px 0;
    position: relative;
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

export const SearchIcon = styled.div`
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #a08b8b;
    font-size: 18px;
`;
