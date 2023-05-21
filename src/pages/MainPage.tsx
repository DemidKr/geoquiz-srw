import React from 'react';
import {CssBaseline} from "@mui/material";
import Header from "../components/Header/Header";
import {useAppSelector} from "../shared/hooks/redux";

const MainPage = () => {
    const {username} = useAppSelector(state => state.user)

    return (
        <>
            <CssBaseline/>
            <Header/>
            MainPage
            {username}
        </>
    );
};

export default MainPage;