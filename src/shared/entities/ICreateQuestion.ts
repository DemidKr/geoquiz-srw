import {IGetUserQuestions} from "./IGetQuestions";
import {ILegacyQuestion} from "./ILegacyQuestion";

export interface ICreateQuestion extends IGetUserQuestions {
    question: ILegacyQuestion;
}