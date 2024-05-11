export interface ICoordinates {
  id?: number;
  lat: number;
  lng: number;
  questionId?: number;
  createdAt?: string;
  updatedAt?: string;
}

type ISimpleCoordinates = Pick<ICoordinates, "lat" | "lng">;

export interface ICreateCoordinatesRequest {
  questionId: number;
  coordinates: Array<ISimpleCoordinates>;
}
