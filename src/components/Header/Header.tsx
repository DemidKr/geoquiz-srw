import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { AccountCircle } from "@mui/icons-material";
import {
  CustomAppBar,
  LogoTypography,
  UsernameTypography,
} from "./Header.styled";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { useNavigate } from "react-router-dom";
import { userSlice } from "../../store/reducers/UserSlice";
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  themeSlice,
} from "../../store/reducers/ThemeSlice";
import { FC } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { getMenuItemsByAuthAndRole } from "../../shared/utils/helpers";
import { useHeaderStyles } from "../../shared/hooks/useHeaderStyles";

const Header: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { isAuth, username, role } = useAppSelector(state => state.user);
  const { theme } = useAppSelector(state => state.theme);
  const { color, small, isThemeSwitcherOn, textColor } = useHeaderStyles();

  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(userSlice.actions.removeUser());
    localStorage.clear();
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = () => {
    localStorage.setItem(
      LOCAL_STORAGE_THEME_KEY,
      theme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    );
    dispatch(themeSlice.actions.changeTheme());
  };

  return (
    <CustomAppBar position="static" small={small} color={color}>
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}>
          <LogoTypography
            textColor={textColor}
            variant="h1"
            onClick={() => navigator("/main")}>
            Geoquiz
          </LogoTypography>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}>
            {isThemeSwitcherOn && (
              <IconButton onClick={handleThemeChange}>
                {theme === Theme.DARK ? (
                  <DarkModeIcon sx={{ color: "#FFF" }} />
                ) : (
                  <LightModeIcon sx={{ color: "#000" }} />
                )}
              </IconButton>
            )}
            <UsernameTypography textColor={textColor} variant="h6">
              {username}
            </UsernameTypography>
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle
                  sx={{
                    color: theme === Theme.DARK || textColor ? "#FFF" : "#000",
                  }}
                />
              </IconButton>
              <Menu
                sx={{ mt: "48px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {getMenuItemsByAuthAndRole(isAuth, role.name).map(
                  (item, index) => (
                    <MenuItem key={index} onClick={() => navigator(item.link)}>
                      {item.title}
                    </MenuItem>
                  ),
                )}
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
