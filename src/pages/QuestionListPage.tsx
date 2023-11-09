import React, {useEffect, useRef} from 'react';
import { Container, CssBaseline, Grid, Typography} from "@mui/material";
import Header from "../components/Header/Header";
import QuestionCard from "../components/QuextionCard/QuestionCard";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import {useFetchAllQuestionsQuery} from "../store/api/questionApi";
import {useAction} from "../shared/hooks/useAction";

const QuestionListPage = () => {
    const addSnack = useAction()

    const {data: questions, error, isLoading} = useFetchAllQuestionsQuery()

    useEffect(() => {
        console.log('questions', questions)
        console.log('error', error)
        if (error) {
            addSnack('Не удалось загрузить квизы...', 'error')
        }
    }, [isLoading])

    if (isLoading) {
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
                        textDecoration: 'none',
                        textTransform: 'uppercase'
                    }}
                >
                    сотни
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
                        textDecoration: 'none',
                        textTransform: 'uppercase'
                    }}
                >
                    бесплатных квестов
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
                {questions && questions?.map((question, index) => (
                    <QuestionCard question={question}/>
                ))}
                {questions && questions.length === 0 && <Grid container direction='column' alignItems='center' sx={{padding: '15px'}} >
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