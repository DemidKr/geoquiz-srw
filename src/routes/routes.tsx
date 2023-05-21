import RegisterPage from "../pages/RegisterPage";
import React from "react";
import LoginPage from "../pages/LoginPage";
import {Navigate} from "react-router-dom";
import MainPage from "../pages/MainPage";
import CreateQuestionPage from "../pages/CreateQuestionPage";

interface IRouter {
    path: string
    element: React.ReactNode
}

export const publicRoutes: Array<IRouter> = [
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/main',
        element: <MainPage />,
    },
    // {
    //     path: '/quiz/:id',
    //     element: <QuestionPage />,
    // },

    { path: '*', element: <Navigate to='/main' replace /> },
]

export const userRoutes: Array<IRouter> = [
    // {
    //     path: '/profile',
    //     element: <Profile />,
    // },
    {
        path: '/main',
        element: <MainPage />,
    },
    // {
    //     path: '/quiz/:id',
    //     element: <QuestionPage />,
    // },
    {
        path: '/createQuestion',
        element: <CreateQuestionPage />,
    },
    { path: '*', element: <Navigate to='/main' replace /> },
]
//