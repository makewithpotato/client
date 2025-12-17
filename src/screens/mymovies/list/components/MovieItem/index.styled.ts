import styled from 'styled-components';

export const MovieRow = styled.tr`
    border-bottom: 1px solid #f0f0f0;
    &:hover {
        background-color: #fafafa;
    }
`;

export const MovieCell = styled.td`
    padding: 16px 12px;
    vertical-align: middle;
`;

export const MovieTitle = styled.div`
    font-weight: 600;
    color: #222;
`;

export const Director = styled.div`
    color: #a14d4d;
    font-weight: 500;
`;

export const Genre = styled.div`
    background: #f5eaea;
    color: #a08b8b;
    padding: 4px 12px;
    border-radius: 16px;
    display: inline-block;
    font-size: 14px;
`;

export const ReleaseDate = styled.div`
    color: #a08b8b;
    font-size: 14px;
`;

export const ViewButton = styled.button`
    background: none;
    border: none;
    color: #a14d4d;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: #8b3d3d;
    }
`;

// Tooltip for payment on uploaded (PENDING) status
export const StatusCell = styled.td`
    padding: 16px 12px;
    vertical-align: middle;
`;

export const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
`;

export const TooltipTitle = styled.div`
    font-weight: 600;
    margin-bottom: 10px;
`;

export const ModalMovieTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 18px;
    text-align: center;
    word-break: keep-all;
`;

export const TooltipDescription = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 8px;
`;

export const TooltipPrice = styled.div`
    color: ${({ theme }) => theme.colors.pay};
    font-weight: 600;
    margin-bottom: 18px;
`;

export const PayButton = styled.button`
    width: 100%;
    background: ${({ theme }) => theme.colors.pay};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 6px;
    padding: 10px 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
        background: ${({ theme }) => theme.colors.payHover};
    }
    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.gray500};
        outline-offset: 2px;
    }
`;

export const PaymentRequiredButton = styled.button`
    background: ${({ theme }) => theme.colors.pay};
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.colors.payHover};
    }
`;
