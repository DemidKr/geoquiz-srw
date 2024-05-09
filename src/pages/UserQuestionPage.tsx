import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux";
import { getUserQuestions } from "../store/action-creators/questions";
import { Container, Grid, Typography } from "@mui/material";
import { getAuthDataFromLS } from "../store/action-creators/auth";
import { IQuestion } from "../shared/types/questions";
import pic from "../shared/images/TemporaryPicture.jpg";
import secondPic from "../shared/images/TempPic2.jpg";

const hardcodedQuestions: IQuestion[] = [
  {
    id: 0,
    title: "Название",
    description: "Описание",
    username: "Пользователь",
    time: 90,
    stars: 4.3,
    timesFinished: 54,
    steps: 6,
    coordinates: [[1, 1]],
    imageUrl: pic,
  },
  {
    id: 1,
    title: "Название два",
    description: "Описание два",
    username: "Димас123",
    time: 45,
    stars: 5,
    timesFinished: 10,
    steps: 10,
    coordinates: [[1, 1]],
    imageUrl: secondPic,
  },
];

const UserQuestionPage = () => {
  const { isLoading, questions } = useAppSelector(state => state.questions);
  const dispatch = useAppDispatch();

  const shouldLoadQuestions = useRef(true);

  useEffect(() => {
    if (shouldLoadQuestions.current) {
      handleLoad();
    }
  }, [shouldLoadQuestions.current, dispatch]);

  const handleLoad = async () => {
    const authData = dispatch(getAuthDataFromLS());

    const questions = dispatch(
      getUserQuestions({
        url: "/question/user",
        token: authData.access_token,
      }),
    );
    console.log(questions);
    shouldLoadQuestions.current = false;
  };

  if (isLoading || shouldLoadQuestions.current) {
    return <h1>Loading...</h1>;
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
          ГЕОКВИЗЫ
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
        {/*{hardcodedQuestions?.map((question, index) => (*/}
        {/*    <QuestionCard question={question}/>*/}
        {/*))}*/}
        {questions.length === 0 && (
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
