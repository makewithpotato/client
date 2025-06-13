import styled from 'styled-components';

export const MovieInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const MovieImage = styled.img`
    width: 60px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
`;

export const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MovieTitle = styled.h3`
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 600;
    color: #222;
`;

export const MovieProgress = styled.p`
    margin: 0;
    color: #666;
    font-size: 14px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

export const MovieButton = styled.button<{ disabled?: boolean }>`
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    color: #222;
    font-size: 14px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: all 0.2s;

    &:hover {
        background: ${({ disabled }) => (disabled ? 'white' : '#f5f5f5')};
        border-color: ${({ disabled }) => (disabled ? '#ddd' : '#bbb')};
    }
`;
