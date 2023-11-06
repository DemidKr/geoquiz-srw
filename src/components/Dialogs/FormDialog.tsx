import React, {Dispatch, FC, SetStateAction} from 'react';
import {CustomDialogBox, CustomDialogContent, CustomDialogTitle, DialogButton} from "./Dialog.styled";
import {Box, DialogActions, Slider, TextField} from "@mui/material";
import {Map, Placemark} from "@pbe/react-yandex-maps";
import {IQuestionForm} from "../../shared/types/IQuestionForm";
import {GameText} from "../GameBox/GameBox.styled";
import CloseIcon from "@mui/icons-material/Close";
import {Theme} from "../../store/reducers/ThemeSlice";
import {AbsolutButton} from "../CreateQuestionBox/CreateQuestionBox.styled";
import {useAppSelector} from "../../shared/hooks/redux";

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
    const {theme} = useAppSelector(state => state.theme)

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setQuestion({...question, time: newValue as number});
    };

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <CustomDialogBox open={isOpen}>
            <CustomDialogTitle>Завершение создания</CustomDialogTitle>
            <AbsolutButton right={'8px'} top={'8px'} onClick={handleClose}>
                <CloseIcon sx={{width: '20px', height: '20px', color: theme === Theme.DARK ? '#FFF' : '#000'}}/>
            </AbsolutButton>
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
                            center: question.steps.length ? question.steps[0].coordinates : [47.23620154498959, 39.712672605191955],
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
                        {question.steps.map((step, index) =>
                            <Placemark
                                key={index}
                                options={{preset: 'islands#greenIcon'}}
                                geometry={step.coordinates}
                                properties={{iconContent: index + 1, hintContent: 'Нажми, чтобы открыть описание', balloonContent: 'Очень длиннный, но невероятно интересный текст' }}
                            ></Placemark>)}
                    </Map>
                </Box>
                <GameText component='div'>Количество этапов: {question.steps.length}</GameText>
            </CustomDialogContent>
            <DialogActions>
                <DialogButton onClick={handleCreate} variant="contained">Завершить</DialogButton>
            </DialogActions>
        </CustomDialogBox>
    );
};

export default FormDialog;