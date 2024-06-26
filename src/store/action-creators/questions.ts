import { IGetUserQuestions } from "../../shared/types/IGetQuestions";
import { AppDispatch } from "../store";
import { questionsSlice } from "../reducers/QuestionsSlice";
import api from "../../services/axiosClient";
import { ICreateQuestion } from "../../shared/types/ICreateQuestion";
import { IDeleteQuestion } from "../../shared/types/IDeleteQuestion";

export const getUserQuestions =
  ({ url, token }: IGetUserQuestions) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(questionsSlice.actions.questionsFetching());
      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(questionsSlice.actions.questionsFetchingSuccess(response.data));

      return response;
    } catch (e: any) {
      dispatch(questionsSlice.actions.questionsFetchingError(e.message));
    }
  };

export const createQuestion =
  ({ url, question, token }: ICreateQuestion) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(questionsSlice.actions.questionsFetching());
      const response = await api.post(
        url,
        { ...question },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(questionsSlice.actions.questionsCreatingSuccess(response.data));

      return response.data;
    } catch (e: any) {
      dispatch(questionsSlice.actions.questionsFetchingError(e.message));
    }
  };

export const deleteQuestion =
  ({ url, token, id }: IDeleteQuestion) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(questionsSlice.actions.questionsFetching());
      const response = await api.delete(`${url}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(questionsSlice.actions.questionsDeleteSuccess(response.data));
      return response;
    } catch (e: any) {
      dispatch(questionsSlice.actions.questionsFetchingError(e.message));
    }
  };
