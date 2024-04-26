import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
    IGetAllQuestionsDto,
    IGetAllQuestionsResponse,
    IQuestionRequest,
    IQuestionResponse
} from "../../shared/types/questions";
import {BASE_URL} from "../../shared/consts";

export const questionApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/question`,
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
        fetchAllQuestions: build.query<IGetAllQuestionsResponse, IGetAllQuestionsDto>({
            query: (params) => ({
                url: '',
                params: params
            }),
        }),
        fetchQuestion: build.query<IQuestionResponse, number>({
            query: (id) => ({
                url: `/${id}`,
            }),
        }),
        createQuestion: build.mutation<number, IQuestionRequest>({
            query: ({title, description, file, time}) => {
                const bodyFormData = new FormData();
                bodyFormData.append('file', file);
                bodyFormData.append('title', title);
                bodyFormData.append('description', description);
                bodyFormData.append('time', time.toString());

                return {
                    url: '',
                    method: 'POST',
                    body: bodyFormData,
                }
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
    })
})

export const { useFetchAllQuestionsQuery , useFetchQuestionQuery, useCreateQuestionMutation} = questionApi