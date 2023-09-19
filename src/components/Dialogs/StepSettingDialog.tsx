import React, {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from 'react';
import {CustomDialogBox, CustomDialogContent, CustomDialogContentText, CustomDialogTitle, DialogButton} from "./styled";
import {Box, DialogActions, FormControlLabel, Switch, TextField} from "@mui/material";
import {Map, Placemark} from "@pbe/react-yandex-maps";
import {IQuestionForm} from "../../shared/interfaces/IQuestionForm";
import {GameText} from "../GameBox/styled";
import CloseIcon from '@mui/icons-material/Close';
import {AbsolutButton} from "../CreateQuestionBox/styled";
import {useAppSelector} from "../../shared/hooks/redux";
import {Theme} from "../../store/reducers/ThemeSlice";

interface CreateStepDialogProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    question: IQuestionForm;
    handleStepChanges: (doesCoordChange: boolean, newDesc: string) => void;
    coordinates: number[];
    description: string;
    index: number;
}

const CreateStepDialog: FC<CreateStepDialogProps> = (props) => {
    const {isOpen, setIsOpen, question, description, handleStepChanges, coordinates, index} = props
    const [desc, setDesc] = useState<string>(description)
    const [doesCoordChange, setDoesCoordChange] = useState<boolean>(false)
    const {theme} = useAppSelector(state => state.theme)

    const isSameCoord = useMemo(() => {
            return question.steps[index].coordinates[0] === coordinates[0] && question.steps[index].coordinates[1] === coordinates[1]
        }, [question.steps[index], coordinates]);


    useEffect(() => {
        setDesc(description)
    }, [description, isOpen])

    const handleSave = () => {
        console.log(doesCoordChange)
        handleStepChanges(doesCoordChange, desc)
        setIsOpen(false)
        setDoesCoordChange(false)
    }

    const handleClose = () => {
        setIsOpen(false)
        setDoesCoordChange(false)
    }

    return (
        <CustomDialogBox open={isOpen} onClose={handleClose}>
            <CustomDialogTitle>Настройка этапа </CustomDialogTitle>
            <AbsolutButton right={'8px'} top={'8px'} onClick={handleClose}>
                <CloseIcon sx={{width: '20px', height: '20px', color: theme === Theme.DARK ? '#FFF' : '#000'}}/>
            </AbsolutButton>
            <CustomDialogContent>
                {!isSameCoord && <>
                    <CustomDialogContentText component='div'>Нынешние координаты:</CustomDialogContentText>
                    <GameText component='div'>{coordinates[0]} {coordinates[1]}</GameText>
                </>}
                <CustomDialogContentText component='div'>Координаты этапа:</CustomDialogContentText>
                <GameText component='div'>{question.steps[index].coordinates[0]} {question.steps[index].coordinates[1]}</GameText>
                {!isSameCoord &&
                    <FormControlLabel
                        control={<Switch value={doesCoordChange} onChange={() => setDoesCoordChange(!doesCoordChange)} />}
                        label="Изменить координаты этапа на нынешние координаты"
                    />}
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
                <DialogButton onClick={handleSave} variant="contained">Сохранить изменения</DialogButton>
            </DialogActions>
        </CustomDialogBox>
    );
};

export default CreateStepDialog;