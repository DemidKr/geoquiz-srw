import React, {FC} from 'react';
import {Box, DialogActions} from "@mui/material";
import {Map, Placemark} from "@pbe/react-yandex-maps";
import {IGame} from "../../shared/interfaces/IGame";
import {IQuestion} from "../../shared/interfaces/IQuestion";
import {useNavigate} from "react-router-dom";
import {CustomDialogBox, CustomDialogContent, CustomDialogContentText, CustomDialogTitle, DialogButton} from "./styled";

interface ResultDialogProps {
    game: IGame,
    question: IQuestion,
    isOpen: boolean,

}

const ResultDialog: FC<ResultDialogProps> = ({game, question, isOpen}) => {
    const navigate = useNavigate()

    return (
        <CustomDialogBox open={isOpen}>
            <CustomDialogTitle>Результат</CustomDialogTitle>
            <CustomDialogContent>
                <CustomDialogContentText>
                    Ваш финальный результат составил {game.finalScore}/{game.step * 1000}
                </CustomDialogContentText>
                <Box sx={{ width: '100%', height: '200px' }}>
                    <Map
                        sx={{width: '100%', height: '100%'}}
                        className="rounded-map"
                        defaultState={{ center: game.coordinates, zoom: game.zoomLevel, controls: [] }}
                        options={{
                            copyrightLogoVisible: false,
                            copyrightUaVisible: false,
                            copyrightProvidersVisible: false,
                            suppressMapOpenBlock: true,
                        }}
                    >
                        {game.answer?.length !== 0 && <Placemark
                            options={{preset: 'islands#redIcon'}}
                            geometry={game.answer}
                        ></Placemark>}
                        {question.coordinates.map((item, index) => <Placemark
                            key={index}
                            options={{preset: 'islands#greenIcon'}}
                            geometry={item}
                        ></Placemark>)}
                    </Map>
                </Box>
            </CustomDialogContent>
            <DialogActions>
                <DialogButton onClick={() => navigate('/questions')} variant="contained">
                    Вернуться к странице квестов
                </DialogButton>
            </DialogActions>
        </CustomDialogBox>
    );
};

export default ResultDialog;
