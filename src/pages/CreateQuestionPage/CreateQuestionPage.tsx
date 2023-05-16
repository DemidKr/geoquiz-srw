import React, {FC, useEffect, useRef} from 'react';
import {Button, CssBaseline, Grid} from "@mui/material";
import Header from "../../components/Header/Header";
import CreateQuestionBox from "../../components/CreateQuestionBox/CreateQuestionBox";
import Map from "../../components/Map/Map";
import {Panorama, useYMaps, withYMaps, YMaps} from "@pbe/react-yandex-maps";
import {MapWrapper, YandexMapContainer} from "../../components/Map/styles";
import {useAppSelector} from "../../shared/hooks/redux";

const CreateQuestionPage: FC = () => {
    const ymaps = useYMaps(['package.full']);
    const panoramaRef = useRef<any>(null);
    const yplayer = useRef<any>(null)

    const {coordinates} = useAppSelector(state => state.coordinatesReducer)


    useEffect(() => {
        if (!ymaps || !panoramaRef.current) {
            return;
        }

        let locateRequest = ymaps.panorama.locate([55.83403, 37.623370]);

        locateRequest.then(
            function (panoramas) {
                if (panoramas.length) {
                    console.log("Ура, нашлась панорама " + panoramas[0]);
                    let player = new ymaps.panorama.Player(panoramaRef.current, panoramas[0], {
                        // Опции панорамы.
                        // direction - направление взгляда.
                        direction: [10, 10],
                        controls: [],
                        suppressMapOpenBlock: true
                    });
                    yplayer.current = player
                } else {
                    console.log("Для заданной точки не найдено ни одной панорамы.");
                }
            },
            function (err) {
                console.log("При попытке получить панораму возникла ошибка.");
            }
        );
    }, [ymaps]);

    useEffect(() => {
        if (yplayer.current) {
            yplayer.current.moveTo(coordinates)
        }
    }, [coordinates])


    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container style={{width: '100%'}}>
                <Grid item xs={12}>
                    <MapWrapper>
                        {/*<Panorama*/}
                        {/*    style={{height: '620px'*/}
                        {/*        // `calc(100% - 64px)`*/}
                        {/*        ,  width:*/}
                        {/*            '100%'*/}
                        {/*        ,*/}
                        {/*        position: 'relative'}}*/}
                        {/*    point={[55.733685, 37.588264]}*/}
                        {/*    options={{*/}
                        {/*        suppressMapOpenBlock: true,*/}
                        {/*        controls: []*/}
                        {/*    }}*/}
                        {/*    instanceRef={ref => yplayer.current = ref}*/}
                        {/*/>*/}
                        <div ref={panoramaRef} style={{ width: '100%', height: `calc(100% - 64px)` }} />
                        {/*<h1>{coordinates}</h1>*/}
                        {/*<Button variant='contained' onClick={() => yplayer.current.moveTo(coordinates)}>Move panorama</Button>*/}

                    </MapWrapper>
                </Grid>
            </Grid>
            <CreateQuestionBox/>
        </>
    );
};

export default CreateQuestionPage;