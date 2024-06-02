import React, { FC } from "react";
import { IQuestionResponse } from "../../shared/types/questions";
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
import TranslucentButton from "../TranslucentButton/TranslucentButton";
import { Rating, Tooltip } from "@mui/material";
import { AppPaths } from "../../shared/consts";
import QuestionCardMenu from "./QuestionCardMenu";
import { getAverageStars } from "../../shared/utils/getAverageStars";

interface QuestionCardProps {
  question: IQuestionResponse;
  isUserOptionAvailable?: boolean;
  isLoading?: boolean;
}

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  isLoading,
  isUserOptionAvailable = false,
}) => {
  const isPublished = question?.isFinished;

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
          {!isPublished && (
            <Tooltip title="Квиз не опубликован" leaveDelay={200}>
              <WarningIcon color="warning" />
            </Tooltip>
          )}

          <QuestionCardMenu
            id={Number(question.id)}
            isUserOptionAvailable={isUserOptionAvailable}
          />
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
              Пройдено {question.result.length} раз
            </QuestionCardInfo>
          </QuestionCardWrapper>
          <QuestionCardWrapper>
            <PlaceIcon sx={{ color: "rgba(255, 255, 255, 0.60)" }} />
            <QuestionCardInfo>
              {question.coordinates.length} этапов
            </QuestionCardInfo>
          </QuestionCardWrapper>
          <QuestionCardWrapper>
            <Rating
              name="read-only"
              value={getAverageStars(question.stars)}
              readOnly
              precision={0.5}
            />
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
