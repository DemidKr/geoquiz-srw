import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../shared/consts";
import {
  ICoordinates,
  ICreateCoordinatesRequest,
} from "../../shared/types/coordinates";
import { prepareBaseHeaders } from "../../shared/utils/prepareBaseHeaders";

export const coordinatesApi = createApi({
  reducerPath: "coordinatesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/coordinates`,
    prepareHeaders: prepareBaseHeaders,
  }),
  endpoints: build => ({
    fetchQuizCoordinates: build.query<ICoordinates[], number>({
      query: questionId => ({
        url: `question/${questionId}`,
      }),
    }),
    createCoordinates: build.mutation<number, ICreateCoordinatesRequest>({
      query: body => {
        return {
          url: "",
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useFetchQuizCoordinatesQuery, useCreateCoordinatesMutation } =
  coordinatesApi;
