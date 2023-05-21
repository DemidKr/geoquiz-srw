import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CoordinatesState {
    coordinates: number[];
    isLoading: boolean;
    error: string;
}

const initialState: CoordinatesState = {
    coordinates: [55.733685, 37.588264],
    isLoading: false,
    error: ''
}

export const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState,
    reducers: {
        changeCoordinates(state, action: PayloadAction<number[]>) {
            state.coordinates = action.payload
        }
    }
})