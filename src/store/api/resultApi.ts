import { baseQueryWithReauth } from "../../shared/utils/prepareBaseHeaders";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ICreateResultDto, IResult } from "../../shared/types/result";

export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Result"],
  endpoints: build => ({
    fetchAllQuestionResult: build.query<IResult[], number>({
      query: questionId => ({
        url: `/result/question/${questionId}`,
      }),
      providesTags: ["Result"],
    }),
    createResult: build.mutation<IResult, ICreateResultDto>({
      query: body => {
        return {
          url: "/result",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Result"],
    }),
  }),
});

export const { useFetchAllQuestionResultQuery, useCreateResultMutation } =
  resultApi;
