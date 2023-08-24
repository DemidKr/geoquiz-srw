import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, CssBaseline, Grid} from "@mui/material";
import LegacyHeader from "../components/LegacyHeader/LegacyHeader";
import {getQuestions} from "../store/action-creators/questions";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {useYMaps} from "@pbe/react-yandex-maps";
import {MapWrapper} from "../components/Map/styles";
import AnswerQuestionBox from "../components/AnswerQuestionBox/AnswerQuestionBox";
import Header from "../components/Header/Header";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const QuestionPage = () => {
    const { id } = useParams()
    const {isLoading, error} = useAppSelector(state => state.questions)
    const ymaps = useYMaps(['package.full']);

    const panoramaRef = useRef<any>(null);
    const yplayer = useRef<any>(null)
    const [coordinates, setCoordinates] = useState<number[]>([55.83403, 37.623370])
    const [name, setName] = useState<string>('')

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!ymaps || !panoramaRef.current) {
            return;
        }

        handleGetQuestion().then(function (question) {
            console.log(question)
            // @ts-ignore
            let locateRequest = ymaps.panorama.locate(question.data.coordinates);
            console.log(coordinates)
            if(question) {
                setCoordinates(question.data.coordinates)
                setName(question.data.name)
            }
            console.log(coordinates)

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
        })


    }, [ymaps]);

    const handleGetQuestion = async () => {
        const question = dispatch(getQuestions({
            url: '/question/' + id,
        }))

        return question
    }

    if (isLoading || error) {
        return <LoadingScreen/>
    }

    return (
        <>
            <CssBaseline/>
            <Header small={true} themeSwitcherOn={true}/>
            <Grid container style={{width: '100%'}}>
                <Grid item xs={12}>
                    <MapWrapper>
                        <div ref={panoramaRef} style={{ width: '100%', height: `calc(100% - 64px)` }} />
                    </MapWrapper>
                </Grid>
            </Grid>
            <AnswerQuestionBox coord={coordinates} name={name}/>
        </>
    );
};

export default QuestionPage;