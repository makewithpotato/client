import styled from 'styled-components';

export const Card = styled.div<{ selected: boolean }>`
    position: relative;
    width: 200px;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid ${({ selected }) => (selected ? '#007AFF' : 'transparent')};
    display: flex;
    flex-direction: column;
    background-color: #fff;
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 240px;
    position: relative;
    overflow: hidden;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #f5f5f5;
`;

export const Title = styled.h3`
    margin: 8px;
    font-size: 16px;
    text-align: center;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    line-height: 1.2;
`;

interface SelectButtonProps {
    selected?: boolean;
}

export const SelectButton = styled.button<SelectButtonProps>`
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 12px;
    border-radius: 4px;
    background-color: ${({ selected }) => (selected ? '#007AFF' : '#E0E0E0')};
    color: ${({ selected }) => (selected ? '#FFFFFF' : '#333333')};
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ selected }) => (selected ? '#0056B3' : '#CCCCCC')};
    }
`;
