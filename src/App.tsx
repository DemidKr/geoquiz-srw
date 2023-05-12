import React, {FC} from 'react';
import CreateQuestionPage from "./pages/CreateQuestionPage/CreateQuestionPage";
import {YMaps} from "@pbe/react-yandex-maps";

const App: FC = () => {
    return (
        <YMaps query={{ apikey: 'abf6f29e-7805-4c21-9d41-fd91bfd35987'}} preload={true}>
           <CreateQuestionPage/>
        </YMaps>
    );
};

export default App;