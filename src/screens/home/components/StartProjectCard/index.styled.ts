import styled from 'styled-components';

export const Card = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    flex: 1;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

export const Icon = styled.div`
    font-size: 32px;
    margin-bottom: 16px;
`;

export const Title = styled.div`
    font-weight: 600;
    margin-bottom: 8px;
`;

export const Description = styled.div`
    color: #a08b8b;
    font-size: 14px;
`;
