import {
  IGetAllQuestionsDto,
  IGetAllQuestionsResponse,
  IQuestionRequest,
  IQuestionResponse,
  IUpdateQuestionRequest,
} from "../../shared/types/questions";
import { baseQueryWithReauth } from "../../shared/utils/prepareBaseHeaders";
import { createApi } from "@reduxjs/toolkit/query/react";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: ["Question"],
  endpoints: build => ({
    fetchAllQuestions: build.query<
      IGetAllQuestionsResponse,
      IGetAllQuestionsDto
    >({
      query: params => ({
        url: "/question",
        params: params,
      }),
      providesTags: ["Question"],
    }),
    fetchQuestion: build.query<IQuestionResponse, number>({
      query: id => ({
        url: `/question/${id}`,
      }),
      providesTags: ["Question"],
    }),
    fetchUserQuestion: build.query<
      IGetAllQuestionsResponse,
      IGetAllQuestionsDto
    >({
      query: params => ({
        url: `/question/user`,
        params: params,
      }),
      providesTags: ["Question"],
    }),
    createQuestion: build.mutation<number, IQuestionRequest>({
      query: ({ title, description, file, time }) => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("title", title);
        bodyFormData.append("description", description);
        bodyFormData.append("time", time.toString());

        return {
          url: "/question",
          method: "POST",
          body: bodyFormData,
        };
      },
      invalidatesTags: ["Question"],
    }),
    updateQuestion: build.mutation<number, IUpdateQuestionRequest>({
      query: request => ({
        url: `/question/${request.id}`,
        method: "PUT",
        body: request.body,
      }),
      invalidatesTags: ["Question"],
    }),
    publishQuestion: build.mutation<boolean, number>({
      query: id => ({
        url: `/question/publish/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Question"],
    }),
    deleteQuestion: build.mutation<void, number>({
      query: id => ({
        url: `/question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),
  }),
});

export const {
  useFetchAllQuestionsQuery,
  useFetchQuestionQuery,
  useFetchUserQuestionQuery,
  useCreateQuestionMutation,
  usePublishQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
