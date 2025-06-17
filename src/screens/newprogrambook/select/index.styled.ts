import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 100vh;
    background-color: #f8f8f8;
    padding-bottom: 100px;
`;

export const Section = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const MovieGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
    margin: 32px 0;
`;

export const NextButtonWrapper = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 100;
`;

export const NextButton = styled.button<{ disabled: boolean }>`
    background: ${(props) => (props.disabled ? '#E5DADA' : '#F2E8E8')};
    color: ${(props) => (props.disabled ? '#8E7D7D' : '#1C0D0D')};
    border: none;
    border-radius: 12px;
    padding: 16px 40px;
    font-size: 16px;
    font-weight: 500;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        background: ${(props) => (props.disabled ? '#E5DADA' : '#EBE0E0')};
        transform: ${(props) => (props.disabled ? 'none' : 'translateY(-1px)')};
        box-shadow: ${(props) => (props.disabled ? '0 2px 4px rgba(0, 0, 0, 0.05)' : '0 4px 8px rgba(0, 0, 0, 0.1)')};
    }

    &:active {
        transform: ${(props) => (props.disabled ? 'none' : 'translateY(0)')};
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
`;
