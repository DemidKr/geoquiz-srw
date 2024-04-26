import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {CustomDialogBox, CustomDialogContent, CustomDialogContentText, CustomDialogTitle, DialogButton} from "./Dialog.styled";
import {DialogActions, TextField} from "@mui/material";
import {IQuestionForm} from "../../shared/types/IQuestionForm";
import {GameText} from "../GameBox/GameBox.styled";
import CloseIcon from "@mui/icons-material/Close";
import {Theme} from "../../store/reducers/ThemeSlice";
import {AbsolutButton} from "../CreateQuestionBox/CreateQuestionBox.styled";
import {useAppSelector} from "../../shared/hooks/redux";
import {ICoordinates} from "../../shared/types/coordinates";

interface CreateStepDialogProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    question: IQuestionForm;
    setQuestion: Dispatch<SetStateAction<IQuestionForm>>;
    coordinates: ICoordinates;

}

const CreateStepDialog: FC<CreateStepDialogProps> = ({isOpen, setIsOpen, question, setQuestion, coordinates}) => {
    const {theme} = useAppSelector(state => state.theme)

    const [desc, setDesc] = useState<string>('')

    const handleStepChanges = () => {
        setQuestion({...question, steps: [...question.steps, {coordinates, desc}]})
        setIsOpen(false)
        setDesc('')
    }

    const handleClose = () => {
        setIsOpen(false)
        setDesc('')
    }

    return (
        <CustomDialogBox open={isOpen} onClose={handleClose}>
            <CustomDialogTitle>Настройка этапа </CustomDialogTitle>
            <AbsolutButton right={'8px'} top={'8px'} onClick={handleClose}>
                <CloseIcon sx={{width: '20px', height: '20px', color: theme === Theme.DARK ? '#FFF' : '#000'}}/>
            </AbsolutButton>
            <CustomDialogContent>
                <CustomDialogContentText component='div'>Координаты:</CustomDialogContentText>
                <GameText component='div'>{coordinates.lat} {coordinates.lng}</GameText>
                <TextField
                    fullWidth
                    sx={{mt: '5px'}}
                    label="Описание локации"
                    value={desc}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDesc(event.target.value);
                    }}
                />
            </CustomDialogContent>
            <DialogActions>
                <DialogButton onClick={handleStepChanges} variant="contained">Сохранить этап</DialogButton>
            </DialogActions>
        </CustomDialogBox>
    );
};

export default CreateStepDialog;