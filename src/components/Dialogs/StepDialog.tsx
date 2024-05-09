import React, { FC } from "react";
import { Box, DialogActions } from "@mui/material";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { IQuestionResponse } from "../../shared/types/questions";
import {
  CustomDialogBox,
  CustomDialogContent,
  CustomDialogContentText,
  CustomDialogTitle,
  DialogButton,
} from "./Dialog.styled";

interface StepDialogProps {
  currentStep: number;
  scores: number[];
  panoramaCoordinates: number[];
  zoomLevel: number;
  answer: number[];
  question: IQuestionResponse;
  isOpen: boolean;
  close: () => void;
}

const StepDialog: FC<StepDialogProps> = ({
  currentStep,
  scores,
  panoramaCoordinates,
  zoomLevel,
  answer,
  question,
  isOpen,
  close,
}) => {
  return (
    <CustomDialogBox open={isOpen}>
      <CustomDialogTitle>
        Этап {currentStep}/{question.coordinates.length}
      </CustomDialogTitle>
      <CustomDialogContent>
        <CustomDialogContentText>
          Ваш результат составил {scores[currentStep - 1]}/1000.{" "}
          {scores[currentStep - 1] > 900
            ? "Вы очень хороши в географии!"
            : "Попробуйте еще!"}
        </CustomDialogContentText>
        <Box sx={{ width: "100%", height: "200px" }}>
          <Map
            sx={{ width: "100%", height: "100%" }}
            className="rounded-map"
            defaultState={{
              center: panoramaCoordinates,
              zoom: zoomLevel,
              controls: [],
            }}
            options={{
              copyrightLogoVisible: false,
              copyrightUaVisible: false,
              copyrightProvidersVisible: false,
              suppressMapOpenBlock: true,
            }}>
            {answer.length !== 0 && (
              <Placemark
                options={{ preset: "islands#redIcon" }}
                geometry={answer}></Placemark>
            )}
            {panoramaCoordinates.length !== 0 && (
              <Placemark
                options={{ preset: "islands#greenIcon" }}
                geometry={panoramaCoordinates}></Placemark>
            )}
          </Map>
        </Box>
      </CustomDialogContent>
      <DialogActions>
        <DialogButton onClick={close} variant="contained">
          Продолжить
        </DialogButton>
      </DialogActions>
    </CustomDialogBox>
  );
};

export default StepDialog;
