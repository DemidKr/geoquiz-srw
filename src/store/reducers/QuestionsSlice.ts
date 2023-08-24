import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILegacyQuestion} from "../../shared/interfaces/ILegacyQuestion";

interface QuestionsState {
    questions: ILegacyQuestion[];
    isLoading: boolean;
    error: string;
}

const initialState: QuestionsState = {
    questions: [],
    isLoading: false,
    error: ''
}

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        questionsFetching(state) {
            state.isLoading = true
        },
        questionsFetchingSuccess(state, action: PayloadAction<ILegacyQuestion[]>) {
            state.isLoading = false
            state.error = ''
            state.questions = action.payload
        },
        questionsCreatingSuccess(state, action: PayloadAction<ILegacyQuestion>) {
            state.isLoading = false
            state.error = ''
            state.questions = [...state.questions, action.payload]
        },
        questionsDeleteSuccess(state, action: PayloadAction<number>) {
            state.isLoading = false
            state.error = ''
            state.questions = state.questions.filter(question => question.id !== action.payload);
        },
        questionsFetchingError(state, action: PayloadAction<string>) {
            state.questions = []
            state.isLoading = false
            state.error = action.payload
        },
    }
})