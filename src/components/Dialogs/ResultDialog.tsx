import React, { FC } from "react";
import { Box, DialogActions } from "@mui/material";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { IQuestionResponse } from "../../shared/types/questions";
import { useNavigate, useParams } from "react-router-dom";
import {
  CustomDialogBox,
  CustomDialogContent,
  CustomDialogContentText,
  CustomDialogTitle,
  DialogButton,
} from "./Dialog.styled";
import SendStars from "../SendStars/SendStars";
import { AppPaths } from "../../shared/consts";

interface ResultDialogProps {
  currentStep: number;
  finalScore: number;
  panoramaCoordinates: number[];
  zoomLevel: number;
  answer: number[];
  question: IQuestionResponse;
  isOpen: boolean;
}

const ResultDialog: FC<ResultDialogProps> = ({
  currentStep,
  finalScore,
  panoramaCoordinates,
  zoomLevel,
  answer,
  question,
  isOpen,
}) => {
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <CustomDialogBox open={isOpen}>
      <CustomDialogTitle>Результат</CustomDialogTitle>
      <CustomDialogContent>
        <CustomDialogContentText>
          Ваш финальный результат составил {finalScore}/{currentStep * 1000}
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
            {answer?.length !== 0 && (
              <Placemark
                options={{ preset: "islands#redIcon" }}
                geometry={answer}></Placemark>
            )}
            {question.coordinates.map((item, index) => (
              <Placemark
                key={index}
                options={{ preset: "islands#greenIcon" }}
                geometry={[item.lat, item.lng]}></Placemark>
            ))}
          </Map>
        </Box>
      </CustomDialogContent>
      <SendStars questionId={Number(id)} />
      <DialogButton
        onClick={() => navigate(`${AppPaths.LEADERBOARD}/${Number(id)}`)}
        variant="contained">
        Таблица лидеров
      </DialogButton>
      <DialogActions>
        <DialogButton
          onClick={() => navigate(AppPaths.QUESTIONS)}
          variant="contained">
          Вернуться к странице викторин
        </DialogButton>
      </DialogActions>
    </CustomDialogBox>
  );
};

export default ResultDialog;
