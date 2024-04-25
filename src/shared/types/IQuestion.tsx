import {ICoordinates} from "./ICoordinates";

// TODO: remove this later
export interface IQuestion {
    id?: number;
    title: string;
    description: string;
    username: string;
    time: number;
    stars: number;
    timesFinished: number;
    steps: number;
    coordinates: number[][];
    imageUrl: any;

    // don't sure about this
    date?: Date;
    userId?: number;
}

// TODO: change name to IQuestion
export interface IQuestionResponse {
    id?: number;
    title: string;
    description: string;
    time: number;
    stars: number;
    timesFinished: number;
    imageUrl: string;
    isFinished: boolean;
    createdAt?: string;
    updatedAt?: string;
    user: {
        username: string;
    }
    coordinates: ICoordinates[]
    userId?: number;
}

export interface IGetAllQuestionsResponse {
    pageCount: number,
    questions: IQuestionResponse[]
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