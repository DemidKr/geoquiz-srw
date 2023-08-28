import React, {FC} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Map, Placemark} from "@pbe/react-yandex-maps";
import {IGame} from "../../shared/interfaces/IGame";
import {IQuestion} from "../../shared/interfaces/IQuestion";
import {CustomDialogBox, CustomDialogContent, CustomDialogContentText, CustomDialogTitle, DialogButton} from "./styled";

interface StepDialogProps {
    game: IGame,
    question: IQuestion,
    isOpen: boolean,
    close: () => void
}

const StepDialog: FC<StepDialogProps> = ({game, question, isOpen, close}) => {
    return (
        <CustomDialogBox open={isOpen}>
            <CustomDialogTitle>Этап {game.step}/{question.steps}</CustomDialogTitle>
            <CustomDialogContent>
                <CustomDialogContentText>
                    Ваш результат составил {game.scores[game.step - 1]}/1000. {game.scores[game.step - 1] > 900 ? 'Вы очень хороши в географии!' : 'Попробуйте еще!'}
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
                        {game.answer?.length !== 0 &&
                            <Placemark
                                options={{preset: 'islands#redIcon'}}
                                geometry={game.answer}
                            ></Placemark>}
                        {game.coordinates?.length !== 0 &&
                            <Placemark
                                options={{preset: 'islands#greenIcon'}}
                                geometry={game.coordinates}
                            ></Placemark>}
                    </Map>
                </Box>
            </CustomDialogContent>
            <DialogActions>
                <DialogButton onClick={close} variant="contained">Продолжить</DialogButton>
            </DialogActions>
        </CustomDialogBox>
    );
};

export default StepDialog;