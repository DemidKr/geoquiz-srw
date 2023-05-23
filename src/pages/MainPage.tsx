import React, {useEffect, useRef} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import Header from "../components/Header/Header";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {getAuthDataFromLS} from "../store/action-creators/auth";
import {getQuestions} from "../store/action-creators/questions";
import {QuestionCard} from "../components/QuestionCard/QuestionCard";

const MainPage = () => {
    const {isLoading, questions} = useAppSelector(state => state.questions)
    const dispatch = useAppDispatch()

    const shouldLoadQuestions = useRef(true)

    useEffect(() => {
        if(shouldLoadQuestions.current) {
            handleLoad()
        }


    }, [shouldLoadQuestions.current])

    const handleLoad = async () => {
        const questions = dispatch(getQuestions({
            url: '/question',
        }))
        console.log(questions)
        shouldLoadQuestions.current = false
    }


    if (isLoading || shouldLoadQuestions.current) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" sx={{margin: '5px'}}>
                {questions?.map((question, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} display="flex" justifyContent="center" sx={{marginTop: '10px'}}>
                        <QuestionCard question={question}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default MainPage;