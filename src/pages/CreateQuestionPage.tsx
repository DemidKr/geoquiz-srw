import React, {FC, useEffect, useRef} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import {useYMaps} from "@pbe/react-yandex-maps";
import {useAppSelector} from "../shared/hooks/redux";
import Header from "../components/Header/Header";
import {MapWrapper} from "../components/Map/styles";
import CreateQuestionBox from "../components/CreateQuestionBox/CreateQuestionBox";


const CreateQuestionPage: FC = () => {
    const ymaps = useYMaps(['package.full']);
    const panoramaRef = useRef<any>(null);
    const yplayer = useRef<any>(null)

    const {coordinates} = useAppSelector(state => state.coordinates)


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
                        suppressMapOpenBlock: true,
                        hotkeysEnabled: false
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
                        <div ref={panoramaRef} style={{ width: '100%', height: `calc(100% - 64px)` }} />
                    </MapWrapper>
                </Grid>
            </Grid>
            <CreateQuestionBox/>
        </>
    );
};

export default CreateQuestionPage;