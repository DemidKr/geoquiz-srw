import { baseQueryWithReauth } from "../../shared/utils/prepareBaseHeaders";
import { ICreateStarsDto, IStars } from "../../shared/types/stars";
import { createApi } from "@reduxjs/toolkit/query/react";

export const starsApi = createApi({
  reducerPath: "starsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Stars"],
  endpoints: build => ({
    fetchQuestionStars: build.query<IStars, number>({
      query: questionId => ({
        url: `/stars/question/${questionId}`,
      }),
      providesTags: ["Stars"],
    }),
    createStars: build.mutation<IStars, ICreateStarsDto>({
      query: body => {
        return {
          url: "/stars",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Stars"],
    }),
  }),
});

export const { useCreateStarsMutation, useFetchQuestionStarsQuery } = starsApi;
