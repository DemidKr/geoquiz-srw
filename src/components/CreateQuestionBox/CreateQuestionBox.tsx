import React, {FC, useState} from 'react';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {FormWrapper} from "./styles";
import {Placemark, Map, TypeSelector, useYMaps} from "@pbe/react-yandex-maps";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {coordinatesSlice} from "../../store/reducers/CoordinatesSlice";
import {useNavigate} from "react-router-dom";
import {getAuthDataFromLS} from "../../store/action-creators/auth";
import {createQuestion, getQuestions} from "../../store/action-creators/questions";
import {addSnack} from "../../store/action-creators/snackbar";
import {useAction} from "../../shared/hooks/useAction";


const CreateQuestionBox: FC = () => {
    const ymaps = useYMaps(['package.full']);

    const {coordinates} = useAppSelector(state => state.coordinates)
    const {isLoading ,error} = useAppSelector(state => state.questions)
    const {changeCoordinates} = coordinatesSlice.actions
    const dispatch = useAppDispatch()
    const addSnack = useAction()

    const navigate = useNavigate()

    const [name, setName] = useState<string>('')
    const [show, setShow] = useState<boolean>(true)

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

    return (
        <FormWrapper>
            <Grid container direction='column' alignItems='center' sx={{padding: '15px'}}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{color: '#F36C41'}}
                >
                    Создание панорамы
                </Typography>
                <TextField
                    required
                    sx={{ marginTop: '15px' }}
                    fullWidth
                    id="outlined-required"
                    label="Название викторины"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                    }
                />
                {show && <Typography
                    variant="body1"
                    component="div"
                    sx={{ marginTop: '15px' }}
                >
                    Подсказка: Нажмите на карту чтоб переместиться,
                    учтите что панорамы не покрывают всю карту,
                    чаще всего они присутствуют в городах и на дорогах.
                    Как определитесь с локацией, назовите вашу панораму,
                    которую прийдется угадать другим игрокам.
                    И удачи в поиске сложнейших локаций!
                    <Button
                        onClick={() => setShow(false)}
                        sx={{ padding: '0px'}}
                    >
                        Скрыть
                    </Button>
                </Typography>}
                <Grid item xs={2} sx={{ marginTop: ' 15px' }}>
                    <Map
                        width={390}
                        height={200}
                        defaultState={{ center: [47.23620154498959, 39.712672605191955], zoom: 10, controls: [] }}
                        options={{
                            copyrightLogoVisible: false,
                            copyrightUaVisible: false,
                            copyrightProvidersVisible: false,
                            suppressMapOpenBlock: true,
                        }}
                        // Function to add placemarks to the map; TODO: find type of event
                        onClick={(e: any) => movePlacemark(e._sourceEvent.originalEvent.coords)}
                    >
                        {coordinates?.length !== 0 && <Placemark options={{draggable: true}} geometry={coordinates}></Placemark>}
                    </Map>
                </Grid>
                <Grid item xs={2} sx={{ marginTop: ' 15px'}}>
                    <Button
                        disabled={isLoading}
                        onClick={handleCreate}
                        sx={{backgroundColor: '#F36C41', color: 'white', minWidth: '200px'}}
                    >
                        Завершить создание викторины
                    </Button>
                </Grid>
            </Grid>
        </FormWrapper>
    );
};

export default CreateQuestionBox;