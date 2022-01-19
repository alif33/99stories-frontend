import { userSlice } from "./slice";
const { actions: slice } = userSlice;

export const userLogin = user => (dispatch) => {
    dispatch(slice.userLogin(user))
}

export const updatedProfile = user => (dispatch) => {
    dispatch(slice.updatedProfile(user))
}

export const userLogout = () => (dispatch) => {
    dispatch(slice.userLogout())
}
