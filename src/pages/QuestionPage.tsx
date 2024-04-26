import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Grid,} from "@mui/material";
import {useAppDispatch} from "../shared/hooks/redux";
import {Map, Panorama, Placemark, useYMaps} from "@pbe/react-yandex-maps";
import {MapWrapper} from "../components/Map/Map.styled";
import {useAction} from "../shared/hooks/useAction";
import {GameBox, GameButton, GameText, GameTitle, HideHintButton, HintText} from "../components/GameBox/GameBox.styled";
import '../Map.css'
import StepDialog from "../components/Dialogs/StepDialog";
import ResultDialog from "../components/Dialogs/ResultDialog";
import {useFetchQuestionQuery} from "../store/api/questionApi";
import {ICoordinates} from "../shared/types/coordinates";
import Loader from "../components/Loader/Loader";


const QuestionPage = () => {
    const ymaps = useYMaps(['package.full']);
    const addSnack = useAction()
    const dispatch = useAppDispatch()

    const { id } = useParams()

    const {data: question, error, isLoading} = useFetchQuestionQuery(Number(id))

    const [panoramaCoordinates, setPanoramaCoordinates] = useState<number[]>([])
    const [answer, setAnswer] = useState<number[]>([])
    const [scores, setScores] = useState<number[]>([])
    const [answersArray, setAnswersArray] = useState<number[][]>([])
    const [finalScore, setFinalScore] = useState<number>(0)
    const [stepText, setStepText] = useState<string>('')
    const [zoomLevel, setZoomLevel] = useState<number>(6)
    const [currentStep, setCurrentStep] = useState<number>(1)

    const [showHint, setShowHint] = useState<boolean>(true)
    const [showStepWindow, setShowStepWindow] = useState<boolean>(false)
    const [showResultWindow, setShowResultWindow] = useState<boolean>(false)

    const [timerClock, setTimerClock] = useState<number>(-1)

    useEffect(() => {
        if (error) {
            addSnack('Не удалось загрузить квиз...', 'error')
        }

        if(ymaps && question) {
            if(question.coordinates.length === 0 ) {
                return;
            }

            const lat = question.coordinates[0].lat
            const lng = question.coordinates[0].lng

            setTimerClock(question.time)

            let locateRequest = ymaps.panorama.locate( [lat, lng]);

            locateRequest.then(
                // @ts-ignore
                function (panoramas) {
                    console.log('panoramas', panoramas)

                    if (panoramas.length) {
                        console.log("Ура, нашлась панорама " + panoramas[0]);
                        setPanoramaCoordinates([lat, lng])
                    } else {
                        addSnack("Для заданной точки не найдено ни одной панорамы", "warning")
                    }
                },
                function (err) {
                    console.log("При попытке получить панораму возникла ошибка.");
                }
            );
        } else {
            console.log('YPlayer or ymaps is null')
        }
    }, [ymaps, isLoading]);

    useEffect(() => {
        if (timerClock === 0 && showStepWindow) {
            addSnack('Время вышло!', 'info')
            handleAnswer()
        }
        if (timerClock > 0 && showStepWindow) {
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
        setShowResultWindow(true)
        // send result here
    }

    const handleAnswer = () => {
        setStepText(answer.length === 0 ? stepText + 'Вы не дали ответ' : stepText + 'Ваш ответ принят')
        setAnswersArray([...answersArray, answer])
        if (question) {
            // check with right coordinates instead of 0
            let lat = Math.floor((5 - Math.abs(answer[0] - question.coordinates[currentStep - 1].lat))/5 * 1000)
            let lng = Math.floor((10 - Math.abs(answer[1] - question.coordinates[currentStep - 1].lng))/10 * 1000)
            let res = Math.floor((lat + lng) / 2)

            if (lat < 0 || lng < 0 || isNaN(res)) {
                setZoomLevel(2)
                setScores([...scores, 0])
            } else {
                setZoomLevel(res > 900 ? 6 : 4)
                setScores([...scores, res])
                setFinalScore(finalScore + res)
            }

            if (currentStep >= question.coordinates.length) {
                finishGame()
            } else {
                setShowStepWindow(true)
            }
        }
    }

    const handleClose = () => {
        const curStep = currentStep
        setShowStepWindow(false)
        if(question) {
            const coordinatesObj: ICoordinates = question.coordinates[curStep]
            console.log('coordinatesObj', coordinatesObj)
            setPanoramaCoordinates([coordinatesObj.lat, coordinatesObj.lng])
            setStepText('')
            setAnswer([])
            setCurrentStep(currentStep + 1)
            setTimerClock(question.time)
        }
    }

    if (isLoading || panoramaCoordinates.length === 0 || !question) {
        return <Loader/>
    }

    return (
        <>
            <Grid container style={{width: '100%'}}>
                <Grid item xs={12}>
                    <MapWrapper>
                        <Panorama point={panoramaCoordinates} style={{ width: '100%', height: `calc(100% - 80px)` }}
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
            <GameBox>
                <Grid container direction='column' alignItems='center' gap='10px'>
                    <GameTitle component="div">{question.title}</GameTitle>
                    <GameText component='div'>{currentStep}/{question.coordinates.length} этап</GameText>
                    {showHint && <HintText component="div">
                        Подсказка: Перед вами панорама,
                        ваша задача как можно точнее определить где на карте находится это место.
                        Вы можете перемещаться с помощью стрелок на панораме или курсора с кружком.
                        Подсказки могут быть на билбордах, дорожных знаках и в прочих особенностях.
                        Удачи в поиске!
                        <HideHintButton component="span" onClick={() => setShowHint(false)}>
                            Скрыть
                        </HideHintButton>
                    </HintText>}
                    <Box sx={{ width: '100%' }}>
                        <Map
                            style={{ width: '100%', height: '200px'}}
                            className="rounded-map"
                            defaultState={{ center: [47.23620154498959, 39.712672605191955], zoom: 9, controls: [] }}
                            options={{
                                copyrightLogoVisible: false,
                                copyrightUaVisible: false,
                                copyrightProvidersVisible: false,
                                suppressMapOpenBlock: true,
                            }}
                            // Function to add placemarks to the map; TODO: find type of event
                            onClick={(e: any) => setAnswer(e._sourceEvent.originalEvent.coords)}
                        >
                            {answer?.length !== 0 && <Placemark geometry={answer}></Placemark>}
                        </Map>
                    </Box>
                    <GameText component="div">Осталось времени: {timerClock} сек</GameText>
                    <GameButton
                        disabled={showStepWindow}
                        onClick={handleAnswer}
                        variant='contained'
                    >
                        Подтвердить ответ
                    </GameButton>
                </Grid>
            </GameBox>
            <StepDialog
                currentStep={currentStep}
                scores={scores}
                panoramaCoordinates={panoramaCoordinates}
                zoomLevel={zoomLevel}
                answer={answer}
                question={question}
                isOpen={showStepWindow}
                close={handleClose}
            />
            <ResultDialog
                currentStep={currentStep}
                finalScore={finalScore}
                panoramaCoordinates={panoramaCoordinates}
                zoomLevel={zoomLevel}
                answer={answer}
                question={question}
                isOpen={showResultWindow}
            />
        </>
    );
};

export default QuestionPage;