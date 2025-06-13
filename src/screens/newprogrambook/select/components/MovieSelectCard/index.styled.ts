import styled from 'styled-components';

export const Card = styled.div<{ selected?: boolean }>`
    width: 200px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: transform 0.2s;
    border: 3px solid ${({ selected }) => (selected ? '#a14d4d' : 'transparent')};
    border-radius: 12px;
    padding: 4px;

    &:hover {
        transform: translateY(-4px);
    }
`;

export const Poster = styled.img`
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 8px;
`;

export const Title = styled.div`
    font-weight: 600;
    color: #222;
    margin-top: 12px;
    text-align: center;
    font-size: 14px;
`;
