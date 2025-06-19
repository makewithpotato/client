import styled from 'styled-components';

export const Container = styled.p`
    font-family: ${({ theme }) => theme.fonts.pretendard};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
    margin: 0;
`;

export const Link = styled.a`
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;
