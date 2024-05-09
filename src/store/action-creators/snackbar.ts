import { AppDispatch } from "../store";
import { snackbarSlice } from "../reducers/SnackbarSlice";

export const addSnack =
  (message: string, variant: "success" | "warning" | "error" | "info") =>
  (dispatch: AppDispatch) => {
    const id = new Date().getTime();
    dispatch(snackbarSlice.actions.enqueueSnackbar({ id, message, variant }));
  };
