import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Snack {
  id: number;
  message: string;
  variant: "success" | "warning" | "error" | "info";
}

export interface SnackState {
  snack: Snack;
}

const initialState: SnackState = {
  snack: {} as Snack,
};

export const snackbarSlice = createSlice({
  name: "snackbars",
  initialState,
  reducers: {
    enqueueSnackbar: (state, action: PayloadAction<Snack>) => {
      state.snack = action.payload;
    },
  },
});
