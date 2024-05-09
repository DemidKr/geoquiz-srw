import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux";
import { adminRoutes, publicRoutes, userRoutes } from "./routes";
import React, { useEffect } from "react";
import { useSnackbar } from "notistack";

const AppRouter = () => {
  const { isAuth, role } = useAppSelector(store => store.user);
  const { snack } = useAppSelector(store => store.snackbar);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (snack && snack.id) {
      enqueueSnackbar(snack.message, {
        autoHideDuration: 4000,
        variant: snack.variant,
        key: snack.id,
      });
    }
  }, [snack, enqueueSnackbar]);

  const getRouts = () => {
    if (!isAuth) {
      return publicRoutes;
    } else {
      if (role.name === "admin") return adminRoutes;
      return userRoutes;
    }
  };

  return (
    <Routes>
      {getRouts().map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
