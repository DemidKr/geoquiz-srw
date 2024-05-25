import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CustomDialogBox,
  CustomDialogContent,
  CustomDialogContentText,
  CustomDialogTitle,
  DialogButton,
} from "./Dialog.styled";
import {
  DialogActions,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { IQuestionForm } from "../../shared/types/IQuestionForm";
import { GameText } from "../GameBox/GameBox.styled";
import CloseIcon from "@mui/icons-material/Close";
import { AbsolutButton } from "../EditCoordinatesBox/EditCoordinatesBox.styled";
import { useAppSelector } from "../../shared/hooks/redux";
import { Theme } from "../../store/reducers/ThemeSlice";
import { ICoordinates } from "../../shared/types/coordinates";
import { IStep } from "../../shared/types/IStep";
import { useParams } from "react-router-dom";
import { useAction } from "../../shared/hooks/useAction";
import { useUpdateCoordinatesMutation } from "../../store/api/coordinatesApi";

interface CreateStepDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  question: IQuestionForm;
  coordinates: ICoordinates;
  previousDescription: string;
  index: number;
}

const CreateStepDialog: FC<CreateStepDialogProps> = props => {
  const {
    isOpen,
    setIsOpen,
    question,
    previousDescription,
    coordinates,
    index,
  } = props;
  const [description, setDescription] = useState<string>(previousDescription);
  const [isCoordinatesChanges, setIsCoordinatesChanges] =
    useState<boolean>(false);

  const { theme } = useAppSelector(state => state.theme);
  const { id } = useParams();
  const addSnack = useAction();

  const [updateCoordinates, result] = useUpdateCoordinatesMutation();

  const isCoordinatesIdentical =
    question.steps[index].coordinates.lat === coordinates.lat &&
    question.steps[index].coordinates.lng === coordinates.lng;

  const handleSave = () => {
    const newCoordinates = isCoordinatesChanges
      ? coordinates
      : question.steps[index].coordinates;

    updateCoordinates({
      id: question.steps[index].coordinates.id!,
      body: {
        questionId: Number(id),
        lat: newCoordinates.lat,
        lng: newCoordinates.lng,
        description,
      },
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsCoordinatesChanges(false);
  };

  useEffect(() => {
    if (result.data) {
      addSnack("Этап викторины обновлен", "success");
      handleClose();
    }
  }, [result]);

  useEffect(() => {
    setDescription(previousDescription);
  }, [previousDescription, isOpen]);

  return (
    <CustomDialogBox open={isOpen} onClose={handleClose}>
      <CustomDialogTitle>Настройка этапа </CustomDialogTitle>
      <AbsolutButton right={"8px"} top={"8px"} onClick={handleClose}>
        <CloseIcon
          sx={{
            width: "20px",
            height: "20px",
            color: theme === Theme.DARK ? "#FFF" : "#000",
          }}
        />
      </AbsolutButton>
      <CustomDialogContent>
        {!isCoordinatesIdentical && (
          <>
            <CustomDialogContentText component="div">
              Нынешние координаты:
            </CustomDialogContentText>
            <GameText component="div">
              {coordinates.lat} {coordinates.lng}
            </GameText>
          </>
        )}
        <CustomDialogContentText component="div">
          Координаты этапа:
        </CustomDialogContentText>
        <GameText component="div">
          {question.steps[index].coordinates.lat}{" "}
          {question.steps[index].coordinates.lng}
        </GameText>
        {!isCoordinatesIdentical && (
          <FormControlLabel
            control={
              <Switch
                value={isCoordinatesChanges}
                onChange={() => setIsCoordinatesChanges(!isCoordinatesChanges)}
              />
            }
            label="Изменить координаты этапа на нынешние координаты"
          />
        )}
        <TextField
          fullWidth
          sx={{ mt: "5px" }}
          label="Описание локации"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
      </CustomDialogContent>
      <DialogActions>
        <DialogButton onClick={handleSave} variant="contained">
          Сохранить изменения
        </DialogButton>
      </DialogActions>
    </CustomDialogBox>
  );
};

export default CreateStepDialog;
