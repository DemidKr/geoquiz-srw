import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ILegacyQuestion } from "../../shared/types/ILegacyQuestion";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { useAction } from "../../shared/hooks/useAction";
import { getAuthDataFromLS } from "../../store/action-creators/auth";
import { deleteQuestion } from "../../store/action-creators/questions";

interface QuestionCardProps {
  question: ILegacyQuestion;
  deleteButton: boolean;
}

export const LegacyQuestionCard: FC<QuestionCardProps> = ({
  question,
  deleteButton,
}) => {
  const { isLoading, error } = useAppSelector(state => state.questions);
  const dispatch = useAppDispatch();
  const addSnack = useAction();

  const navigator = useNavigate();

  const handleDelete = async () => {
    if (question.id) {
      const authData = dispatch(getAuthDataFromLS());

      const response = await dispatch(
        deleteQuestion({
          url: "/question",
          token: authData.access_token,
          id: question.id,
        }),
      );

      if (!response) {
        addSnack(`Ошибка в удалении, попробуйте снова. ${error}`, "error");
      } else {
        addSnack(`Успешно удален!`, "success");
        navigator("/main");
      }
    } else {
      addSnack(
        `Ошибка в удалении, попробуйте снова. Отсутствует id геоквиза`,
        "error",
      );
    }
  };

  return (
    <Card sx={{ width: 400, minHeight: 400 }}>
      <CardMedia
        sx={{ height: 260 }}
        image="https://cdn2.tu-tu.ru/image/pagetree_node_data/1/5efb261d5644d99162d58489de94d41d/"
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#F36C41" }}
              onClick={() => navigator("/question/" + question.id)}>
              {question.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "8px" }}>
            <Typography variant="body2" sx={{ color: "#959595" }}>
              Дата создания:{" "}
              {new Date(question.date).toLocaleDateString("en-GB")}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "8px" }}>
            <Button
              sx={{
                backgroundColor: "#F36C41",
                color: "white",
                "&.MuiButton-root:hover": {
                  backgroundColor: "#e04819",
                },
              }}
              onClick={() => navigator("/question/" + question.id)}>
              Перейти к геоквизу
            </Button>
            {deleteButton && (
              <Button
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "8px",
                  "&.MuiButton-root:hover": {
                    backgroundColor: "darkred",
                  },
                }}
                onClick={handleDelete}>
                Удалить геоквиз
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid container item xs={12} sx={{ marginTop: "4px" }}></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
