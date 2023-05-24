import React, {useEffect, useState} from 'react';
import {FormWrapper} from "../CreateQuestionBox/styles";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography
} from "@mui/material";
import {Map, Placemark, useYMaps} from "@pbe/react-yandex-maps";
import {useAppDispatch} from "../../shared/hooks/redux";
import {useAction} from "../../shared/hooks/useAction";
import {useNavigate} from "react-router-dom";

interface AnswerQuestionBoxProps {
    coord: number[],
    name: string
}

const AnswerQuestionBox = ({coord, name}: AnswerQuestionBoxProps) => {
    const ymaps = useYMaps(['package.full']);
    const [coordinates, setCoordinates] = useState<number[]>([])
    const [show, setShow] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false);
    const [timerClock, setTimerClock] = useState<number>(90)
    const [result, setResult] = useState<number>(0)
    const [text, setText] = useState<string>('')
    const [zoomLevel, setZoomLevel] = useState<number>(6)

    const dispatch = useAppDispatch()
    const addSnack = useAction()
    const navigate = useNavigate()


    useEffect(() => {
        if (timerClock === 0 && !open) {
            addSnack('Время вышло!', 'info')
            handleAnswer()
        }
        if (timerClock > 0 && !open) {
            const timer = setTimeout(function() {
                console.log("minus: ", timerClock)
                setTimerClock(timerClock - 1);
            }, 1000)

            return () => { // this should work flawlessly besides some milliseconds lost here and there
                clearTimeout(timer)
            }
        }
    }, [timerClock]);

    const handleAnswer = () => {
        console.log(coord)
        console.log(coordinates)
        if(coordinates.length === 0) {
            setText(text + 'Вы не дали ответ')
        } else {
            setText(text + 'Ваш ответ принят')
            let lat = Math.floor((5 - Math.abs(coordinates[0] - coord[0]))/5 * 1000)
            let lng = Math.floor((10 - Math.abs(coordinates[1] - coord[1]))/10 * 1000)
            console.log('lat', lat)
            console.log('lng', lng)

            let res = Math.floor((lat + lng) / 2)
            if (lat < 0 || lng < 0) {
                setZoomLevel(2)
                setResult(0)
            } else {
                setResult(res)
                if (res > 900) {
                    setZoomLevel(6)
                } else {
                    setZoomLevel(4)
                }
            }
        }
        setOpen(true)
    }

    const handleClose = () => {
        navigate('/main')
    }

    return (
        <FormWrapper>
            <Grid container direction='column' alignItems='center' sx={{padding: '15px'}}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{color: '#F36C41'}}
                >
                    {name}
                </Typography>
                {show && <Typography
                    variant="body1"
                    component="div"
                    sx={{ marginTop: '15px' }}
                >
                    Подсказка: Перед вами панорама,
                    ваша задача как можно точнее определить где на карте находится это место.
                    Вы можете перемещаться с помощью стрелок на панораме или курсора с кружком.
                    Подсказки могут быть на билбордах, дорожных знаках и в прочих особенностях.
                    Удачи в поиске!
                    <Button
                        onClick={() => setShow(false)}
                        sx={{ padding: '0px', marginLeft: '3px'}}
                    >
                        Скрыть
                    </Button>
                </Typography>}
                <Grid item xs={2} sx={{ marginTop: ' 15px' }}>
                    <Map
                        width={390}
                        height={200}
                        defaultState={{ center: [47.23620154498959, 39.712672605191955], zoom: 9, controls: [] }}
                        options={{
                            copyrightLogoVisible: false,
                            copyrightUaVisible: false,
                            copyrightProvidersVisible: false,
                            suppressMapOpenBlock: true,
                        }}
                        // Function to add placemarks to the map; TODO: find type of event
                        onClick={(e: any) => setCoordinates(e._sourceEvent.originalEvent.coords)}
                    >
                        {coordinates?.length !== 0 && <Placemark geometry={coordinates}></Placemark>}
                    </Map>
                </Grid>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginTop: '10px'}}
                >
                    Осталось времени: {timerClock} сек
                </Typography>
                <Grid item xs={2} sx={{ marginTop: '10px'}}>
                    <Button
                        disabled={open}
                        onClick={handleAnswer}
                        variant='contained'
                        sx={{backgroundColor: '#F36C41', color: 'white', minWidth: '200px',
                            '&.MuiButton-contained:hover':{
                                backgroundColor: '#e04819'
                            },
                        }}
                    >
                        Подтвердить ответ
                    </Button>
                    <Dialog
                        open={open}
                        // onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {text}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Ваш результат составил {result}/1000. {result > 900 ? 'Вы очень хороши в географии!' : 'Попробуйте еще!'}
                            </DialogContentText>
                            <Map
                                width={500}
                                height={200}
                                defaultState={{ center: coord, zoom: zoomLevel, controls: [] }}
                                options={{
                                    copyrightLogoVisible: false,
                                    copyrightUaVisible: false,
                                    copyrightProvidersVisible: false,
                                    suppressMapOpenBlock: true,
                                }}
                            >
                                {coordinates?.length !== 0 && <Placemark
                                    options={{
                                        preset: 'islands#redIcon'
                                    }}
                                    geometry={coordinates}
                                ></Placemark>}
                                {coord?.length !== 0 && <Placemark
                                    options={{
                                        preset: 'islands#greenIcon'
                                    }}
                                    geometry={coord}
                                ></Placemark>}
                            </Map>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                sx={{backgroundColor: '#F36C41', color: 'white', minWidth: '200px',
                                    '&.MuiButton-contained:hover':{
                                        backgroundColor: '#e04819'
                                    },
                                }}
                            >
                                Вернуться к главной странице
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </FormWrapper>
    );
};

export default AnswerQuestionBox;