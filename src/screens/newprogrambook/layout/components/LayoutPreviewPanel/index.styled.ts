import styled from 'styled-components';

export const LayoutSection = styled.div`
    margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
    font-family: 'Plus Jakarta Sans', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    font-weight: bold;
    font-size: 22px;
    margin: 0 0 20px 0;
    color: #222;
`;

export const LayoutInfo = styled.div`
    margin-bottom: 16px;
    padding: 12px 16px;
    background: #f8f8f8;
    border-radius: 8px;
    border-left: 4px solid #a14d4d;
`;

export const LayoutName = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #222;
    margin: 0 0 4px 0;
`;

export const LayoutDescription = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.4;
`;

export const LayoutPreviewContainer = styled.div`
    width: 100%;
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

export const PreviewContent = styled.div`
    width: 100%;
    height: 800px;
    background: #f0f0f0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 16px;
    text-align: center;
    line-height: 1.6;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const LayoutButton = styled.button<{ disabled?: boolean }>`
    background: white;
    color: #222;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 24px;
    font-weight: 500;
    font-size: 14px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: all 0.2s;

    &:hover {
        background: ${({ disabled }) => (disabled ? 'white' : '#f5f5f5')};
        border-color: ${({ disabled }) => (disabled ? '#ddd' : '#bbb')};
    }
`;

export const Panel = styled.div`
    flex: 2;
    background: white;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
`;

export const Title = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 0 0 24px 0;
`;

export const LayoutGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
`;

export const LayoutCard = styled.div<{ selected?: boolean }>`
    background: white;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid ${({ selected }) => (selected ? '#007AFF' : 'transparent')};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

export const LayoutPreviewImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 4px;
`;

export const LayoutTitle = styled.h3`
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin: 0;
    text-align: center;
`;

export const PreviewPanel = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    flex: 1;
    overflow-y: auto;
    padding-right: 8px;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export const DropZone = styled.div`
    background: #f8f8f8;
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 16px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.2s;

    &:hover {
        border-color: #007aff;
        background: #f0f7ff;
    }
`;

export const DropZoneTitle = styled.h4`
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin: 0 0 12px 0;
`;

export const AnalysisItem = styled.div`
    background: white;
    border: 1px solid #e1e1e1;
    border-radius: 6px;
    padding: 12px;
    position: relative;
`;

export const AnalysisTitle = styled.h4`
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin: 0 0 8px 0;
`;

export const AnalysisContent = styled.p`
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    margin: 0;
    white-space: pre-wrap;
`;

export const DeleteButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    border: none;
    background: rgba(0, 0, 0, 0.1);
    color: #666;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.2);
        color: #333;
    }
`;

export const PreviewWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const LayoutOption = styled.div<{ isSelected: boolean }>`
    border: 2px solid ${({ isSelected }) => (isSelected ? '#007aff' : '#e1e1e1')};
    border-radius: 8px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: #007aff;
        background: #f0f7ff;
    }
`;

export const LayoutImage = styled.img`
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 8px;
`;
