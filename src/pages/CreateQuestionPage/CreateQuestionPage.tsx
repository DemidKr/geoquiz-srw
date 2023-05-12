import React, {FC} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import Header from "../../components/Header/Header";
import CreateQuestionBox from "../../components/CreateQuestionBox/CreateQuestionBox";
import Map from "../../components/Map/Map";
import {Panorama} from "@pbe/react-yandex-maps";
import {MapWrapper, YandexMapContainer} from "../../components/Map/styles";

const CreateQuestionPage: FC = () => {
    return (
       <>
           <CssBaseline/>
           <Header/>
           <Grid container style={{width: '100%'}}>
               <Grid item xs={12}>
                   <MapWrapper>
                       <Panorama
                           style={{height: `calc(100% - 64px)`,  width: '100%', position: 'relative'}}
                           defaultPoint={[55.733685, 37.588264]}
                           options={{
                               suppressMapOpenBlock: true,
                               controls: []
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