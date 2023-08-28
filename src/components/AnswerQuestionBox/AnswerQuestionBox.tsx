import React, {useEffect, useState} from 'react';
import {FormWrapper} from "../CreateQuestionBox/styled";
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
import secondPic from "../../shared/images/TempPic2.jpg";

interface AnswerQuestionBoxProps {
    coord: number[],
    name: string
}

const hardcodedQuestion = {
        id: 1,
        title: 'Название два',
        description: 'Описание два',
        username: 'Димас123',
        time: 45,
        stars: 5,
        timesFinished: 10,
        steps: 3,
        coordinates: [[47.250073801272386, 39.849086235290045], [47.26830478974905, 39.722743461852545], [47.213592874536324, 39.72291512322952]],
        imageUrl: secondPic
    }

const AnswerQuestionBox = ({coord, name}: AnswerQuestionBoxProps) => {
    const ymaps = useYMaps(['package.full']);

    const [currentAnswer, setCurrentAnswer] = useState<number[]>([])
    const [currentStep, setCurrentStep] = useState<number>(1)

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

    const finishGame = () => {

    }

    const handleAnswer = () => {
        if (currentStep >= hardcodedQuestion.steps) {
            finishGame()
        } else {
            console.log(coord)
            console.log(currentAnswer)

            if(currentAnswer.length === 0) {
                setText(text + 'Вы не дали ответ')
            } else {
                setText(text + 'Ваш ответ принят')
                let lat = Math.floor((5 - Math.abs(currentAnswer[0] - coord[0]))/5 * 1000)
                let lng = Math.floor((10 - Math.abs(currentAnswer[1] - coord[1]))/10 * 1000)
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
    }

    const handleClose = () => {

    }

    return (
        <FormWrapper>
            <Grid container direction='column' alignItems='center' sx={{padding: '15px'}}>
                <Typography
                    variant="h5"
                    component="div"
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
                        onClick={(e: any) => setCurrentAnswer(e._sourceEvent.originalEvent.coords)}
                    >
                        {currentAnswer?.length !== 0 && <Placemark geometry={currentAnswer}></Placemark>}
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
                                {currentAnswer?.length !== 0 && <Placemark
                                    options={{
                                        preset: 'islands#redIcon'
                                    }}
                                    geometry={currentAnswer}
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