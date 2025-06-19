import styled from 'styled-components';

export const Button = styled.button`
    width: 100%;
    padding: 0.875rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.pretendard};
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondaryHover};
    }
`;
