import React, {useEffect, useRef} from 'react';
import { Container, CssBaseline, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {getQuestions} from "../store/action-creators/questions";
import Header from "../components/Header/Header";
import QuestionCard from "../components/QuextionCard/QuestionCard";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import {hardcodedQuestions} from "../temporary/data/questionListData";

const QuestionListPage = () => {
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
        return <LoadingScreen/>
    }

    return (
        <>
            <CssBaseline/>
            <Header themeSwitcherOn={true} small={true}/>
            <Container
                sx={{
                    width:'100%',
                    height: '103px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography
                    component="div"
                    sx={{
                        fontFamily: 'Montserrat',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '11.2px',
                        fontWeight: 600,
                        // color: '#474747',
                        textDecoration: 'none',
                    }}
                >
                    СОТНИ
                </Typography>
                <Typography
                    component="div"
                    sx={{
                        marginTop: '27px',
                        fontFamily: 'Montserrat',
                        fontSize: '46px',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '3.6px',
                        fontWeight: 700,
                        // color: '#2D2D2D',
                        textDecoration: 'none',
                    }}
                >
                    БЕСПЛАТНЫХ КВЕСТОВ
                </Typography>
            </Container>
            <Grid container sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '25px',
                justifyContent: 'center',
                maxWidth: '1350px',
                marginTop: '50px',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                {hardcodedQuestions?.map((question, index) => (
                    <QuestionCard question={question}/>
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

export default QuestionListPage;