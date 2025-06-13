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

export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
    margin-top: 24px;
`;
