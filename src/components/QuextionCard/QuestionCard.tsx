import React, { FC, useEffect, useState } from "react";
import { IQuestionResponse } from "../../shared/types/questions";
import { IStars } from "../../shared/types/IStars";
import PersonIcon from "@mui/icons-material/Person";
import TimerIcon from "@mui/icons-material/Timer";
import DoneIcon from "@mui/icons-material/Done";
import PlaceIcon from "@mui/icons-material/Place";
import ArticleIcon from "@mui/icons-material/Article";
import WarningIcon from "@mui/icons-material/Warning";
import {
  QuestionCardBtnWrapper,
  QuestionCardColumn,
  QuestionCardContainer,
  QuestionCardDescription,
  QuestionCardInfo,
  QuestionCardLoader,
  QuestionCardTitle,
  QuestionCardWarningContainer,
  QuestionCardWrapper,
} from "./QuestionCard.styled";
import Stars from "../Stars/Stars";
import TranslucentButton from "../TranslucentButton/TranslucentButton";
import { Tooltip } from "@mui/material";
import { AppPaths } from "../../shared/consts";

interface QuestionCardProps {
  question: IQuestionResponse;
  isLoading?: boolean;
  deleteOn?: boolean;
}

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  isLoading,
  deleteOn,
}) => {
  // TODO: move to utils
  const [stars, setStars] = useState<IStars>({
    fullStar: 0,
    halfStar: 0,
    emptyStar: 0,
  });

  useEffect(() => {
    const halfStar = question.stars - Math.floor(question.stars) >= 0.5 ? 1 : 0;
    setStars({
      fullStar: Math.floor(question.stars),
      halfStar: halfStar,
      emptyStar: 5 - Math.floor(question.stars) - halfStar,
    });
  }, []);

  if (isLoading) {
    return (
      <QuestionCardContainer isLoading>
        <QuestionCardLoader color="inherit" size={80} />
      </QuestionCardContainer>
    );
  }

  return (
    <>
      <QuestionCardContainer
        imageUrl={`${process.env.REACT_APP_SERVER_URL}/${question.imageUrl}`}>
        <QuestionCardWarningContainer>
          <Tooltip title="Квиз не опубликован" leaveDelay={200}>
            <WarningIcon color="warning" />
          </Tooltip>
        </QuestionCardWarningContainer>
        <QuestionCardColumn>
          <QuestionCardTitle>{question.title.toUpperCase()}</QuestionCardTitle>
          <QuestionCardWrapper>
            <ArticleIcon sx={{ color: "#FFF" }} />
            <QuestionCardDescription>
              {question.description}
            </QuestionCardDescription>
          </QuestionCardWrapper>
          <QuestionCardWrapper>
            <PersonIcon sx={{ color: "rgba(255, 255, 255, 0.60)" }} />
            <QuestionCardInfo>{question.user?.username}</QuestionCardInfo>
          </QuestionCardWrapper>
          <QuestionCardWrapper>
            <TimerIcon sx={{ color: "rgba(255, 255, 255, 0.60)" }} />
            <QuestionCardInfo>{question.time} сек</QuestionCardInfo>
          </QuestionCardWrapper>
          <QuestionCardWrapper>
            <DoneIcon sx={{ color: "rgba(255, 255, 255, 0.60)" }} />
            <QuestionCardInfo>
              Пройдено {question.timesFinished} раз
            </QuestionCardInfo>
          </QuestionCardWrapper>
          <QuestionCardWrapper>
            <PlaceIcon sx={{ color: "rgba(255, 255, 255, 0.60)" }} />
            <QuestionCardInfo>
              {question.coordinates.length} этапов
            </QuestionCardInfo>
          </QuestionCardWrapper>
          <QuestionCardWrapper>
            <Stars stars={stars} />
          </QuestionCardWrapper>
        </QuestionCardColumn>
        <QuestionCardBtnWrapper>
          <TranslucentButton link={`${AppPaths.QUESTION}/${question.id}`} />
        </QuestionCardBtnWrapper>
      </QuestionCardContainer>
    </>
  );
};

export default QuestionCard;
