import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {getQuestions, getUserQuestions} from "../store/action-creators/questions";
import {CssBaseline, Grid, Paper, Typography} from "@mui/material";
import Header from "../components/Header/Header";
import {QuestionCard} from "../components/QuestionCard/QuestionCard";
import {getAuthDataFromLS} from "../store/action-creators/auth";

const UserQuestionPage = () => {
    const {isLoading, questions} = useAppSelector(state => state.questions)
    const dispatch = useAppDispatch()

    const shouldLoadQuestions = useRef(true)

    useEffect(() => {
        if(shouldLoadQuestions.current) {
            handleLoad()
        }


    }, [shouldLoadQuestions.current, dispatch])

    const handleLoad = async () => {
        const authData = dispatch(getAuthDataFromLS());

        const questions = dispatch(getUserQuestions({
            url: '/question/user',
            token: authData.access_token
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
                        variant="h3"
                        component="div"
                        align='center'
                        sx={{color: '#F36C41'}}
                    >
                        Мои геоквизы
                    </Typography>
                </Paper>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" sx={{margin: '5px'}}>
                {questions?.map((question, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} display="flex" justifyContent="center" sx={{marginTop: '10px'}}>
                        <QuestionCard question={question} deleteButton={true}/>
                    </Grid>
                ))}
                {questions.length === 0 && <Grid container direction='column' alignItems='center' sx={{padding: '15px'}} >
                        <Typography
                            variant="h5"
                            component="div"
                            align='center'
                        >
                            Вами еще не создано ни одного геоквиза
                        </Typography>
                </Grid>}
            </Grid>
        </>
    );
};

export default UserQuestionPage;