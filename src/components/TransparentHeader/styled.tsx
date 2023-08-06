import {styled} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

export const CustomAppBar = styled(AppBar)(({theme}) => ({
    height: '137px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
})) as typeof AppBar

export const HeaderContainer = styled(Container)(({theme}) => ({
    maxWidth: '1760px',
    margin: '36px 76px 36px 76px',
    // "@media (max-width: 1200px)": {
    //     backgroundColor: "#000",
    //     color: "#fff"
    // },
})) as typeof Container

export const HeaderToolbar = styled(Toolbar)(({theme}) => ({

})) as typeof Toolbar