import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
    width: 100%;
    margin: 32px 0 24px 0;
    position: relative;
`;

export const Input = styled.input`
    width: 100%;
    padding: 14px 16px;
    border-radius: 8px;
    border: none;
    background: #f5eaea;
    font-size: 16px;
    font-family: ${({ theme }) => theme.fonts.pretendard};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    box-sizing: border-box;

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray500};
        opacity: 1;
    }

    &:focus {
        background: #f0e5e5;
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
