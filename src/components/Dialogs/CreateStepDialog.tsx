import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  CustomDialogBox,
  CustomDialogContent,
  CustomDialogContentText,
  CustomDialogTitle,
  DialogButton,
} from "./Dialog.styled";
import { DialogActions, TextField } from "@mui/material";
import { IQuestionForm } from "../../shared/types/IQuestionForm";
import { GameText } from "../GameBox/GameBox.styled";
import CloseIcon from "@mui/icons-material/Close";
import { Theme } from "../../store/reducers/ThemeSlice";
import { AbsolutButton } from "../EditCoordinatesBox/EditCoordinatesBox.styled";
import { useAppSelector } from "../../shared/hooks/redux";
import { ICoordinates } from "../../shared/types/coordinates";
import { useCreateCoordinatesMutation } from "../../store/api/coordinatesApi";
import { useParams } from "react-router-dom";
import { useAction } from "../../shared/hooks/useAction";
import ButtonLoader from "../Loader/ButtonLoader";
import { IStep } from "../../shared/types/IStep";

interface CreateStepDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  question: IQuestionForm;
  coordinates: ICoordinates;
}

const CreateStepDialog: FC<CreateStepDialogProps> = ({
  isOpen,
  setIsOpen,
  question,
  coordinates,
}) => {
  const [description, setDescription] = useState<string>("");

  const { theme } = useAppSelector(state => state.theme);
  const { id } = useParams();
  const addSnack = useAction();

  const [createCoordinates, result] = useCreateCoordinatesMutation();

  const isLoading = result.isLoading;

  const getIsCoordinatesIdentical = (step: IStep) => {
    return (
      step.coordinates.lat === coordinates.lat &&
      step.coordinates.lng === coordinates.lng
    );
  };

  const handleStepChanges = () => {
    if (question.steps.some(getIsCoordinatesIdentical)) {
      addSnack("Шаг с данными координатами уже существует", "warning");
      return;
    }
    createCoordinates({
      questionId: Number(id),
      lat: coordinates.lat,
      lng: coordinates.lng,
      description,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setDescription("");
  };

  useEffect(() => {
    if (result.data) {
      addSnack("Этап викторины добавлен", "success");
      handleClose();
    }
  }, [result]);

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
        <CustomDialogContentText component="div">
          Координаты:
        </CustomDialogContentText>
        <GameText component="div">
          {coordinates.lat} {coordinates.lng}
        </GameText>
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
        <DialogButton
          onClick={handleStepChanges}
          variant="contained"
          disabled={isLoading}>
          Сохранить этап {isLoading && <ButtonLoader />}
        </DialogButton>
      </DialogActions>
    </CustomDialogBox>
  );
};

export default CreateStepDialog;
