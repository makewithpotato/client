import styled from 'styled-components';

export const Wrapper = styled.div`
    background: #fcf7f7;
    min-height: 100vh;
    position: relative;
`;

export const Section = styled.section`
    margin: 0 auto;
    max-width: 1400px;
    padding: 40px 24px 120px 24px;
`;

export const Title = styled.h1`
    font-family: 'Plus Jakarta Sans', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    font-weight: bold;
    font-size: 32px;
    margin: 0 0 8px 0;
    color: #222;
`;

export const Description = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0 0 40px 0;
`;

export const MainContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
`;

export const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RightPanel = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SaveButton = styled.button`
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 16px 32px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;

    &:hover {
        background: #c0392b;
    }
`;
