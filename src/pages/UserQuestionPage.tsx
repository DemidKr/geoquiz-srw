import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux";
import { getUserQuestions } from "../store/action-creators/questions";
import { Container, Grid, Typography } from "@mui/material";
import { getAuthDataFromLS } from "../store/action-creators/auth";
import { IQuestion } from "../shared/types/questions";
import pic from "../shared/images/TemporaryPicture.jpg";
import secondPic from "../shared/images/TempPic2.jpg";
import {
  useFetchAllQuestionsQuery,
  useFetchUserQuestionQuery,
} from "../store/api/questionApi";
import { useSearchParams } from "react-router-dom";
import { useAction } from "../shared/hooks/useAction";
import Loader from "../components/Loader/Loader";
import QuestionCard from "../components/QuextionCard/QuestionCard";

const UserQuestionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const addSnack = useAction();

  const initialPage =
    Number(searchParams.get("page")) >= 1
      ? Number(searchParams.get("page"))
      : 1;

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(initialPage);

  const {
    data: questionsData,
    error,
    isLoading,
    isFetching,
  } = useFetchUserQuestionQuery({
    search,
    page,
    perPage: 8,
  });

  const isQuestionDataEmpty =
    !!questionsData && questionsData.questions.length === 0;

  useEffect(() => {
    if (error) {
      addSnack("Не удалось загрузить квизы", "error");
    }
  }, [isLoading]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <Container
        sx={{
          width: "100%",
          height: "103px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography
          component="div"
          sx={{
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "11.2px",
            fontWeight: 600,
            // color: '#474747',
            textDecoration: "uppercase",
          }}>
          ВАШИ
        </Typography>
        <Typography
          component="div"
          sx={{
            marginTop: "27px",
            fontFamily: "Montserrat",
            fontSize: "46px",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "3.6px",
            fontWeight: 700,
            // color: '#2D2D2D',
            textDecoration: "uppercase",
          }}>
          ВИКТОРИНЫ
        </Typography>
      </Container>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          justifyContent: "center",
          maxWidth: "1350px",
          marginTop: "50px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        {questionsData &&
          questionsData?.questions?.map((question, index) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        {isQuestionDataEmpty && (
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ padding: "15px" }}>
            <Typography variant="h5" component="div" align="center">
              Еще не создано ни одного геоквиза
            </Typography>
          </Grid>
        )}
      </Grid>
      {/*</Grid>*/}
      {/*<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" sx={{margin: '5px'}}>*/}
      {/*    {questions?.map((question, index) => (*/}
      {/*        <Grid item xs={2} sm={4} md={4} key={index} display="flex" justifyContent="center" sx={{marginTop: '10px'}}>*/}
      {/*            <LegacyQuestionCard question={question} deleteButton={true}/>*/}
      {/*        </Grid>*/}
      {/*    ))}*/}
      {/*    {questions.length === 0 && <Grid container direction='column' alignItems='center' sx={{padding: '15px'}} >*/}
      {/*            <Typography*/}
      {/*                variant="h5"*/}
      {/*                component="div"*/}
      {/*                align='center'*/}
      {/*            >*/}
      {/*                Вами еще не создано ни одного геоквиза*/}
      {/*            </Typography>*/}
      {/*    </Grid>}*/}
      {/*</Grid>*/}
    </>
  );
};

export default UserQuestionPage;
