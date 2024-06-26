import React, { useEffect, useState } from "react";
import { Grid, Pagination, Typography } from "@mui/material";
import QuestionCard from "../../components/QuextionCard/QuestionCard";
import { useFetchAllQuestionsQuery } from "../../store/api/questionApi";
import { useAction } from "../../shared/hooks/useAction";
import * as S from "./QuestionListPage.styled";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const QuestionListPage = () => {
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
  } = useFetchAllQuestionsQuery({
    search,
    page,
    perPage: 8,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    if (!questionsData) {
      return;
    }

    if (newPage >= 1 && newPage <= questionsData.pageCount) {
      setSearchParams(params => {
        params.set("page", String(newPage));
        return params;
      });
    }
  };

  const isQuestionDataEmpty =
    !!questionsData && questionsData.questions.length === 0;

  useEffect(() => {
    if (error) {
      addSnack("Не удалось загрузить квизы", "error");
    }
  }, [isLoading]);

  useEffect(() => {
    const pageSearch = Number(searchParams.get("page"));
    if (
      questionsData?.pageCount &&
      pageSearch >= 1 &&
      pageSearch <= questionsData?.pageCount
    ) {
      setPage(pageSearch);
    }
  }, [searchParams]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <S.TitlesContainer>
        <S.MainTitle component="div">сотни</S.MainTitle>
        <S.SubTitle component="div">викторин</S.SubTitle>
      </S.TitlesContainer>
      <S.CardsContainer container>
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
              Еще не создано ни одной викторины
            </Typography>
          </Grid>
        )}
      </S.CardsContainer>
      <S.PaginationContainer>
        {questionsData && (
          <Pagination
            onChange={handlePageChange}
            page={page}
            count={questionsData?.pageCount}
            shape="rounded"
          />
        )}
      </S.PaginationContainer>
    </>
  );
};

export default QuestionListPage;
