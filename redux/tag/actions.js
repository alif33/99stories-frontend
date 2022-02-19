import { tagSlice } from "./slice";
import { getData } from "../../helpers/HttpService"
const { actions: slice } = tagSlice;

export const setTag = () => (dispatch) => {
  getData('/')
  .then(response=>dispatch(slice.setTag(response)))
  
}
