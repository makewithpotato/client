import styled from 'styled-components';

export const Card = styled.div`
    width: 220px;
    background: #eaf1ed;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    margin-right: 24px;
    margin-bottom: 16px;
    cursor: pointer;
    transition: box-shadow 0.2s;
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
`;

export const Icon = styled.div`
    font-size: 40px;
    margin-bottom: 16px;
`;
