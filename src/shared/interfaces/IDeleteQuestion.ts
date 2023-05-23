import {IGetQuestions, IGetUserQuestions} from "./IGetQuestions";

export interface IDeleteQuestion extends IGetUserQuestions {
    id: number;
}