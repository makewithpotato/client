import styled from 'styled-components';

export const Wrapper = styled.div`
    background: #fcf7f7;
    min-height: 100vh;
    position: relative;
`;

export const Section = styled.section`
    margin: 0 auto;
    max-width: 1200px;
    padding: 40px 24px 120px 24px;
`;

export const MovieGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
    margin-top: 24px;
`;

export const NextButtonWrapper = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
`;

export const NextButton = styled.button<{ disabled?: boolean }>`
    background: ${({ disabled }) => (disabled ? '#ccc' : '#a14d4d')};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 16px 32px;
    font-weight: 600;
    font-size: 16px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background 0.2s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    &:hover {
        background: ${({ disabled }) => (disabled ? '#ccc' : '#8b3d3d')};
    }
`;
