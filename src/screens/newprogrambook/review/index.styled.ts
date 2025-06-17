import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 100vh;
    background-color: #f5f5f5;
`;

export const Section = styled.section`
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
`;

export const Header = styled.div`
    margin-bottom: 24px;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
`;

export const Description = styled.p`
    font-size: 16px;
    color: #666;
`;

export const ViewerContainer = styled.div`
    width: 100%;
    height: 70vh;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

export const PageViewer = styled.div`
    width: 100%;
    height: 1587px;
    max-width: 100vw;
    max-height: 80vh;
    aspect-ratio: 2/1.414;
    overflow: hidden;
    position: relative;
    background: #f8f8f8;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PagesContainer = styled.div`
    height: 100%;
    display: flex;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const NavigationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: #f8f8f8;
    border-top: 1px solid #e0e0e0;

    @media print {
        display: none;
    }
`;

export const NavButton = styled.button<{ disabled?: boolean }>`
    background: ${({ disabled }) => (disabled ? '#f0f0f0' : '#4CAF50')};
    color: ${({ disabled }) => (disabled ? '#999' : 'white')};
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: all 0.2s;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        background: ${({ disabled }) => (disabled ? '#f0f0f0' : '#45a049')};
        transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.05)')};
    }
`;

export const PageIndicator = styled.div`
    font-size: 14px;
    color: #666;
    font-weight: 500;
    min-width: 60px;
    text-align: center;
`;

export const PrintContainer = styled.div`
    display: none;

    @media print {
        display: block;
    }
`;

export const DownloadContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const DownloadButton = styled.button`
    display: block;
    margin: 24px auto 0;
    padding: 12px 24px;
    border-radius: 4px;
    background-color: #007aff;
    color: white;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;
