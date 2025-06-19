import styled from 'styled-components';

export const Message = styled.div<{ isError?: boolean }>`
    color: ${({ isError, theme }) => (isError ? theme.colors.error : theme.colors.success)};
    margin-top: 1rem;
    text-align: center;
    font-size: 0.875rem;
`;
