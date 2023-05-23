import React, {FC} from 'react';
import {
    AppBar, Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar, Tooltip,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import PublicIcon from '@mui/icons-material/Public';
import {useNavigate} from "react-router-dom";
import {userSlice} from "../../store/reducers/UserSlice";

const settings = ['Profile', 'Account', 'Dashboard'];


const Header: FC = () => {
    const {isAuth} = useAppSelector(state => state.user)

    const navigator = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(userSlice.actions.removeUser())
        localStorage.clear()
    }


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor: '#F36C41'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <PublicIcon sx={{ display: 'flex', mr: 1 }} />
                        <Typography
                            onClick={() => navigator('/main')}
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Geoquiz
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />

                        {isAuth ?
                            <Box sx={{ display: 'flex' }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {/*{settings.map((setting) => (*/}
                                    {/*    <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                                    {/*        <Typography textAlign="center">{setting}</Typography>*/}
                                    {/*    </MenuItem>*/}
                                    {/*))}*/}
                                    <MenuItem
                                        onClick={() => navigator('/createQuestion')}
                                    >
                                        <Typography textAlign="center">Создать панораму</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={logout}
                                    >
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            :
                            <Box  sx={{ display: 'flex' }}>
                                <Button
                                    onClick={() => {
                                        navigator('/login')
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => {
                                        navigator('/register')
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Register
                                </Button>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Header;