import styled from 'styled-components';

export const Wrapper = styled.div`
    background: #fcf7f7;
    height: 100vh;
    width: 100vw;
`;

export const Section = styled.section`
    margin: 0 auto;
    max-width: 1280px;
    padding: 32px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div``;

export const CardRow = styled.div`
    display: flex;
    gap: 32px;
    margin-bottom: 32px;
`;

export const StartRow = styled.div`
    display: flex;
    gap: 24px;
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    margin-bottom: 16px;

    h2 {
        margin: 0;
    }
`;

export const MoreButton = styled.button`
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
        background: ${({ theme }) => theme.colors.gray100};
        border-color: ${({ theme }) => theme.colors.gray500};
        color: ${({ theme }) => theme.colors.text};
    }

    &::after {
        content: '→';
        font-size: 12px;
    }
`;
