import React, {useState} from 'react';
import {FormWrapper} from "../CreateQuestionBox/styles";
import {Button, Grid, TextField} from "@mui/material";
import {Map, Placemark, TypeSelector, useYMaps} from "@pbe/react-yandex-maps";
import {useAppDispatch} from "../../shared/hooks/redux";
import {useAction} from "../../shared/hooks/useAction";
import {useNavigate} from "react-router-dom";

interface AnswerQuestionBoxProps {
    coord: number[]
}

const AnswerQuestionBox = ({coord}: AnswerQuestionBoxProps) => {
    const ymaps = useYMaps(['package.full']);
    const [coordinates, setCoordinates] = useState<number[]>([])

    const dispatch = useAppDispatch()
    const addSnack = useAction()
    const navigate = useNavigate()

    const handleAnswer = () => {
        console.log(coord)
        console.log(coordinates)
        navigate('/main')
    }

    return (
        <FormWrapper>
            <Grid container direction='column' alignItems='center' sx={{padding: '15px'}}>

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
                        onClick={(e: any) => setCoordinates(e._sourceEvent.originalEvent.coords)}
                    >
                        <TypeSelector/>
                        {coordinates?.length !== 0 && <Placemark options={{draggable: true}} geometry={coordinates}></Placemark>}
                    </Map>
                </Grid>
                <Grid item xs={2} sx={{ marginTop: ' 15px'}}>
                    <Button
                        // disabled={isLoading}
                        onClick={handleAnswer}
                    >
                        Завершить создание викторины
                    </Button>
                </Grid>
            </Grid>
        </FormWrapper>
    );
};

export default AnswerQuestionBox;