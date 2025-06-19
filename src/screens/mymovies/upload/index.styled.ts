import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f8f9fa;
    padding-bottom: 100px;
`;

export const Content = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 600;
    color: #212529;
    margin-bottom: 32px;
`;

export const UploadArea = styled.div<{ isDragging?: boolean }>`
    width: 100%;
    min-height: 300px;
    border: 2px dashed ${(props) => (props.isDragging ? '#4dabf7' : '#dee2e6')};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    margin-bottom: 16px;
    background-color: ${(props) => (props.isDragging ? 'rgba(77, 171, 247, 0.1)' : '#ffffff')};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        border-color: #fd7e14;
    }
`;

export const UploadText = styled.p`
    font-size: 20px;
    font-weight: 500;
    color: #212529;
    margin-bottom: 8px;
`;

export const SubText = styled.p`
    font-size: 16px;
    color: #6c757d;
    margin-bottom: 24px;
`;

export const SelectButton = styled.label`
    position: relative;
    padding: 12px 24px;
    background-color: #f2e8e8;
    color: #1c0d0d;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #ebe0e0;
    }
`;

export const FileInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
`;

export const SupportedText = styled.p`
    font-size: 14px;
    color: #6c757d;
    text-align: center;
`;

export const MoviePreview = styled.div`
    margin-top: 32px;
    padding: 24px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const PreviewHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 24px;
`;

export const VideoPreview = styled.video`
    width: 280px;
    height: 157.5px;
    background: #f8f9fa;
    border-radius: 8px;
    object-fit: contain;
`;

export const NextButtonWrapper = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 100;
`;

export const NextButton = styled.button<{ disabled: boolean }>`
    background: ${(props) => (props.disabled ? '#E5DADA' : '#F2E8E8')};
    color: ${(props) => (props.disabled ? '#8E7D7D' : '#1C0D0D')};
    border: none;
    border-radius: 12px;
    padding: 16px 40px;
    font-size: 16px;
    font-weight: 500;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        background: ${(props) => (props.disabled ? '#E5DADA' : '#EBE0E0')};
        transform: ${(props) => (props.disabled ? 'none' : 'translateY(-1px)')};
        box-shadow: ${(props) => (props.disabled ? '0 2px 4px rgba(0, 0, 0, 0.05)' : '0 4px 8px rgba(0, 0, 0, 0.1)')};
    }

    &:active {
        transform: ${(props) => (props.disabled ? 'none' : 'translateY(0)')};
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
`;
