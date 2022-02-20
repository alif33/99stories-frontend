import { createSlice } from "@reduxjs/toolkit"

export const contestSlice = createSlice({
    name: "contests",
    initialState: {
        contestList: [],
        userContestList: [],
        adminContestList: [],
    },
    reducers: {
        setContest: (state, action) => {
            return{
                ...state,
                contestList: action.payload,
            }
        },
        setUserContest: (state, action) => {
            return{
                ...state,
                userContestList: action.payload,
            }
        },
        setAdminContest: (state, action) => {
            return{
                ...state,
                adminContestList: action.payload,
            }
        }
    }
})
