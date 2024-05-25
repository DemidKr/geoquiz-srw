import React, { FC, useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import PlaceIcon from "@mui/icons-material/Place";
import { Placemark, Map, useYMaps } from "@pbe/react-yandex-maps";
import { useAppDispatch } from "../../shared/hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAction } from "../../shared/hooks/useAction";
import {
  GameBox,
  GameButton,
  GameText,
  GameTitle,
  HideHintButton,
  HintText,
} from "../GameBox/GameBox.styled";
import {
  AbsolutButton,
  AddStepBox,
  LoaderWrapper,
  StepBox,
  StepBoxesWrapper,
} from "./EditCoordinatesBox.styled";
import warningSound from "../../shared/sounds/warning.wav";
import { IQuestionForm } from "../../shared/types/IQuestionForm";
import FormDialog from "../Dialogs/FormDialog";
import CreateStepDialog from "../Dialogs/CreateStepDialog";
import StepSettingDialog from "../Dialogs/StepSettingDialog";
import { IStep } from "../../shared/types/IStep";
import {
  useDeleteCoordinatesMutation,
  useFetchQuizCoordinatesQuery,
} from "../../store/api/coordinatesApi";
import { ICoordinates } from "../../shared/types/coordinates";
import ButtonLoader from "../Loader/ButtonLoader";

interface IEditCoordinatesBoxProps {
  currentCoordinates: ICoordinates;
  setCurrentCoordinates: React.Dispatch<React.SetStateAction<ICoordinates>>;
}

const EditCoordinatesBox: FC<IEditCoordinatesBoxProps> = ({
  currentCoordinates,
  setCurrentCoordinates,
}) => {
  const ymaps = useYMaps(["package.full"]);

  // TODO: refactor later
  const [question, setQuestion] = useState<IQuestionForm>({
    title: "",
    description: "",
    time: 90,
    steps: [],
  });
  const [descToChange, setDescToChange] = useState<string>("");
  const [stepToChange, setStepToChange] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSettingModal, setShowSettingModal] = useState<boolean>(false);
  const [showStepModal, setShowStepModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const addSnack = useAction();
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: coordinatesList,
    error,
    isLoading,
    isFetching,
  } = useFetchQuizCoordinatesQuery(Number(id));

  const [deleteCoordinates, result] = useDeleteCoordinatesMutation();

  const getIsCoordinatesIdentical = useCallback(
    (step: IStep) => {
      return (
        step.coordinates.lat === currentCoordinates.lat &&
        step.coordinates.lng === currentCoordinates.lng
      );
    },
    [currentCoordinates, question.steps],
  );

  const movePlacemark = (newCoordinates: number[]) => {
    if (ymaps !== null) {
      const locateRequest = ymaps.panorama.locate(newCoordinates);

      locateRequest.then(
        // @ts-ignore
        function (panoramas) {
          if (panoramas.length) {
            setCurrentCoordinates({
              lat: newCoordinates[0],
              lng: newCoordinates[1],
            });
          } else {
            new Audio(warningSound).play();
            addSnack(
              "Для заданной точки не найдено ни одной панорамы",
              "warning",
            );
          }
        },
      );
    } else {
      console.error("YPlayer or ymaps is null");
    }
  };

  const handleSave = async () => {
    if (question.steps.length === 0) {
      addSnack("Добавьте шаги, прежде чем сохранять", "warning");
      return;
    }
  };

  const handleOpenSetting = (index: number) => {
    setStepToChange(index);
    setDescToChange(question.steps[index].description);
    setShowSettingModal(true);
  };

  const handleRemove = (index: number) => {
    const id = question.steps[index].coordinates.id;
    if (id) {
      deleteCoordinates(id);
    }
  };

  const handleMoveToStepCoordinates = (stepCoordinates: ICoordinates) => {
    setCurrentCoordinates(stepCoordinates);
  };

  useEffect(() => {
    if (coordinatesList) {
      setQuestion(prevState => ({
        ...prevState,
        steps: coordinatesList.map(coordinatesItem => {
          return {
            coordinates: coordinatesItem,
            description: coordinatesItem.description ?? "",
          };
        }),
      }));
    }
  }, [coordinatesList, isLoading]);

  useEffect(() => {
    if (result.isSuccess) {
      addSnack("Этап викторины удален", "success");
    }
  }, [result]);

  const isStepsLoading = isLoading || isFetching || result.isLoading;

  return (
    <>
      <GameBox>
        <Grid container direction="column" alignItems="center" gap="10px">
          <GameTitle component="div">Создание геоквиза</GameTitle>
          {showHint && (
            <HintText component="div">
              Подсказка: Нажмите на карту чтоб переместиться, учтите что
              панорамы не покрывают всю карту, чаще всего они присутствуют в
              городах и на дорогах. Как определитесь с локацией, назовите вашу
              панораму, которую прийдется угадать другим игрокам. И удачи в
              поиске сложнейших локаций!
              <HideHintButton
                component="span"
                onClick={() => setShowHint(false)}>
                Скрыть
              </HideHintButton>
            </HintText>
          )}
          <Box sx={{ width: "100%" }}>
            <Map
              style={{ width: "100%", height: "200px" }}
              className="rounded-map"
              defaultState={{
                center: [47.23620154498959, 39.712672605191955],
                zoom: 9,
                controls: [],
              }}
              options={{
                copyrightLogoVisible: false,
                copyrightUaVisible: false,
                copyrightProvidersVisible: false,
                suppressMapOpenBlock: true,
              }}
              // Function to add placemarks to the map; TODO: find type of event
              onClick={(e: any) =>
                movePlacemark(e._sourceEvent.originalEvent.coords)
              }>
              <Placemark
                geometry={[
                  currentCoordinates.lat,
                  currentCoordinates.lng,
                ]}></Placemark>
            </Map>
          </Box>
          <GameText component="div">{question.steps.length}/10 этапов</GameText>
          <StepBoxesWrapper>
            {isStepsLoading ? (
              <LoaderWrapper>
                <ButtonLoader />
              </LoaderWrapper>
            ) : (
              question.steps.map((step, index) => (
                <StepBox key={index}>
                  {index + 1}
                  <AbsolutButton
                    color={
                      getIsCoordinatesIdentical(step) ? "success" : "primary"
                    }
                    variant="contained"
                    left={"4px"}
                    top={"4px"}
                    onClick={() =>
                      handleMoveToStepCoordinates(step.coordinates)
                    }>
                    <PlaceIcon
                      sx={{ width: "20px", height: "20px", color: "#FFFFFF" }}
                    />
                  </AbsolutButton>
                  <AbsolutButton
                    variant="contained"
                    right={"4px"}
                    top={"4px"}
                    onClick={() => handleOpenSetting(index)}>
                    <SettingsIcon
                      sx={{ width: "20px", height: "20px", color: "#FFFFFF" }}
                    />
                  </AbsolutButton>
                  <AbsolutButton
                    color="error"
                    variant="contained"
                    right={"4px"}
                    bottom={"4px"}
                    onClick={() => handleRemove(index)}>
                    <DeleteIcon sx={{ width: "20px", height: "20px" }} />
                  </AbsolutButton>
                </StepBox>
              ))
            )}
            {!isStepsLoading && question.steps.length < 10 && (
              <AddStepBox onClick={() => setShowStepModal(true)}>
                <AddIcon />
              </AddStepBox>
            )}
          </StepBoxesWrapper>
          <Grid item xs={2} sx={{ marginTop: " 15px" }}>
            <GameButton
              disabled={isLoading}
              onClick={() => setShowModal(true)}
              variant="contained">
              Продолжить
            </GameButton>
          </Grid>
        </Grid>
      </GameBox>
      <CreateStepDialog
        isOpen={showStepModal}
        setIsOpen={setShowStepModal}
        question={question}
        coordinates={currentCoordinates}
      />
      {question.steps.length > 0 && (
        <StepSettingDialog
          isOpen={showSettingModal}
          setIsOpen={setShowSettingModal}
          question={question}
          coordinates={currentCoordinates}
          index={stepToChange}
          previousDescription={descToChange}
        />
      )}
      <FormDialog
        question={question}
        setQuestion={setQuestion}
        isOpen={showModal}
        setIsOpen={setShowModal}
        handleCreate={handleSave}
      />
    </>
  );
};

export default EditCoordinatesBox;
