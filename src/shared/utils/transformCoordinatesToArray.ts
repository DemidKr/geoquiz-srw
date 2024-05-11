import { ICoordinates } from "../types/coordinates";

export const transformCoordinatesToArray = (coordinates: ICoordinates) => {
  return [coordinates.lat, coordinates.lng];
};
