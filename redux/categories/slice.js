import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categoryList: null,
    },
    reducers: {
        setCategory: (state, action) => {
            return {
                ...state,
                categoryList: action.payload
            }
        } 
    }
})
