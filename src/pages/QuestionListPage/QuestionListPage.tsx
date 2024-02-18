import React, {useEffect, useState} from 'react';
import {CssBaseline, Grid, Pagination, Typography} from "@mui/material";
import Header from "../../components/Header/Header";
import QuestionCard from "../../components/QuextionCard/QuestionCard";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import {useFetchAllQuestionsQuery} from "../../store/api/questionApi";
import {useAction} from "../../shared/hooks/useAction";
import * as S from './QuestionListPage.styled'

const QuestionListPage = () => {
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const addSnack = useAction()

    const {
        data: questionsData,
        error,
        isLoading
    } = useFetchAllQuestionsQuery({
        search,
        page,
        perPage: 8
    })

    useEffect(() => {
        console.log('questions', questionsData)
        console.log('error', error)
        if (error) {
            addSnack('Не удалось загрузить квизы...', 'error')
        }
    }, [isLoading])


    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        if(!questionsData) {
            return;
        }

        if(newPage >= 1 && newPage <= questionsData.pageCount) {
            setPage(newPage)
        }
    }

    const isQuestionDataEmpty = !!questionsData && questionsData.questions.length === 0


    if (isLoading) {
        return <LoadingScreen/>
    }

    return (
        <>
            <CssBaseline/>
            <Header themeSwitcherOn={true} small={true}/>
            <S.TitlesContainer>
                <S.MainTitle component="div">
                    сотни
                </S.MainTitle>
                <S.SubTitle component="div">
                    бесплатных квестов
                </S.SubTitle>
            </S.TitlesContainer>
            <S.CardsContainer container>
                {questionsData && questionsData.questions?.map((question, index) => (
                    <QuestionCard question={question}/>
                ))}
                {isQuestionDataEmpty &&
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        sx={{padding: '15px'}}
                    >
                        <Typography
                            variant="h5"
                            component="div"
                            align='center'
                        >
                            Еще не создано ни одного геоквиза
                        </Typography>
                </Grid>}
            </S.CardsContainer>
            <S.PaginationContainer>
                {questionsData &&
                    <Pagination
                        onChange={handlePageChange}
                        count={questionsData.pageCount}
                        shape="rounded"
                    />
                }
            </S.PaginationContainer>
        </>
    );
};

export default QuestionListPage;