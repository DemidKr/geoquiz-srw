import React, {FC, useEffect, useRef} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import Header from "../../components/Header/Header";
import CreateQuestionBox from "../../components/CreateQuestionBox/CreateQuestionBox";
import Map from "../../components/Map/Map";
import {Panorama, useYMaps, withYMaps, YMaps} from "@pbe/react-yandex-maps";
import {MapWrapper, YandexMapContainer} from "../../components/Map/styles";

const CreateQuestionPage: FC = () => {
    // const mapRef = useRef<any>(null);
    // const ymaps = useYMaps(['Map']);
    //
    // useEffect(() => {
    //     if (!ymaps || !mapRef.current) {
    //         return;
    //     }
    //
    //     var locateRequest = ymaps.panorama.locate([55.83403, 37.623370]);
    //
    //     ymaps.panorama.locate([55.83403, 37.623370]).then(
    //         function (panoramas) {
    //             if (panoramas.length) {
    //                 console.log("Ура, нашлась панорама " + panoramas[0]);
    //             } else {
    //                 console.log("Для заданной точки не найдено ни одной панорамы.");
    //             }
    //         },
    //         function (err) {
    //             console.log("При попытке получить панораму возникла ошибка.");
    //         }
    //     );
    // }, [ymaps]);


    return (
       <>
           <CssBaseline/>
           <Header/>
           <Grid container style={{width: '100%'}}>
               <Grid item xs={12}>
                   <MapWrapper>
                       <Panorama
                           style={{height: '320px'
                                   // `calc(100% - 64px)`
                               ,  width:
                                   '100%'
                               ,
                               position: 'relative'}}
                           defaultPoint={[55.736442161085996, 37.41957803103468]}
                           options={{
                               suppressMapOpenBlock: true,
                               controls: []
                           }}

                       />
                       {/*<div ref={mapRef} style={{ width: '320px', height: '240px' }} />*/}
                   </MapWrapper>
               </Grid>
           </Grid>
           <CreateQuestionBox/>
       </>
    );
};

export default CreateQuestionPage;