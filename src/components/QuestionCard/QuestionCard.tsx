import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {IQuestion} from "../../shared/interfaces/IQuestion";
import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";

interface QuestionCardProps {
    question: IQuestion
}

export const QuestionCard: FC<QuestionCardProps> = ({question}) => {
    const navigator = useNavigate()

    return (
        <Card sx={{ width: 400, height: 420}} >
            <CardMedia
                sx={{ height: 260 }}
                image="https://cdn2.tu-tu.ru/image/pagetree_node_data/1/5efb261d5644d99162d58489de94d41d/"
            />
            <CardContent>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{color: '#F36C41'}}
                            onClick={() => navigator('/question/' + question.id)}
                        >
                            {question.name}
                        </Typography>
                    </Grid>
                    {/*TODO: Add stars later*/}
                    {/*<Grid container item xs={6} justifyContent="flex-end">*/}
                    {/*    {Array.from(Array(card.stars)).map((_, index) => (*/}
                    {/*        <CustomFullStarIcon/>*/}
                    {/*    ))}*/}
                    {/*    {Array.from(Array(5 - card.stars)).map((_, index) => (*/}
                    {/*        <CustomEmptyStarIcon/>*/}
                    {/*    ))}*/}
                    {/*</Grid>*/}
                </Grid>
                <Grid container >
                    <Grid item xs={6} sx={{marginTop: '4px'}}>
                        <Typography variant="body2" sx={{color: '#959595'}}>
                            Дата создания: {question.date.toString()}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <Button sx={{backgroundColor: '#F36C41', color: 'white'}} onClick={() => navigator('/question/' + question.id)}>Перейти к панораме</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
