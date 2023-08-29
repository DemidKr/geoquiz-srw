import React, {FC, useState} from 'react';
import {
    Box,
    Grid,
    TextField,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {Placemark, Map, useYMaps} from "@pbe/react-yandex-maps";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {coordinatesSlice} from "../../store/reducers/CoordinatesSlice";
import {useNavigate} from "react-router-dom";
import {getAuthDataFromLS} from "../../store/action-creators/auth";
import {createQuestion} from "../../store/action-creators/questions";
import {useAction} from "../../shared/hooks/useAction";
import {GameBox, GameButton, GameText, GameTitle, HideHintButton, HintText} from "../GameBox/styled";
import {AddStepBox, DeleteButton, StepBox, StepBoxesWrapper} from "./styled";
import warningSound from '../../shared/sounds/warning.wav'


const CreateQuestionBox: FC = () => {
    const ymaps = useYMaps(['package.full']);

    const [name, setName] = useState<string>('')
    const [show, setShow] = useState<boolean>(true)
    const [stepCoordinates, setStepCoordinates] = useState<number[][]>([])

    const {coordinates} = useAppSelector(state => state.coordinates)
    const {isLoading ,error} = useAppSelector(state => state.questions)
    const {changeCoordinates} = coordinatesSlice.actions

    const dispatch = useAppDispatch()
    const addSnack = useAction()
    const navigate = useNavigate()


    const movePlacemark = (coord: any) => {
        if(ymaps !== null) {
            console.log("coord", coord)

            let locateRequest = ymaps.panorama.locate( coord);

            locateRequest.then(
                // @ts-ignore
                function (panoramas) {
                    if (panoramas.length) {
                        dispatch(changeCoordinates(coord))
                    } else {
                        console.log("В заданной точке нет панорам.");
                        new Audio(warningSound).play()
                        addSnack("Для заданной точки не найдено ни одной панорамы", "warning")
                    }
                }
            );
        } else {
            console.log('YPlayer or ymaps is null')
        }
    }

    const handleCreate = async () => {
        if (name.length === 0) {
            addSnack('Название не должно быть пустым', 'warning')
            return;
        }

        const authData = dispatch(getAuthDataFromLS());

        const question = await dispatch(createQuestion({
            url: '/question',
            question: {
                name: name,
                coordinates: coordinates,
                date: new Date(Date.now())
            },
            token: authData.access_token
        }));

        if (!question) {
            addSnack(`Ошибка в создании, попробуйте снова. ${error}`, 'error')
        } else {
            addSnack(`Успешно создан!`, 'success')
            navigate('/main')
        }
    }

    const handleRemove = (index: number) => {
        let array = [...stepCoordinates]; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            setStepCoordinates(array)
        }
    }

    return (
        <GameBox>
            <Grid container direction='column' alignItems='center' gap='10px'>
                <GameTitle component="div">Создание геоквиза</GameTitle>
                <TextField
                    required
                    sx={{ marginTop: '15px' }}
                    fullWidth
                    id="outlined-required"
                    label="Название геоквиза"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                    }
                />
                {show && <HintText component="div">
                    Подсказка: Нажмите на карту чтоб переместиться,
                    учтите что панорамы не покрывают всю карту,
                    чаще всего они присутствуют в городах и на дорогах.
                    Как определитесь с локацией, назовите вашу панораму,
                    которую прийдется угадать другим игрокам.
                    И удачи в поиске сложнейших локаций!
                    <HideHintButton component="span" onClick={() => setShow(false)}>
                        Скрыть
                    </HideHintButton>
                </HintText>}
                <Box sx={{ width: '100%' }}>
                    <Map
                        style={{ width: '100%', height: '200px'}}
                        className="rounded-map"
                        defaultState={{ center: [47.23620154498959, 39.712672605191955], zoom: 9, controls: [] }}
                        options={{
                            copyrightLogoVisible: false,
                            copyrightUaVisible: false,
                            copyrightProvidersVisible: false,
                            suppressMapOpenBlock: true,
                        }}
                        // Function to add placemarks to the map; TODO: find type of event
                        onClick={(e: any) => movePlacemark(e._sourceEvent.originalEvent.coords)}
                    >
                        {coordinates?.length !== 0 && <Placemark geometry={coordinates}></Placemark>}
                    </Map>
                </Box>
                <GameText component='div'>{stepCoordinates.length}/10 этапов</GameText>
                <StepBoxesWrapper>
                    {stepCoordinates.map((stepCoordinates, index) =>
                        <StepBox key={index} onClick={() => dispatch(changeCoordinates(stepCoordinates))}>
                            {index + 1}
                            <DeleteButton color="error" variant="contained" onClick={() => handleRemove(index)}>
                                <DeleteIcon sx={{width: '20px', height: '20px'}}/>
                            </DeleteButton>
                        </StepBox>)}
                    {stepCoordinates.length < 10 && <AddStepBox onClick={() => setStepCoordinates([...stepCoordinates, coordinates])}>
                        <AddIcon/>
                    </AddStepBox>}
                </StepBoxesWrapper>
                <Grid item xs={2} sx={{ marginTop: ' 15px'}}>
                    <GameButton
                        disabled={isLoading}
                        onClick={handleCreate}
                        variant='contained'
                    >
                        Сохранить
                    </GameButton>
                </Grid>
            </Grid>
        </GameBox>
    );
};

export default CreateQuestionBox;