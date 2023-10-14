import React, {FC, useCallback, useState} from 'react';
import {
    Box,
    Grid,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import PlaceIcon from '@mui/icons-material/Place';
import {Placemark, Map, useYMaps} from "@pbe/react-yandex-maps";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {coordinatesSlice} from "../../store/reducers/CoordinatesSlice";
import {useNavigate} from "react-router-dom";
import {getAuthDataFromLS} from "../../store/action-creators/auth";
import {createQuestion} from "../../store/action-creators/questions";
import {useAction} from "../../shared/hooks/useAction";
import {GameBox, GameButton, GameText, GameTitle, HideHintButton, HintText} from "../GameBox/styled";
import {AbsolutButton, AddStepBox, StepBox, StepBoxesWrapper} from "./styled";
import warningSound from '../../shared/sounds/warning.wav'
import {IQuestionForm} from "../../shared/interfaces/IQuestionForm";
import FormDialog from "../Dialogs/FormDialog";
import CreateStepDialog from "../Dialogs/CreateStepDialog";
import StepSettingDialog from "../Dialogs/StepSettingDialog";
import {IStep} from "../../shared/interfaces/IStep";


const CreateQuestionBox: FC = () => {
    const ymaps = useYMaps(['package.full']);

    const [question, setQuestion] = useState<IQuestionForm>({
        title: '',
        description: '',
        time: 90,
        steps: [],
    })

    const [descToChange, setDescToChange] = useState<string>('')
    const [stepToChange, setStepToChange] = useState<number>(0)
    const [showHint, setShowHint] = useState<boolean>(true)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showSettingModal, setShowSettingModal] = useState<boolean>(false)
    const [showStepModal, setShowStepModal] = useState<boolean>(false)

    const {coordinates} = useAppSelector(state => state.coordinates)
    const {isLoading ,error} = useAppSelector(state => state.questions)
    const {changeCoordinates} = coordinatesSlice.actions

    const dispatch = useAppDispatch()
    const addSnack = useAction()
    const navigate = useNavigate()



    const isSameCoord = useCallback((step: IStep) => {
        return step.coordinates[0] === coordinates[0] && step.coordinates[1] === coordinates[1]
    }, [coordinates, question.steps]);

    const movePlacemark = (coord: any) => {
        if(ymaps !== null) {
            let locateRequest = ymaps.panorama.locate( coord);

            locateRequest.then(
                // @ts-ignore
                function (panoramas) {
                    if (panoramas.length) {
                        dispatch(changeCoordinates(coord))
                    } else {
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
        // for testing
        navigate('/main')
        return;

        if (question.title.length === 0) {
            addSnack('Название не должно быть пустым', 'warning')
            return;
        }

        const authData = dispatch(getAuthDataFromLS());

        const createData = await dispatch(createQuestion({
            url: '/question',
            question: {
                name: question.title,
                coordinates: coordinates,
                date: new Date(Date.now())
            },
            token: authData.access_token
        }));

        if (!createData) {
            addSnack(`Ошибка в создании, попробуйте снова. ${error}`, 'error')
        } else {
            addSnack(`Успешно создан!`, 'success')
            navigate('/main')
        }
    }

    const handleOpenSetting = (index: number) => {
        setStepToChange(index)
        setDescToChange(question.steps[index].desc)
        setShowSettingModal(true)
    }

    const handleStepChanges = (doesCoordChange: boolean, newDesc: string) => {
        let steps: IStep[] = [...question.steps];

        let step: IStep = {...steps[stepToChange]};
        step.desc = newDesc;
        if (doesCoordChange) {
            step.coordinates = [...coordinates];
        }
        steps[stepToChange] = step;

        setQuestion({...question, steps});
    }

    const handleRemove = (index: number) => {
        let array = [...question.steps]; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            setQuestion({...question, steps: array})
        }
    }

    return (
        <>
            <GameBox>
                <Grid container direction='column' alignItems='center' gap='10px'>
                    <GameTitle component="div">Создание геоквиза</GameTitle>
                    {showHint && <HintText component="div">
                        Подсказка: Нажмите на карту чтоб переместиться,
                        учтите что панорамы не покрывают всю карту,
                        чаще всего они присутствуют в городах и на дорогах.
                        Как определитесь с локацией, назовите вашу панораму,
                        которую прийдется угадать другим игрокам.
                        И удачи в поиске сложнейших локаций!
                        <HideHintButton component="span" onClick={() => setShowHint(false)}>
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
                    <GameText component='div'>{question.steps.length}/10 этапов</GameText>
                    <StepBoxesWrapper>
                        {question.steps.map((step, index) =>
                            <StepBox key={index}>
                                {index + 1}
                                <AbsolutButton
                                    color={isSameCoord(step) ? "success" : "primary"}
                                    variant="contained"
                                    left={'4px'}
                                    top={'4px'}
                                    onClick={() => dispatch(changeCoordinates(step.coordinates))}
                                >
                                    <PlaceIcon sx={{width: '20px', height: '20px', color: '#FFFFFF'}}/>
                                </AbsolutButton>
                                <AbsolutButton variant="contained" right={'4px'} top={'4px'} onClick={() => handleOpenSetting(index)}>
                                    <SettingsIcon sx={{width: '20px', height: '20px', color: '#FFFFFF'}}/>
                                </AbsolutButton>
                                <AbsolutButton color="error" variant="contained" right={'4px'} bottom={'4px'} onClick={() => handleRemove(index)}>
                                    <DeleteIcon sx={{width: '20px', height: '20px'}}/>
                                </AbsolutButton>
                            </StepBox>)}
                        {question.steps.length < 10 && <AddStepBox onClick={() => setShowStepModal(true)}>
                            <AddIcon/>
                        </AddStepBox>}
                    </StepBoxesWrapper>
                    <Grid item xs={2} sx={{ marginTop: ' 15px'}}>
                        <GameButton
                            disabled={isLoading}
                            onClick={() => setShowModal(true)}
                            variant='contained'
                        >
                            Продолжить
                        </GameButton>
                    </Grid>
                </Grid>
            </GameBox>
            <CreateStepDialog
                isOpen={showStepModal}
                setIsOpen={setShowStepModal}
                question={question}
                setQuestion={setQuestion}
                coordinates={coordinates}
            />
            {question.steps.length > 0 &&
                <StepSettingDialog
                    isOpen={showSettingModal}
                    setIsOpen={setShowSettingModal}
                    question={question}
                    handleStepChanges={handleStepChanges}
                    coordinates={coordinates}
                    index={stepToChange}
                    description={descToChange}
                />}
            <FormDialog
                question={question}
                setQuestion={setQuestion}
                isOpen={showModal}
                setIsOpen={setShowModal}
                handleCreate={handleCreate}
            />
        </>
    );
};

export default CreateQuestionBox;