import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAuth, IAuthResponse} from "../../shared/types/IAuth";
import {BASE_URL} from "../../shared/consts";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth`
    }),
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, IAuth>({
            query: (authData) => ({
                url: '/login',
                method: 'POST',
                body: authData
            }),
        }),
        registration: builder.mutation<IAuthResponse, IAuth>({
            query: (authData) => ({
                url: '/registration',
                method: 'POST',
                body: authData
            }),
        }),
    })
})

export const { useLoginMutation, useRegistrationMutation } = authApi