import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../shared/hooks/redux";
import { adminRoutes, publicRoutes, userRoutes } from "./routes";
import React from "react";
import Loader from "../components/Loader/Loader";

const AppRouter = () => {
  const { isAuth, role, isLoading } = useAppSelector(store => store.user);

  const getRouts = () => {
    if (!isAuth) {
      return publicRoutes;
    } else {
      if (role.name === "admin") return adminRoutes;
      return userRoutes;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {getRouts().map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
