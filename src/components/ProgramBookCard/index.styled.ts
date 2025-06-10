import styled from 'styled-components';

export const Card = styled.div`
    width: 160px;
    height: 274px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover img {
        transform: scale(1.04);
        filter: brightness(1.08);
        transition:
            transform 0.2s,
            filter 0.2s;
    }
    &:hover {
        cursor: pointer;
    }
`;

export const Poster = styled.img`
    width: 100%;
    height: 200px;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    object-fit: cover;
    transition:
        transform 0.2s,
        filter 0.2s;
`;

export const Content = styled.div`
    width: 100%;
    padding: 16px 12px 0 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Title = styled.div`
    font-weight: 600;
    margin-bottom: 4px;
`;

export const Subtitle = styled.div`
    color: #8c5c5c;
    font-size: 14px;
`;
