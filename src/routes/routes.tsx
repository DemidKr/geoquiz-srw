import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import QuestionListPage from "../pages/QuestionListPage/QuestionListPage";
import EditCoordinatesPage from "../pages/EditCoordinatesPage";
import QuestionPage from "../pages/QuestionPage";
import UserQuestionPage from "../pages/UserQuestionPage";
import MainPage from "../pages/MainPage";
import GuidePage from "../pages/GuidePage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import { AppPaths } from "../shared/consts";
import ProfilePage from "../pages/ProfilePage";
import CreateQuizPage from "../pages/CreateQuizPage/CreateQuizPage";
import EditQuizPage from "../pages/EditQuizPage/EditQuizPage";

interface IRouter {
  path: string;
  element: React.ReactNode;
}

export const publicRoutes: Array<IRouter> = [
  {
    path: AppPaths.MAIN,
    element: <MainPage />,
  },
  {
    path: AppPaths.AUTH,
    element: <AuthPage />,
  },
  {
    path: AppPaths.GUIDE,
    element: <GuidePage />,
  },
  {
    path: AppPaths.QUESTIONS,
    element: <QuestionListPage />,
  },
  {
    path: `${AppPaths.QUESTION}/:id`,
    element: <QuestionPage />,
  },
  { path: "*", element: <Navigate to={AppPaths.MAIN} replace /> },
];

export const userRoutes: Array<IRouter> = [
  {
    path: AppPaths.MAIN,
    element: <MainPage />,
  },
  {
    path: AppPaths.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: AppPaths.GUIDE,
    element: <GuidePage />,
  },
  {
    path: AppPaths.QUESTIONS,
    element: <QuestionListPage />,
  },
  {
    path: `${AppPaths.QUESTION}/:id`,
    element: <QuestionPage />,
  },
  {
    path: `${AppPaths.EDIT_COORDINATES}/:id`,
    element: <EditCoordinatesPage />,
  },
  {
    path: AppPaths.USER_QUESTIONS,
    element: <UserQuestionPage />,
  },
  {
    path: AppPaths.CREATE_QUIZ,
    element: <CreateQuizPage />,
  },
  {
    path: `${AppPaths.EDIT_QUIZ}/:id`,
    element: <EditQuizPage />,
  },
  // ToDo: add not found page
  { path: "*", element: <Navigate to={AppPaths.MAIN} replace /> },
];

export const adminRoutes: Array<IRouter> = [
  {
    path: AppPaths.MAIN,
    element: <MainPage />,
  },
  {
    path: AppPaths.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: AppPaths.GUIDE,
    element: <GuidePage />,
  },
  {
    path: AppPaths.QUESTIONS,
    element: <QuestionListPage />,
  },
  {
    path: `${AppPaths.QUESTION}/:id`,
    element: <QuestionPage />,
  },
  {
    path: `${AppPaths.EDIT_COORDINATES}/:id`,
    element: <EditCoordinatesPage />,
  },
  {
    path: AppPaths.USER_QUESTIONS,
    element: <UserQuestionPage />,
  },
  {
    path: AppPaths.ADMIN,
    element: <AdminPage />,
  },
  {
    path: AppPaths.CREATE_QUIZ,
    element: <CreateQuizPage />,
  },
  {
    path: `${AppPaths.EDIT_QUIZ}/:id`,
    element: <EditQuizPage />,
  },
  // ToDo: add not found page
  { path: "*", element: <Navigate to={AppPaths.MAIN} replace /> },
];

export const router = createBrowserRouter(publicRoutes);
