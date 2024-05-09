import { IQuestionResponse } from "../../shared/types/questions";
import secondPic from "../../shared/images/TempPic2.jpg";

export const hardcodedQuestion: IQuestionResponse = {
  id: 1,
  title: "Название два",
  description: "Описание два",
  user: {
    username: "Димас123",
  },
  time: 45,
  stars: 5,
  timesFinished: 10,
  isFinished: false,
  coordinates: [
    { lat: 47.21706929180965, lng: 39.7120816141971 },
    { lat: 47.26830478974905, lng: 39.722743461852545 },
  ],
  imageUrl: secondPic,
};
