import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {CssBaseline, Grid} from "@mui/material";
import Header from "../components/Header/Header";
import {getAuthDataFromLS} from "../store/action-creators/auth";
import {getQuestions} from "../store/action-creators/questions";
import {useAppDispatch} from "../shared/hooks/redux";
import {useYMaps} from "@pbe/react-yandex-maps";
import {MapWrapper} from "../components/Map/styles";
import AnswerQuestionBox from "../components/AnswerQuestionBox/AnswerQuestionBox";

const QuestionPage = () => {
    const { id } = useParams()
    const ymaps = useYMaps(['package.full']);
    const panoramaRef = useRef<any>(null);
    const yplayer = useRef<any>(null)
    const shouldLoadQuestions = useRef(true)
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

    // useEffect(() => {
    //     if(shouldLoadQuestions.current) {
    //         shouldLoadQuestions.current = false
    //         handleGetQuestion()
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     if (yplayer.current) {
    //         yplayer.current.moveTo(coordinates)
    //     }
    // }, [coordinates])

    const handleGetQuestion = async () => {
        const question = dispatch(getQuestions({
            url: '/question/'+id,
        }))

        return question
    }

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
            <AnswerQuestionBox coord={coordinates} name={name}/>
        </>
    );
};

export default QuestionPage;