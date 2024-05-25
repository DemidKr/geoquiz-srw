export interface ICoordinates {
  id?: number;
  lat: number;
  lng: number;
  description?: string;
  questionId?: number;
  createdAt?: string;
  updatedAt?: string;
}

type ISimpleCoordinates = Pick<ICoordinates, "lat" | "lng" | "description">;
export type ICreateUpdateOneCoordinatesRequest = Pick<
  ICoordinates,
  "lat" | "lng" | "description" | "questionId"
>;

export interface IUpdateCoordinates {
  id: number;
  body: ICreateUpdateOneCoordinatesRequest;
}

export interface ICreateCoordinatesRequest {
  questionId: number;
  coordinates: Array<ISimpleCoordinates>;
}
