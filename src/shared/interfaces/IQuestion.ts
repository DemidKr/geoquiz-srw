export interface IQuestion {
    id?: number;

    name: string;

    coordinates: number[];

    date: Date;

    userId?: number;
}