import React from "react";
import {Navigate} from "react-router-dom";
import QuestionListPage from "../pages/QuestionListPage/QuestionListPage";
import CreateQuestionPage from "../pages/CreateQuestionPage";
import QuestionPage from "../pages/QuestionPage";
import UserQuestionPage from "../pages/UserQuestionPage";
import MainPage from "../pages/MainPage";
import GuidePage from "../pages/GuidePage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import {AppPaths} from "../shared/consts";
import ProfilePage from "../pages/ProfilePage";

interface IRouter {
    path: string
    element: React.ReactNode
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
        path: AppPaths.QUESTION,
        element: <QuestionPage />,
    },
    { path: '*', element: <Navigate to={AppPaths.MAIN} replace /> },
]

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
        path: AppPaths.QUESTION,
        element: <QuestionPage />,
    },
    {
        path: AppPaths.CREATE_QUESTION,
        element: <CreateQuestionPage />,
    },
    {
        path: AppPaths.USER_QUESTIONS,
        element: <UserQuestionPage />,
    },
    // ToDo: add not found page
    { path: '*', element: <Navigate to={AppPaths.MAIN} replace /> },
]


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
        path: AppPaths.QUESTION,
        element: <QuestionPage />,
    },
    {
        path: AppPaths.CREATE_QUESTION,
        element: <CreateQuestionPage />,
    },
    {
        path: AppPaths.USER_QUESTIONS,
        element: <UserQuestionPage />,
    },
    {
        path: AppPaths.ADMIN,
        element: <AdminPage />,
    },
    // ToDo: add not found page
    { path: '*', element: <Navigate to={AppPaths.MAIN} replace /> },
]