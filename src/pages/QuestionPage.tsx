import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    Box,
    CssBaseline,
    Grid,
} from "@mui/material";
import {getQuestions} from "../store/action-creators/questions";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {Map, Panorama, Placemark, useYMaps} from "@pbe/react-yandex-maps";
import {MapWrapper} from "../components/Map/styled";
import Header from "../components/Header/Header";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import secondPic from "../shared/images/TempPic2.jpg";
import {useAction} from "../shared/hooks/useAction";
import {GameBox, GameButton, GameText, GameTitle, HideHintButton, HintText} from "../components/GameBox/styled";
import {IGame, IGameInterface} from "../shared/interfaces/IGame";
import '../Map.css'
import StepDialog from "../components/Dialogs/StepDialog";
import ResultDialog from "../components/Dialogs/ResultDialog";
import {hardcodedQuestion} from "../temporary/data/questionData";


const QuestionPage = () => {
    const ymaps = useYMaps(['package.full']);
    const panoramaRef = useRef<any>(null);
    const yplayer = useRef<any>(null)

    const [questionData, setQuestionData] = useState<any>({})
    const [isParsing, setIsParsing] = useState<boolean>(true)

    const [game, setGame] = useState<IGame>({
        coordinates: [],
        answer: [],
        step: 1,
        scores: [],
        answersArray: [],
        finalScore: 0,
        stepText: '',
        zoomLevel: 6,
    })

    const [gameInterface, setGameInterface] = useState<IGameInterface>({
        showHint: true,
        showStepWindow: false,
        showResultWindow: false,
    })

    const [timerClock, setTimerClock] = useState<number>(-1)

    const addSnack = useAction()
    const { id } = useParams()
    const {isLoading, error} = useAppSelector(state => state.questions)


    const dispatch = useAppDispatch()

    useEffect(() => {
        setGame({
            ...game,
            coordinates: hardcodedQuestion.coordinates[0],
            //question.data.coordinates
        })
        setTimerClock(
            //question.data.time
            hardcodedQuestion.time
        )
        setIsParsing(false)
    }, [])

    useEffect(() => {
        if (!ymaps || !panoramaRef.current) {
            return;
        }

        handleGetQuestion().then(function (question) {
            console.log(question)
            // @ts-ignore
            let locateRequest = ymaps.panorama.locate(
                //question.data.coordinates
                hardcodedQuestion.coordinates[0]
            );

            if(question) {
                setQuestionData(question.data)
                setTimerClock(
                    //question.data.time
                    hardcodedQuestion.time
                )
                console.log(question.data)
            }


            locateRequest.then(
                function (panoramas) {
                    if (panoramas.length) {
                        console.log("Ура, нашлась панорама " + panoramas[0]);
                        let player = new ymaps.panorama.Player(panoramaRef.current, panoramas[0], {
                            direction: [10, 10],
                            controls: [],
                            suppressMapOpenBlock: true,
                            hotkeysEnabled: false
                        });
                        yplayer.current = player
                        console.log('game changed')
                        setGame({
                            ...game,
                            coordinates: hardcodedQuestion.coordinates[0],
                            //question.data.coordinates
                        })
                    } else {
                        console.log("Для заданной точки не найдено ни одной панорамы.");
                    }

                },
                function (err) {
                    console.log("При попытке получить панораму возникла ошибка.");
                }

            );
        })
    }, [ymaps]);

    useEffect(() => {
        if (timerClock === 0 && !gameInterface.showStepWindow) {
            addSnack('Время вышло!', 'info')
            handleAnswer()
        }
        if (timerClock > 0 && !gameInterface.showStepWindow) {
            const timer = setTimeout(function() {
                console.log("minus: ", timerClock)
                setTimerClock(timerClock - 1);
            }, 1000)

            return () => { // this should work flawlessly besides some milliseconds lost here and there
                clearTimeout(timer)
            }
        }
    }, [timerClock]);

    const handleGetQuestion = async () => {
        const question = dispatch(getQuestions({
            url: '/question/' + id,
        }))

        return question
    }

    const finishGame = () => {
        setGameInterface({...gameInterface, showResultWindow: true})
        // send result
    }

    const handleAnswer = () => {
        setGame({
            ...game,
            stepText: game.answer.length === 0 ? game.stepText + 'Вы не дали ответ' : game.stepText + 'Ваш ответ принят',
            answersArray: [...game.answersArray, game.answer]
        })
        let lat = Math.floor((5 - Math.abs(game.answer[0] - game.coordinates[0]))/5 * 1000)
        let lng = Math.floor((10 - Math.abs(game.answer[1] - game.coordinates[1]))/10 * 1000)
        let res = Math.floor((lat + lng) / 2)
        console.log('res', res)
        if (lat < 0 || lng < 0 || isNaN(res)) {
            setGame({...game, zoomLevel: 2, scores: [...game.scores, 0]})
        } else {
            setGame({...game, zoomLevel: res > 900 ? 6 : 4, scores: [...game.scores, res], finalScore: game.finalScore + res})
        }
        if (game.step >= hardcodedQuestion.steps) {
            finishGame()
        } else {
            setGameInterface({...gameInterface, showStepWindow: true})
        }
    }

    const handleClose = () => {
        const currentStep = game.step
        setGameInterface({...gameInterface, showStepWindow: false})
        setGame({...game, coordinates: hardcodedQuestion.coordinates[currentStep], stepText: '', answer: [], step: game.step + 1})
        setTimerClock(hardcodedQuestion.time)
    }

    if (isLoading || error || isParsing) {
        return <LoadingScreen/>
    }

    return (
        <>
            <CssBaseline/>
            <Header small={true} themeSwitcherOn={true}/>
            <Grid container style={{width: '100%'}}>
                <Grid item xs={12}>
                    <MapWrapper>
                        <Panorama point={game.coordinates} style={{ width: '100%', height: `calc(100% - 80px)` }}
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
                    <GameTitle component="div">{hardcodedQuestion.title}</GameTitle>
                    <GameText component='div'>{game.step}/{hardcodedQuestion.steps} этап</GameText>
                    {gameInterface.showHint && <HintText component="div">
                        Подсказка: Перед вами панорама,
                        ваша задача как можно точнее определить где на карте находится это место.
                        Вы можете перемещаться с помощью стрелок на панораме или курсора с кружком.
                        Подсказки могут быть на билбордах, дорожных знаках и в прочих особенностях.
                        Удачи в поиске!
                        <HideHintButton component="span" onClick={() => setGameInterface({...gameInterface, showHint: false})}>
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
                            onClick={(e: any) => setGame({...game, answer: e._sourceEvent.originalEvent.coords})}
                        >
                            {game.answer?.length !== 0 && <Placemark geometry={game.answer}></Placemark>}
                        </Map>
                    </Box>
                    <GameText component="div">Осталось времени: {timerClock} сек</GameText>
                    <GameButton
                        disabled={gameInterface.showStepWindow}
                        onClick={handleAnswer}
                        variant='contained'
                    >
                        Подтвердить ответ
                    </GameButton>
                </Grid>
            </GameBox>
            <StepDialog game={game} question={hardcodedQuestion} isOpen={gameInterface.showStepWindow} close={handleClose}/>
            <ResultDialog game={game} question={hardcodedQuestion} isOpen={gameInterface.showResultWindow}/>
        </>
    );
};

export default QuestionPage;