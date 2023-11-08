import React, {FC, useEffect, useState} from 'react';

import {IQuestionResponse} from "../../shared/types/IQuestion";
import {IStars} from "../../shared/types/IStars";

import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
import DoneIcon from '@mui/icons-material/Done';
import PlaceIcon from '@mui/icons-material/Place';
import ArticleIcon from '@mui/icons-material/Article';

import {
    QuestionCardBtnWrapper,
    QuestionCardColumn,
    QuestionCardContainer, QuestionCardDescription, QuestionCardInfo,
    QuestionCardTitle,
    QuestionCardWrapper,
} from "./QuestionCard.styled";
import Stars from "../Stars/Stars";
import TranslucentButton from "../TranslucentButton/TranslucentButton";
import secondPic from "../../shared/images/TempPic2.jpg";
import { CircularProgress } from "@mui/material";

interface QuestionCardProps {
    question: IQuestionResponse,
    deleteOn?: boolean
}

const QuestionCard: FC<QuestionCardProps> = ({question, deleteOn}) => {
    const [stars, setStars]= useState<IStars>({
        fullStar: 0,
        halfStar: 0,
        emptyStar: 0
    })

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isValid, setIsValid] = useState<boolean>(false);

    function isImgUrl(url: string) {
        return fetch(url, {method: 'HEAD'}).then(res => {
            const contentType = res.headers.get('Content-Type')
            setIsValid(contentType ? contentType.startsWith('image') : false)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        const halfStar = question.stars - Math.floor(question.stars) >= 0.5 ? 1 : 0
        setStars({
            fullStar: Math.floor(question.stars),
            halfStar: halfStar,
            emptyStar: 5 - Math.floor(question.stars) - halfStar
        })
        isImgUrl(question.imageUrl)
    }, [])


    if(isLoading) {
        return (
            <QuestionCardContainer imageUrl={''}>
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%'
                    }}
                />
            </QuestionCardContainer>
        )
    }

    return (
        <>
            <QuestionCardContainer imageUrl={isValid ? question.imageUrl : secondPic}>
                <QuestionCardColumn>
                    <QuestionCardTitle>
                        {question.title.toUpperCase()}
                    </QuestionCardTitle>
                    <QuestionCardWrapper>
                        <ArticleIcon sx={{color: '#FFF'}}/>
                        <QuestionCardDescription>
                            {question.description}
                        </QuestionCardDescription>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <PersonIcon sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>
                        <QuestionCardInfo>
                            {question.user.username}
                        </QuestionCardInfo>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <TimerIcon sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>
                        <QuestionCardInfo>
                            {question.time} сек
                        </QuestionCardInfo>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <DoneIcon sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>
                        <QuestionCardInfo>
                            Пройдено {question.timesFinished} раз
                        </QuestionCardInfo>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <PlaceIcon sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>
                        <QuestionCardInfo>
                            {question.coordinates.length} этапов
                        </QuestionCardInfo>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <Stars stars={stars}/>
                    </QuestionCardWrapper>
                </QuestionCardColumn>
                <QuestionCardBtnWrapper>
                    <TranslucentButton link={'/question/' + question.id}/>
                </QuestionCardBtnWrapper>
            </QuestionCardContainer>
        </>
    );
};

export default QuestionCard;