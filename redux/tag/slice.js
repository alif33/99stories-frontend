import { createSlice } from "@reduxjs/toolkit"

export const tagSlice = createSlice({
    name: "tags",
    initialState: {
        tagList: null,
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
