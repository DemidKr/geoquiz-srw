import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {AccountCircle} from "@mui/icons-material";
import {CustomAppBar, HeaderContainer, HeaderToolbar} from "./styled";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <CustomAppBar position="static">
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
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: 'Inter',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            letterSpacing: '3.6px',
                            mr: 0,
                            display: { md: 'flex' },
                            fontWeight: 900,
                            color: '#FFF',
                            textDecoration: 'none',
                        }}
                    >
                        Geoquiz
                    </Typography>

                    <Box sx={{ flexGrow: 0, display: { md: 'flex' }, justifyContent: 'center' }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                // onClick={handleCloseNavMenu}
                                sx={{ my: 0, color: 'white', display: 'flex', }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, ml: '52px'}}>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
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
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </CustomAppBar>
    );
}
export default ResponsiveAppBar;
