import React, {FC} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App: FC = () => {
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={3}>
                    <List/>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Map/>
                </Grid>
            </Grid>
        </>
    );
};

export default App;