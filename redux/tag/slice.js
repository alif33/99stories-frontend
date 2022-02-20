import { createSlice } from "@reduxjs/toolkit"

export const tagSlice = createSlice({
    name: "tags",
    initialState: {
        tagList: [],
    },
    reducers: {
        setTag: (state, action) => {
            return {
                ...state,
                tagList: action.payload
            }
        } 
    }
})
