import { Wrapper, Logo, Nav, NavLink, RightBox, IconButton, ProfileImg } from './index.styled';
import potatoLogo from '@/assets/images/logo/potato_logo.svg';

export const TopBar = () => (
    <Wrapper>
        <Logo>
            <img src={potatoLogo} alt="PotatoBook Logo" style={{ height: '24px', marginRight: '8px' }} />
            PotatoBook
        </Logo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/myprogrambooks/list">My Program Books</NavLink>
                <NavLink to="/mymovies/list">My Movies</NavLink>
                <NavLink to="/newprogrambook/select">New Program Book</NavLink>
            </Nav>
            <RightBox>
                <IconButton>?</IconButton>
                <ProfileImg src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile" />
            </RightBox>
        </div>
    </Wrapper>
);
