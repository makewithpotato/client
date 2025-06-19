import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.header`
    width: auto;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    background: #fff;
    border-bottom: 1px solid #eee;
`;

export const Logo = styled.div`
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
`;

export const NavLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    margin-left: 24px;
    font-weight: 500;
    &:first-child {
        margin-left: 0;
    }
    &:hover {
        text-decoration: underline;
    }
`;

export const NewProjectButton = styled.button`
    margin-left: 24px;
    background: #f5f0ef;
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    color: #222;
    transition:
        background 0.2s,
        border-color 0.2s;
    &:hover {
        background: #e5d8d3;
        border-color: #bfaea6;
    }
`;

export const RightBox = styled.div`
    display: flex;
    align-items: center;
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    margin-right: 8px;
    font-size: 18px;
    cursor: pointer;
`;

export const ProfileImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;
