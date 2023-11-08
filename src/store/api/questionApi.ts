import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IQuestionResponse} from "../../shared/types/IQuestion";

const BASE_URL = process.env.REACT_APP_SERVER_URL as string;

export const questionApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/question`
    }),
    endpoints: (build) => ({
        fetchAllQuestions: build.query<IQuestionResponse[], void>({
            query: () => ({
                url: '',
            }),
        }),
        // createPost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `/posts`,
        //         method: 'POST',
        //         body: post
        //     }),
        //     invalidatesTags: ['Post']
        // }),
        // deletePost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `/posts/${post.id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Post']
        // }),
    })
})

export const { useFetchAllQuestionsQuery } = questionApi