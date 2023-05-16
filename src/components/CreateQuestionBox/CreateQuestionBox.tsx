import React, {FC, useEffect, useRef, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, TextField} from "@mui/material";
import {FormWrapper} from "./styles";
import {Placemark, Map, TypeSelector, useYMaps} from "@pbe/react-yandex-maps";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {coordinatesSlice} from "../../store/reducers/CoordinatesSlice";

interface ICoordinates {
    lng: number,
    lat: number
}

const CreateQuestionBox: FC = () => {
    const mapRef = useRef(null);
    const YPlayer = useRef<any>(null)
    const ymaps = useYMaps(['package.full']);

    const {coordinates} = useAppSelector(state => state.coordinatesReducer)
    const {changeCoordinates} = coordinatesSlice.actions
    const dispatch = useAppDispatch()

    const [type, setType] = useState<number>(1)

    useEffect(() => {
        if (!ymaps || !mapRef.current) {
            return;
        }

        // let locateRequest = ymaps.panorama.locate( [55.76114349600457, 37.55209482512221]);
        //
        // locateRequest.then(
        //     // @ts-ignore
        //     function (panoramas) {
        //         if (panoramas.length) {
        //             // Создание на странице плеера панорам.
        //             console.log("В заданной точке есть панорама.");
        //             // @ts-ignore
        //             let player = new ymaps.panorama.Player(mapRef.current, panoramas[0], {
        //                 // Опции панорамы.
        //                 // direction - направление взгляда.
        //                 direction: [0, -50]
        //             });
        //             console.log("player", player)
        //             YPlayer.current = player
        //         } else {
        //             console.log("В заданной точке нет панорам.");
        //         }
        //         console.log(mapRef)
        //     }
        // );

    }, [ymaps]);

    const movePlacemark = (coord: any) => {
        if(ymaps !== null) {
            console.log("coord", coord)

            let locateRequest = ymaps.panorama.locate( coord);

            locateRequest.then(
                // @ts-ignore
                function (panoramas) {
                    if (panoramas.length) {
                        dispatch(changeCoordinates(coord))
                    } else {
                        console.log("В заданной точке нет панорам.");
                    }
                }
            );
        } else {
            console.log('YPlayer or ymaps is null')
        }
    }

    return (
        <FormWrapper>
            <Grid container direction='column' alignItems='center' sx={{padding: '15px'}}>
                <FormControl fullWidth variant='standard'>
                    <InputLabel id='demo-simple-select-label'>Тип викторины</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={type.toString()}
                        label='Тип викторины'
                    >
                        <MenuItem value={1}>Угадай из списка</MenuItem>
                        <MenuItem value={2}>Угадай локацию</MenuItem>
                        <MenuItem value={3}>Угадай название</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    sx={{ marginTop: '15px' }}
                    fullWidth
                    id="outlined-required"
                    label="Название точки"
                    defaultValue=""
                />
                <Grid item xs={2} sx={{ marginTop: ' 15px' }}>
                    <Map
                        width={390}
                        height={200}
                        defaultState={{ center: [55.733685, 37.588264], zoom: 9, controls: [] }}
                        options={{
                            copyrightLogoVisible: false,
                            copyrightUaVisible: false,
                            copyrightProvidersVisible: false,
                            suppressMapOpenBlock: true,
                        }}
                        // Function to add placemarks to the map; TODO: find type of event
                        onClick={(e: any) => movePlacemark(e._sourceEvent.originalEvent.coords)}
                    >
                        {/*<TypeSelector/>*/}
                        {coordinates?.length !== 0 && <Placemark options={{draggable: true}} geometry={coordinates}></Placemark>}
                    </Map>
                </Grid>
                {/*<Grid item xs={2} sx={{ marginTop: ' 15px' }}>*/}
                {/*    <div ref={mapRef} style={{ width: '320px', height: '240px' }} />*/}
                {/*</Grid>*/}
                <Grid item xs={2} sx={{ marginTop: ' 15px' }}>
                    <Button>Сохранить и продолжить</Button>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: '15px' }}>
                    <Pagination count={15} color='primary' />
                </Grid>
                <Grid item xs={2} sx={{ marginTop: ' 15px'}}>
                    <Button >Завершить создание викторины</Button>
                </Grid>
            </Grid>
        </FormWrapper>
    );
};

export default CreateQuestionBox;