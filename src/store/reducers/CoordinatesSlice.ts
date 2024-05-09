import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CoordinatesState {
  coordinates: number[];
  isLoading: boolean;
  error: string;
}

const initialState: CoordinatesState = {
  coordinates: [47.23620154498959, 39.712672605191955],
  isLoading: false,
  error: "",
};

export const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    changeCoordinates(state, action: PayloadAction<number[]>) {
      state.coordinates = action.payload;
    },
  },
});
