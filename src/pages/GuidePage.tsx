import React from 'react';
import {CssBaseline} from "@mui/material";
import Header from "../components/Header/Header";

const GuidePage = () => {
    return (
        <>
            <CssBaseline/>
            <Header themeSwitcherOn={true} small={true}/>
            GuidePage
        </>
    );
};

export default GuidePage;