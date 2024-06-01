import {
  ICoordinates,
  ICreateUpdateOneCoordinatesRequest,
  IUpdateCoordinates,
} from "../../shared/types/coordinates";
import { baseQueryWithReauth } from "../../shared/utils/prepareBaseHeaders";
import { createApi } from "@reduxjs/toolkit/query/react";

export const coordinatesApi = createApi({
  reducerPath: "coordinatesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Coordinates"],
  endpoints: build => ({
    fetchQuizCoordinates: build.query<ICoordinates[], number>({
      query: questionId => ({
        url: `/coordinates/question/${questionId}`,
      }),
      providesTags: ["Coordinates"],
    }),
    createCoordinates: build.mutation<
      ICoordinates,
      ICreateUpdateOneCoordinatesRequest
    >({
      query: body => {
        return {
          url: "/coordinates/one",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Coordinates"],
    }),
    updateCoordinates: build.mutation<ICoordinates, IUpdateCoordinates>({
      query: request => {
        return {
          url: `/coordinates/${request.id}`,
          method: "PUT",
          body: request.body,
        };
      },
      invalidatesTags: ["Coordinates"],
    }),
    deleteCoordinates: build.mutation<void, number>({
      query: id => ({
        url: `/coordinates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coordinates"],
    }),
  }),
});

export const {
  useFetchQuizCoordinatesQuery,
  useCreateCoordinatesMutation,
  useUpdateCoordinatesMutation,
  useDeleteCoordinatesMutation,
} = coordinatesApi;
