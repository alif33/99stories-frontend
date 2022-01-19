import { createSlice } from "@reduxjs/toolkit"

export const clientSlice = createSlice({
    name: "stories",
    initialState: {
        storyList: null,
        clientList: null,
    },
    reducers: {
        setStory: (state, action) => {
            return{
                ...state,
                storyList: action.payload,
            }
        },
        setContest: (state, action) => {
            return{
                ...state,
                clientList: action.payload,
            }
        }
    }
})
