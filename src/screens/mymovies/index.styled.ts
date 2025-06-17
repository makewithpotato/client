import styled from 'styled-components';

export const Wrapper = styled.div`
    background: #fcf7f7;
    min-height: 100vh;
`;

export const Section = styled.section`
    margin: 0 auto;
    max-width: 1200px;
    padding: 40px 0 0 0;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

export const NewMovieButton = styled.button`
    background: #a14d4d;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #8b3d3d;
    }
`;
