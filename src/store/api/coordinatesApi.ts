import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {BASE_URL} from "../../shared/consts";
import { ICoordinates } from "../../shared/types/coordinates";

export const coordinatesApi = createApi({
    reducerPath: 'coordinatesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/coordinates`,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = JSON.parse(localStorage.getItem('auth') as string);
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        fetchQuizCoordinates: build.query<ICoordinates[], number>({
            query: (questionId) => ({
                url: `question/${questionId}`,
            }),
        }),
    })
})

export const { useFetchQuizCoordinatesQuery } = coordinatesApi