import React, {FC, useEffect, useRef, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, TextField} from "@mui/material";
import {FormWrapper} from "./styles";
import {Placemark, Map} from "@pbe/react-yandex-maps";

interface ICoordinates {
    lng: number,
    lat: number
}

const CreateQuestionBox: FC = () => {
    const [type, setType] = useState<number>(1)
    const [coordinates, setCoordinates] = useState<number[][]>([[55.65513222863271, 37.44924359801552]])

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
                        defaultState={{ center: [55.733685, 37.588264], zoom: 9 }}
                        options={{
                            copyrightLogoVisible: false,
                            copyrightUaVisible: false,
                            copyrightProvidersVisible: false,
                            suppressMapOpenBlock: true,

                    }}
                        // Function to add placemarks to the map; TODO: find type of event
                        onClick={(e: any)=>setCoordinates([...coordinates ,e._sourceEvent.originalEvent.coords])}
                    >
                        {coordinates?.map((el, i) => <Placemark key={i} options={{draggable: true}} geometry={el}></Placemark>)}
                    </Map>
                </Grid>
                <Grid item xs={2} sx={{ marginTop: ' 15px' }} onClick={log}>
                    <Button>Log</Button>
                </Grid>
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