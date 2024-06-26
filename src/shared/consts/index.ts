import { ICoordinates } from "../types/coordinates";

export enum AppPaths {
  MAIN = "/main",
  AUTH = "/auth",
  GUIDE = "/guide",
  QUESTIONS = "/questions",
  QUESTION = "/question",
  PROFILE = "/profile",
  USER_QUESTIONS = "/user-questions",
  ADMIN = "/admin",
  CREATE_QUIZ = "/create-quiz",
  EDIT_QUIZ = "/edit-quiz",
  EDIT_COORDINATES = "/edit-coordinates",
  LEADERBOARD = "/leaderboard",
}

export const BASE_URL = process.env.REACT_APP_SERVER_URL as string;

export const DEFAULT_COORDINATES: ICoordinates = {
  lat: 47.23620154498959,
  lng: 39.712672605191955,
};
