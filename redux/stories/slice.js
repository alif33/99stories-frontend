import { createSlice } from "@reduxjs/toolkit"

export const storySlice = createSlice({
    name: "stories",
    initialState: {
        storyList: null,
        userStoryList: null,
        adminStoryList: null,
    },
    reducers: {
        setStory: (state, action) => {
            return{
                ...state,
                storyList: action.payload,
            }
        },
        
        // setUserStory: (state, action) => {
        //     return{
        //         ...state,
        //         userStoryList: action.payload,
        //     }
        // },

        setUserStory: (state, action) => {
            return{
                ...state,
                userStoryList: action.payload,
            }
        },

        setAdminStory: (state, action) => {
            return{
                ...state,
                adminStoryList: action.payload,
            }
        },

    }
})
