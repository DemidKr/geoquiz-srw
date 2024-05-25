import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchQuestionQuery,
  usePublishQuestionMutation,
  useUpdateQuestionMutation,
} from "../../store/api/questionApi";
import * as S from "../../components/QuizForm/QuizForm.styled";
import { Grid, Typography } from "@mui/material";
import TimeSlider from "../../components/TimeSlider/TimeSlider";
import QuestionCardPreview from "../../components/QuextionCard/QuestionCardPreview";
import { TimeValues } from "../../shared/consts/enum";
import { AppPaths } from "../../shared/consts";
import Loader from "../../components/Loader/Loader";
import { useAction } from "../../shared/hooks/useAction";

const EditQuizPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = React.useState<number>(TimeValues.DEFAULT);

  const { id } = useParams();
  const navigate = useNavigate();
  const addSnack = useAction();

  const {
    data: question,
    error,
    isLoading,
  } = useFetchQuestionQuery(Number(id));

  const [updateQuestion, updateResult] = useUpdateQuestionMutation();
  const [publishQuestion, publishResult] = usePublishQuestionMutation();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleNavigateToEdit = () => {
    navigate(`${AppPaths.EDIT_COORDINATES}/${id}`);
  };

  const handleUpdate = () => {
    updateQuestion({
      id: Number(id),
      body: {
        title,
        description,
        time,
      },
    });
  };

  const handlePublish = () => {
    publishQuestion(Number(id));
  };

  const isSaveButtonDisabled =
    title === question?.title &&
    description === question?.description &&
    time === question?.time;

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setDescription(question.description);
      setTime(question.time);
    }
  }, [question]);

  useEffect(() => {
    if (updateResult.isSuccess) {
      addSnack("Викторина обновлена", "success");
    }
  }, [updateResult]);

  useEffect(() => {
    if (publishResult.isSuccess) {
      addSnack("Викторина опубликована", "success");
    }
  }, [publishResult]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <S.PaperBackground>
      <S.ContentBox>
        <Grid container spacing={2}>
          <S.GridColumn item xl={8} md={6} xs={12} alignItems={"flex-start"}>
            <S.MainTitle>Редактирование викторины:</S.MainTitle>
            <S.Input
              label="Название"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <S.Input
              label="Описание"
              value={description}
              onChange={handleDescriptionChange}
              multiline
              maxRows={5}
              required
            />
            <TimeSlider time={time} setTime={setTime} />
            <Typography>
              Количество панорам: {question?.coordinates.length ?? 0}/10
            </Typography>
            <Grid
              display={"flex"}
              flexDirection={"row"}
              gap={"10px"}
              justifySelf={"flex-end"}>
              <S.SubmitButton
                variant="contained"
                onClick={handleUpdate}
                disabled={isSaveButtonDisabled}>
                Сохранить изменения
              </S.SubmitButton>
              <S.SubmitButton
                variant="contained"
                onClick={handleNavigateToEdit}>
                Редактировать координаты
              </S.SubmitButton>
              <S.SubmitButton
                variant="contained"
                onClick={handlePublish}
                disabled={question?.isFinished}>
                Опубликовать викторину
              </S.SubmitButton>
            </Grid>
          </S.GridColumn>
          <S.GridColumn
            item
            xl={4}
            sm={6}
            xs={12}
            sx={{ alignItems: { md: "flex-end", sm: "flex-start" } }}>
            <S.GridColumn alignItems="flex-start">
              <S.MainTitle>Предпросмотр:</S.MainTitle>
              <QuestionCardPreview
                title={title}
                description={description}
                time={time}
                imageUrl={question?.imageUrl}
                timesFinished={question?.timesFinished}
                coordinatesNumber={question?.coordinates.length}
              />
            </S.GridColumn>
          </S.GridColumn>
        </Grid>
      </S.ContentBox>
    </S.PaperBackground>
  );
};

export default EditQuizPage;
