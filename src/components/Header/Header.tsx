import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {AccountCircle} from "@mui/icons-material";
import {CustomAppBar, LogoTypography, UsernameTypography} from "./styled";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {useNavigate} from "react-router-dom";
import {userSlice} from "../../store/reducers/UserSlice";
import {Theme, themeSlice} from "../../store/reducers/ThemeSlice";
import {FC} from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface HeaderProps {
    small?: boolean ,
    themeSwitcherOn?: boolean,
    textColor?: string
}

interface IMenuItem {
    title: string,
    link: string
}

const accountItems: IMenuItem[] = [
    {title: 'Мои геоквизы', link: '/userQuestions'},
    {title: 'Профиль', link: '/profile'},
];

const authItems: IMenuItem[] = [
    {title: 'Войти', link: '/auth'},
]

const Header: FC<HeaderProps> = ({small = false, themeSwitcherOn = false, textColor}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {isAuth, username} = useAppSelector(state => state.user)
    const {theme} = useAppSelector(state => state.theme)

    const navigator = useNavigate()
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(userSlice.actions.removeUser())
        localStorage.clear()
        setAnchorEl(null);
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <CustomAppBar position="static" small={small}>
            <Container
                maxWidth="xl"
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between'
                    }}
                >
                    <LogoTypography textColor={textColor} variant='h1' onClick={() => navigator('/main')}>
                        Geoquiz
                    </LogoTypography>
                    <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                        {themeSwitcherOn &&
                            <IconButton onClick={() => dispatch(themeSlice.actions.changeTheme())}>
                                {theme === Theme.DARK ? <DarkModeIcon sx={{color: '#FFF'}}/> : <LightModeIcon sx={{color: '#000'}}/>}
                            </IconButton>
                        }
                        <UsernameTypography textColor={textColor} variant="h6" >
                            {username}
                        </UsernameTypography>
                        <>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle
                                    sx={{
                                        color: theme === Theme.DARK || textColor ? '#FFF' : '#000'
                                    }}
                                />
                            </IconButton>
                            <Menu
                                sx={{ mt: '48px' }}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {(isAuth ? accountItems : authItems).map((item, index) => (
                                            <MenuItem key={index} onClick={() => navigator(item.link)}>{item.title}</MenuItem>
                                ))}
                                {isAuth && <MenuItem onClick={logout}>Выйти</MenuItem>}
                            </Menu>
                        </>
                    </Box>
                </Toolbar>
            </Container>
        </CustomAppBar>
    );
};

export default Header;
