import React, {Dispatch, FC, SetStateAction} from 'react';
import {CustomDialogBox, CustomDialogContent, CustomDialogTitle, DialogButton} from "./styled";
import {Box, DialogActions, Slider, TextField} from "@mui/material";
import {Map, Placemark} from "@pbe/react-yandex-maps";
import {IQuestionForm} from "../../shared/interfaces/IQuestionForm";
import {GameText} from "../GameBox/styled";

interface FormDialogProps {
    question: IQuestionForm,
    setQuestion: Dispatch<SetStateAction<IQuestionForm>>,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    handleCreate: () => void
}

const marks = [
    {
        value: 10,
        label: '10',
    },
    {
        value: 90,
        label: '90',
    },
];

const FormDialog: FC<FormDialogProps> = ({question, setQuestion, isOpen, setIsOpen, handleCreate}) => {

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setQuestion({...question, time: newValue as number});
    };

    return (
        <CustomDialogBox open={isOpen}>
            <CustomDialogTitle>Завершение создания</CustomDialogTitle>
            <CustomDialogContent>
                <TextField
                    fullWidth
                    sx={{mt: '5px'}}
                    label="Название"
                    value={question.title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setQuestion({...question, title: event.target.value});
                    }}
                />
                <TextField
                    fullWidth
                    label="Описание"
                    value={question.description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setQuestion({...question, description: event.target.value});
                    }}
                />
                <GameText component='div'>Время на прохождение: </GameText>
                <Slider
                    aria-label="Custom marks"
                    value={question.time}
                    onChange={handleSliderChange}
                    defaultValue={45}
                    min={10}
                    max={90}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
                <Box sx={{ width: '100%', height: '200px' }}>
                    <Map
                        sx={{width: '100%', height: '100%'}}
                        className="rounded-map"
                        defaultState={{
                            center: question.coordinates.length ? question.coordinates[0] : [47.23620154498959, 39.712672605191955],
                            zoom: 9,
                            controls: []
                        }}
                        options={{
                            copyrightLogoVisible: false,
                            copyrightUaVisible: false,
                            copyrightProvidersVisible: false,
                            suppressMapOpenBlock: true,
                        }}
                    >
                        {question.coordinates.map((coord, index) =>
                            <Placemark
                                key={index}
                                options={{preset: 'islands#greenIcon'}}
                                geometry={coord}
                            ></Placemark>)}
                    </Map>
                </Box>
                <GameText component='div'>Количество этапов: {question.steps}</GameText>
            </CustomDialogContent>
            <DialogActions>
                <DialogButton onClick={handleCreate} variant="contained">Завершить</DialogButton>
            </DialogActions>
        </CustomDialogBox>
    );
};

export default FormDialog;