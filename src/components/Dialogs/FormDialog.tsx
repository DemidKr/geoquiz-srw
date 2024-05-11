import React, { Dispatch, FC, SetStateAction } from "react";
import {
  CustomDialogBox,
  CustomDialogContent,
  CustomDialogTitle,
  DialogButton,
} from "./Dialog.styled";
import { Box, DialogActions } from "@mui/material";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { IQuestionForm } from "../../shared/types/IQuestionForm";
import { GameText } from "../GameBox/GameBox.styled";
import CloseIcon from "@mui/icons-material/Close";
import { Theme } from "../../store/reducers/ThemeSlice";
import { AbsolutButton } from "../EditCoordinatesBox/EditCoordinatesBox.styled";
import { useAppSelector } from "../../shared/hooks/redux";
import { DEFAULT_COORDINATES } from "../../shared/consts";
import { transformCoordinatesToArray } from "../../shared/utils/transformCoordinatesToArray";

interface FormDialogProps {
  question: IQuestionForm;
  setQuestion: Dispatch<SetStateAction<IQuestionForm>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleCreate: () => void;
}

const FormDialog: FC<FormDialogProps> = ({
  question,
  isOpen,
  setIsOpen,
  handleCreate,
}) => {
  const { theme } = useAppSelector(state => state.theme);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <CustomDialogBox open={isOpen}>
      <CustomDialogTitle>Завершение создания</CustomDialogTitle>
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
        <Box sx={{ width: "100%", height: "200px" }}>
          <Map
            sx={{ width: "100%", height: "100%" }}
            className="rounded-map"
            defaultState={{
              center: question.steps.length
                ? transformCoordinatesToArray(question.steps[0].coordinates)
                : transformCoordinatesToArray(DEFAULT_COORDINATES),
              zoom: 9,
              controls: [],
            }}
            options={{
              copyrightLogoVisible: false,
              copyrightUaVisible: false,
              copyrightProvidersVisible: false,
              suppressMapOpenBlock: true,
            }}>
            {question.steps.map((step, index) => (
              <Placemark
                key={index}
                options={{ preset: "islands#greenIcon" }}
                geometry={transformCoordinatesToArray(step.coordinates)}
                properties={{
                  iconContent: index + 1,
                  hintContent: "Нажми, чтобы открыть описание",
                  balloonContent:
                    "Очень длиннный, но невероятно интересный текст",
                }}></Placemark>
            ))}
          </Map>
        </Box>
        <GameText component="div">
          Количество этапов: {question.steps.length}
        </GameText>
      </CustomDialogContent>
      <DialogActions>
        <DialogButton onClick={handleCreate} variant="contained">
          Завершить
        </DialogButton>
      </DialogActions>
    </CustomDialogBox>
  );
};

export default FormDialog;
