import { IStep } from "./IStep";

export interface IQuestionForm {
  title: string;
  description: string;
  time: number;
  steps: IStep[];
  // ToDo: add upload images as a card background
  // imageUrl: any;
}
