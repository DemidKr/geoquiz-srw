export interface IQuestionForm {
    title: string;
    description: string;
    time: number;
    steps: number;
    coordinates: number[][];
    // ToDo: add upload images as a card background
    // imageUrl: any;
}