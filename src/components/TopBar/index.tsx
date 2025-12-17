import { useNavigate } from 'react-router-dom';
import { Wrapper, Logo, Nav, NavLink, RightBox, AuthButton } from './index.styled';
import potatoLogo from '@/assets/images/logo/potato_logo.svg';
import { getAccessToken, clearTokens } from '@/utils/auth';
import { ROUTE_NAMES } from '@/constants/routes';

export const TopBar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate(ROUTE_NAMES.HOME);
    };

    const handleLogin = () => {
        navigate(ROUTE_NAMES.LOGIN);
    };

    return (
        <Wrapper>
            <Logo to={ROUTE_NAMES.HOME}>
                <img src={potatoLogo} alt="PotatoBook Logo" style={{ height: '24px', marginRight: '8px' }} />
                PotatoBook
            </Logo>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/myprogrambooks/list">My Program Books</NavLink>
                    <NavLink to="/mymovies/list">My Videos</NavLink>
                    <NavLink to="/newprogrambook/select">New Program Book</NavLink>
                </Nav>
                <RightBox>
                    {/* <IconButton>?</IconButton> */}
                    {isLoggedIn ? (
                        <AuthButton onClick={handleLogout}>Logout</AuthButton>
                    ) : (
                        <AuthButton onClick={handleLogin}>Login</AuthButton>
                    )}
                </RightBox>
            </div>
        </Wrapper>
    );
};
