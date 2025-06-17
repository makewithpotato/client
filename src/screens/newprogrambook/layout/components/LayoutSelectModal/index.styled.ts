import styled from '@emotion/styled';

interface LayoutOptionProps {
    isSelected: boolean;
}

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 80%;
    max-width: 900px;
    position: relative;
`;

export const Title = styled.h2`
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
`;

export const LayoutGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
`;

export const LayoutOption = styled.div<LayoutOptionProps>`
    cursor: pointer;
    border: 2px solid ${(props) => (props.isSelected ? '#007AFF' : '#E5E5E5')};
    border-radius: 8px;
    padding: 1rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

export const LayoutPreview = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
`;

export const LayoutTitle = styled.h3`
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
    color: #666;

    &:hover {
        color: #000;
    }
`;
