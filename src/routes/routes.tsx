import React from "react";
import {Navigate} from "react-router-dom";
import QuestionListPage from "../pages/QuestionListPage";
import CreateQuestionPage from "../pages/CreateQuestionPage";
import QuestionPage from "../pages/QuestionPage";
import UserQuestionPage from "../pages/UserQuestionPage";
import MainPage from "../pages/MainPage";
import GuidePage from "../pages/GuidePage";
import ProfilePage from "../pages/ProfilePage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";

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
        path: '/auth',
        element: <AuthPage />,
    },
    {
        path: '/guide',
        element: <GuidePage />,
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
        path: '/profile',
        element: <ProfilePage />,
    },
    {
        path: '/guide',
        element: <GuidePage />,
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
    {
        path: '/guide',
        element: <GuidePage />,
    },
    // ToDo: add not found page
    { path: '*', element: <Navigate to='/main' replace /> },
]


export const adminRoutes: Array<IRouter> = [
    {
        path: '/main',
        element: <MainPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
    },
    {
        path: '/guide',
        element: <GuidePage />,
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
    {
        path: '/guide',
        element: <GuidePage />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
    },
    // ToDo: add not found page
    { path: '*', element: <Navigate to='/main' replace /> },
]