import { Wrapper, Logo, Nav, NavLink, NewProjectButton, RightBox, IconButton, ProfileImg } from './index.styled';

export const TopBar = () => (
    <Wrapper>
        <Logo>PotatoBook</Logo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/myprogrambooks">My Program Books</NavLink>
                <NavLink to="/mymovies">My Movies</NavLink>
                <NewProjectButton>New Project</NewProjectButton>
            </Nav>
            <RightBox>
                <IconButton>?</IconButton>
                <ProfileImg src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile" />
            </RightBox>
        </div>
    </Wrapper>
);
