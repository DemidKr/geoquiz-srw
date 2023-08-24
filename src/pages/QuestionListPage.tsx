import React, {useEffect, useRef} from 'react';
import { Container, CssBaseline, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../shared/hooks/redux";
import {getQuestions} from "../store/action-creators/questions";
import Header from "../components/Header/Header";
import QuestionCard from "../components/QuextionCard/QuestionCard";
import {IQuestion} from "../shared/interfaces/IQuestion";
import pic from "../shared/images/TemporaryPicture.jpg"
import secondPic from "../shared/images/TempPic2.jpg"
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const hardcodedQuestions: IQuestion[] = [
    {
        id: 0,
        title: 'Название',
        description: 'Описание',
        username: 'Пользователь',
        time: 90,
        stars: 4.3,
        timesFinished: 54,
        steps: 6,
        coordinates: [1,1],
        imageUrl: pic
    },
    {
        id: 1,
        title: 'Название два',
        description: 'Описание два',
        username: 'Димас123',
        time: 45,
        stars: 5,
        timesFinished: 10,
        steps: 10,
        coordinates: [1,1],
        imageUrl: secondPic
    },
    {
        id: 0,
        title: 'Название',
        description: 'Описание',
        username: 'Пользователь',
        time: 90,
        stars: 1,
        timesFinished: 54,
        steps: 6,
        coordinates: [1,1],
        imageUrl: pic
    },
    {
        id: 1,
        title: 'Название два',
        description: 'Описание два',
        username: 'Димас123',
        time: 45,
        stars: 2.6,
        timesFinished: 10,
        steps: 10,
        coordinates: [1,1],
        imageUrl: secondPic
    },
    {
        id: 0,
        title: 'Название',
        description: 'Описание',
        username: 'Пользователь',
        time: 90,
        stars: 2.45,
        timesFinished: 54,
        steps: 6,
        coordinates: [1,1],
        imageUrl: pic
    },
    {
        id: 1,
        title: 'Название два',
        description: 'Описание два',
        username: 'Димас123',
        time: 45,
        stars: 4.44,
        timesFinished: 10,
        steps: 10,
        coordinates: [1,1],
        imageUrl: secondPic
    },
]

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