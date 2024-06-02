import { ICoordinates } from "./coordinates";
import { IStars } from "./stars";
import { IResult } from "./result";

// TODO: change name to IQuestion
export interface IQuestionResponse {
  id?: number;
  title: string;
  description: string;
  time: number;
  stars: IStars[];
  timesFinished: number;
  imageUrl: string;
  isFinished: boolean;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    username: string;
  };
  coordinates: ICoordinates[];
  userId?: number;
  result: IResult[];
}

export interface IGetAllQuestionsResponse {
  pageCount: number;
  questions: IQuestionResponse[];
}

export interface IGetAllQuestionsDto {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface IQuestionRequest {
  title: string;
  description: string;
  time: number;
  file: Blob;
}

export interface IUpdateQuestionRequest {
  id: number;
  body: {
    title?: string;
    description?: string;
    time?: number;
  };
}
