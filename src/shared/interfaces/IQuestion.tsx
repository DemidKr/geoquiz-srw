export interface IQuestion {
    id?: number;
    title: string;
    description: string;
    username: string;
    time: number;
    stars: number;
    timesFinished: number;
    steps: number;
    coordinates: number[];
    imageUrl: any;

    // don't sure about this
    date?: Date;
    userId?: number;
}