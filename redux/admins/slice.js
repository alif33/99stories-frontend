import { createSlice } from "@reduxjs/toolkit"


export const adminSlice = createSlice({
    name: "admins",
    initialState: {
        token: '',
        admin: null,
        isAdmin: false
    },
    reducers: {

        adminLogin: (state, action) => {
            return {
                ...state,
                isAdmin: true,
                token: action.payload.token,
                admin: action.payload.user
            }
 
        },

        adminLogout: (state, action) => {
            return {
                ...state,
                isAdmin: false,
                token: '',
                admin: null
            }
        }
    }
})
