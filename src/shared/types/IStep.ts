import { ICoordinates } from "./coordinates";

export interface IStep {
  id?: number;
  coordinates: ICoordinates;
  description: string;
}
