import styled from 'styled-components';

export const Wrapper = styled.div`
    background: #fcf7f7;
    min-height: 100vh;
`;

export const Section = styled.section`
    margin: 0 auto;
    max-width: 1400px;
    padding: 40px 24px;
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 40px;
`;

export const Title = styled.h1`
    font-family: 'Plus Jakarta Sans', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    font-weight: bold;
    font-size: 36px;
    margin: 0 0 16px 0;
    color: #222;
`;

export const Description = styled.p`
    font-size: 16px;
    color: #666;
    margin: 0;
`;

export const ViewerContainer = styled.div`
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
    text-align: center;

    @media print {
        display: none;
    }
`;

export const DownloadButton = styled.button`
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 16px 32px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #c0392b;
    }
`;
