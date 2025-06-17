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
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.h2`
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

export const LayoutGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    flex: 1;
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
    margin: 12px 0 0 0;
    text-align: center;
`;

export const PreviewPanel = styled.div`
    background: white;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    padding: 24px;
    min-height: 400px;
    display: grid;
    gap: 16px;
    margin-top: 24px;
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

export const DropZoneTitle = styled.h5`
    font-size: 14px;
    font-weight: 500;
    color: #666;
    margin: 0;
    text-align: center;
`;

export const AnalysisItem = styled.div`
    background: white;
    border: 1px solid #e1e1e1;
    border-radius: 6px;
    padding: 12px;
`;

export const AnalysisTitle = styled.h6`
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px;
`;

export const AnalysisContent = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.4;
`;

export const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #ff4444;
    cursor: pointer;
    padding: 4px;
    margin: -4px;
    float: right;

    &:hover {
        color: #cc0000;
    }
`;

export const PreviewWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const LayoutOption = styled.div<{ isSelected: boolean }>`
    background: white;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid ${({ isSelected }) => (isSelected ? '#007AFF' : 'transparent')};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

export const LayoutImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 4px;
`;
