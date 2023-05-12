import React, {FC} from 'react';
import {AppBar, Box, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {HeaderInput, HeaderToolbar, HeaderTypography, SearchBox, SearchIconWrapper} from "./styles";

const Header: FC = () => {
    return (
        <AppBar position="static">
            <HeaderToolbar>
                <HeaderTypography variant="h5">
                    Geoquiz
                </HeaderTypography>
                <Box display="flex">
                    {/*<Autocomplete>*/}
                       <HeaderInput
                           label="Search field"
                           type="search"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               ),
                           }}
                           variant="filled"
                       />
                    {/*</Autocomplete>*/}
                </Box>
            </HeaderToolbar>
        </AppBar>
    );
};

export default Header;