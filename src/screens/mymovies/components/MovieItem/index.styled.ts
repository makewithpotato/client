import styled from 'styled-components';

export const MovieRow = styled.tr`
    border-bottom: 1px solid #f0f0f0;
    &:hover {
        background-color: #fafafa;
    }
`;

export const MovieCell = styled.td`
    padding: 16px 12px;
    vertical-align: middle;
`;

export const MovieTitle = styled.div`
    font-weight: 600;
    color: #222;
`;

export const Director = styled.div`
    color: #a14d4d;
    font-weight: 500;
`;

export const Genre = styled.div`
    background: #f5eaea;
    color: #a08b8b;
    padding: 4px 12px;
    border-radius: 16px;
    display: inline-block;
    font-size: 14px;
`;

export const ReleaseDate = styled.div`
    color: #a08b8b;
    font-size: 14px;
`;

export const ViewButton = styled.button`
    background: none;
    border: none;
    color: #a14d4d;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: #8b3d3d;
    }
`;
