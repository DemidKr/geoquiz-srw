import React, {FC} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import Header from "../../components/Header/Header";
import CreateQuestionBox from "../../components/CreateQuestionBox/CreateQuestionBox";
import Map from "../../components/Map/Map";

const CreateQuestionPage: FC = () => {
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container style={{width: '100%'}}>
                <Grid item xs={12}>
                    <Map/>
                </Grid>
            </Grid>
            <CreateQuestionBox/>
        </>
    );
};

export default CreateQuestionPage;