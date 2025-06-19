import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const LoginContainer = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

export const Title = styled.h1`
    font-family: ${({ theme }) => theme.fonts.pretendard};
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
`;

export const Subtitle = styled.p`
    font-family: ${({ theme }) => theme.fonts.pretendard};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
`;

export const SocialButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
