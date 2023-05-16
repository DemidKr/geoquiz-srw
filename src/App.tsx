import React, {FC, useRef, useState} from 'react';
import CreateQuestionPage from "./pages/CreateQuestionPage/CreateQuestionPage";
import {withYMaps, YMaps} from "@pbe/react-yandex-maps";
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./shared/hooks/redux";
import {coordinatesSlice} from "./store/reducers/CoordinatesSlice";

const App: FC = () => {

    return (
            <CreateQuestionPage/>
    );
};

export default App;