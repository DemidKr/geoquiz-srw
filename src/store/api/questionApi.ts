import { createApi } from "@reduxjs/toolkit/dist/query/react";
import {
  IGetAllQuestionsDto,
  IGetAllQuestionsResponse,
  IQuestionRequest,
  IQuestionResponse,
} from "../../shared/types/questions";
import { baseQueryWithReauth } from "../../shared/utils/prepareBaseHeaders";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${BASE_URL}/question`,
  //   prepareHeaders: prepareBaseHeaders,
  // }),
  keepUnusedDataFor: 0,
  tagTypes: ["Post"],
  endpoints: build => ({
    fetchAllQuestions: build.query<
      IGetAllQuestionsResponse,
      IGetAllQuestionsDto
    >({
      query: params => ({
        url: "/question",
        params: params,
      }),
    }),
    fetchQuestion: build.query<IQuestionResponse, number>({
      query: id => ({
        url: `/question/${id}`,
      }),
    }),
    fetchUserQuestion: build.query<
      IGetAllQuestionsResponse,
      IGetAllQuestionsDto
    >({
      query: params => ({
        url: `/question/user`,
        params: params,
      }),
      providesTags: ["Post"],
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
      // invalidatesTags: ['Post']
    }),
    // deletePost: build.mutation<IPost, IPost>({
    //     query: (post) => ({
    //         url: `/posts/${post.id}`,
    //         method: 'DELETE',
    //     }),
    //     invalidatesTags: ['Post']
    // }),
  }),
});

export const {
  useFetchAllQuestionsQuery,
  useFetchQuestionQuery,
  useFetchUserQuestionQuery,
  useCreateQuestionMutation,
} = questionApi;
