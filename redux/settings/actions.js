import { SettingSlice } from "./slice";
const { actions: slice } = SettingSlice;


export const sidebarToggle = status => (dispatch) => {
  dispatch(slice.sidebarToggle(status))
}

export const modalToggle = status => (dispatch) => {
  dispatch(slice.modalToggle(status))
}
