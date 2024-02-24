import React from 'react';
import {useAppSelector} from "../../shared/hooks/redux";
import {Theme} from "../../store/reducers/ThemeSlice";
import {CircularProgress} from "@mui/material";

const Loader = () => {
    const {theme} = useAppSelector(state => state.theme)

    return <CircularProgress
        sx={{
            color: theme === Theme.LIGHT ? 'black' : 'white',
            position: 'absolute',
            top: '50%',
            left: '50%'
        }}
    />;
};

export default Loader;