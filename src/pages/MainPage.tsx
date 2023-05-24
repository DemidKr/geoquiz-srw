import React, {useEffect, useRef} from 'react';
import {CssBaseline, Grid, Paper, Typography} from "@mui/material";
import Header from "../components/Header/Header";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
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
            <Grid container direction='column' alignItems='center' sx={{padding: '15px'}} >
                <Paper elevation={3} sx={{padding: '15px'}}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{color: '#F36C41'}}
                    >
                        Испытайте себя в знаниях россии и ее географии!
                        Любой пользователь может пройти Геоквиз,
                        однако создание собственного Геоквиза возможно только после регистрации или логина.
                    </Typography>
                </Paper>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" sx={{margin: '5px'}}>
                {questions?.map((question, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} display="flex" justifyContent="center" sx={{marginTop: '10px'}}>
                        <QuestionCard question={question} deleteButton={false}/>
                    </Grid>
                ))}
                {questions.length === 0 && <Grid container direction='column' alignItems='center' sx={{padding: '15px'}} >
                        <Typography
                            variant="h5"
                            component="div"
                            align='center'
                        >
                            Еще не создано ни одного геоквиза
                        </Typography>
                </Grid>}
            </Grid>
        </>
    );
};

export default MainPage;