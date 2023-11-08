import {ICoordinates} from "./ICoordinates";

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