import RegisterPage from "../pages/RegisterPage";
import React from "react";
import LoginPage from "../pages/LoginPage";
import {Navigate} from "react-router-dom";
import QuestionListPage from "../pages/QuestionListPage";
import CreateQuestionPage from "../pages/CreateQuestionPage";
import QuestionPage from "../pages/QuestionPage";
import UserQuestionPage from "../pages/UserQuestionPage";
import MainPage from "../pages/MainPage";

interface IRouter {
    path: string
    element: React.ReactNode
}

export const publicRoutes: Array<IRouter> = [
    {
        path: '/main',
        element: <MainPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/questions',
        element: <QuestionListPage />,
    },
    {
        path: '/question/:id',
        element: <QuestionPage />,
    },
    { path: '*', element: <Navigate to='/main' replace /> },
]

export const userRoutes: Array<IRouter> = [
    {
        path: '/main',
        element: <MainPage />,
    },
    {
        path: '/questions',
        element: <QuestionListPage />,
    },
    {
        path: '/question/:id',
        element: <QuestionPage />,
    },
    {
        path: '/createQuestion',
        element: <CreateQuestionPage />,
    },
    {
        path: '/userQuestions',
        element: <UserQuestionPage />,
    },
    { path: '*', element: <Navigate to='/main' replace /> },
]
//