import {IGetQuestions, IGetUserQuestions} from "./IGetQuestions";
import {IQuestion} from "./IQuestion";

export interface ICreateQuestion extends IGetUserQuestions {
    question: IQuestion;
}