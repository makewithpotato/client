import styled from 'styled-components';

interface CardProps {
    isSelected?: boolean;
}

export const Card = styled.div<CardProps>`
    display: flex;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid ${(props) => (props.isSelected ? '#007AFF' : 'transparent')};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

export const MoviePoster = styled.img`
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
`;

export const MovieInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const MovieTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px;
`;

export const MovieReleaseDate = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0 0 12px;
`;

export const MovieOverview = styled.p`
    font-size: 14px;
    line-height: 1.5;
    color: #444;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

export const LayoutButton = styled.button`
    background: #007aff;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    align-self: flex-start;
    transition: background 0.2s;

    &:hover {
        background: #0056b3;
    }
`;
