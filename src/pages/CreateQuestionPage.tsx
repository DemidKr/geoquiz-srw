import React, {FC} from 'react';
import { CssBaseline, Grid} from "@mui/material";
import {Panorama, useYMaps} from "@pbe/react-yandex-maps";
import {useAppSelector} from "../shared/hooks/redux";
import {MapWrapper} from "../components/Map/styled";
import CreateQuestionBox from "../components/CreateQuestionBox/CreateQuestionBox";
import Header from "../components/Header/Header";


const CreateQuestionPage: FC = () => {
    const {coordinates} = useAppSelector(state => state.coordinates)

    return (
        <>
            <CssBaseline/>
            <Header small={true} themeSwitcherOn={true}/>
            <Grid container style={{width: '100%'}}>
                <Grid item xs={12}>
                    <MapWrapper>
                        <Panorama point={coordinates} style={{ width: '100%', height: `calc(100% - 80px)` }}
                                  defaultOptions={{
                                      direction: [-10, 0],
                                      controls: [],
                                      suppressMapOpenBlock: true,
                                      hotkeysEnabled: false
                                  }}
                        />
                    </MapWrapper>
                </Grid>
            </Grid>
            <CreateQuestionBox/>
        </>
    );
};

export default CreateQuestionPage;