import { tagSlice } from "./slice";
import { getData } from "../../helpers/HttpService"
const { actions: slice } = tagSlice;

export const setTag = () => (dispatch) => {
  getData('/tags')
  .then(response=>dispatch(slice.setTag(response)))
  
}
