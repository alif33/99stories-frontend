import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: "users",
    initialState: {
        token: '',
        user: null,
        isUser: false
    },
    reducers: {

        userLogin: (state, action) => {
            return {
                ...state,
                isUser: true,
                token: action.payload.token,
                user: action.payload.user
            }
 
        },

        updatedProfile: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        },

        userLogout: (state, action) => {
            return {
                ...state,
                isUser: false,
                token: '',
                user: null
            }
        }
    }
})
