import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchAllQuestionResultQuery } from "../../store/api/resultApi";
import { useAction } from "../../shared/hooks/useAction";
import Loader from "../../components/Loader/Loader";
import * as S from "../QuestionListPage/QuestionListPage.styled";
import dayjs from "dayjs";

const LeaderboardPage = () => {
  const { id } = useParams();
  const addSnack = useAction();

  const { data, error, isLoading, isFetching } = useFetchAllQuestionResultQuery(
    Number(id),
  );

  useEffect(() => {
    if (error) {
      addSnack("Не удалось загрузить результаты", "error");
    }
  }, [isLoading]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <S.TitlesContainer>
        <S.MainTitle component="div">таблица</S.MainTitle>
        <S.SubTitle component="div">лидеров</S.SubTitle>
      </S.TitlesContainer>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          maxWidth: "1350px",
          marginTop: "50px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell align="right">Пользователь</TableCell>
                <TableCell align="right">Дата</TableCell>
                <TableCell align="right">Счет</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{row.users.username}</TableCell>
                  <TableCell align="right">
                    {dayjs(row.createdAt).format("DD.MM.YYYY HH:ss")}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default LeaderboardPage;
