import React, {FC, useState} from 'react';
import {IStars} from "../../shared/types/IStars";
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
import DoneIcon from '@mui/icons-material/Done';
import PlaceIcon from '@mui/icons-material/Place';
import ArticleIcon from '@mui/icons-material/Article';
import {
    Container,
    QuestionCardBtnWrapper,
    QuestionCardColumn,
    QuestionCardContainer, QuestionCardDescription, QuestionCardInfo, QuestionCardLoader,
    QuestionCardTitle,
    QuestionCardWrapper,
} from "./QuestionCard.styled";
import Stars from "../Stars/Stars";
import TranslucentButton from "../TranslucentButton/TranslucentButton";


interface QuestionCardPreviewProps {
    title: string,
    description: string,
    time: number
    children: React.ReactNode
    isLoading?: boolean
    deleteOn?: boolean
}

const QuestionCardPreview: FC<QuestionCardPreviewProps> = ({title, description, time, children, isLoading, deleteOn}) => {
    // TODO: move to utils
    const [stars, setStars]= useState<IStars>({
        fullStar: 5,
        halfStar: 0,
        emptyStar: 0
    })


    if(isLoading) {
        return (
            <QuestionCardContainer isLoading>
                <QuestionCardLoader color='inherit' size={80}/>
            </QuestionCardContainer>
        )
    }

    return (
        <>
            <Container >
                {/*TODO: add default background if children not passed*/}
                {children}
                <QuestionCardColumn>
                    <QuestionCardTitle>
                        {(title || "Название").toUpperCase()}
                    </QuestionCardTitle>
                    <QuestionCardWrapper>
                        <ArticleIcon sx={{color: '#FFF'}}/>
                        <QuestionCardDescription>
                            {description || "Описание"}
                        </QuestionCardDescription>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <PersonIcon sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>
                        <QuestionCardInfo>
                            {/*TODO: add username from hook*/}
                            You
                        </QuestionCardInfo>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <TimerIcon sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>
                        <QuestionCardInfo>
                            {time} сек
                        </QuestionCardInfo>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <DoneIcon sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>
                        <QuestionCardInfo>
                            Пройдено 0 раз
                        </QuestionCardInfo>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <PlaceIcon sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>
                        <QuestionCardInfo>
                            0 этапов
                        </QuestionCardInfo>
                    </QuestionCardWrapper>
                    <QuestionCardWrapper>
                        <Stars stars={stars}/>
                    </QuestionCardWrapper>
                </QuestionCardColumn>
                <QuestionCardBtnWrapper>
                    <TranslucentButton/>
                </QuestionCardBtnWrapper>
            </Container>
        </>
    );
};

export default QuestionCardPreview;