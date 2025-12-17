import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    margin-bottom: 16px;
`;

export const Label = styled.div`
    font-weight: 600;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Content = styled.div`
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    white-space: pre-wrap;
`;

export const EditButton = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    float: right;

    &:hover {
        text-decoration: underline;
    }
`;

export const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 12px;
`;

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%; // 1:1 Aspect ratio
    overflow: hidden;
    border-radius: 8px;
`;

export const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
