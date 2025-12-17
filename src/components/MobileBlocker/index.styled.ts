import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 16px;
`;

export const Message = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
`;
