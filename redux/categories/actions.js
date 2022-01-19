import { categorySlice } from "./slice";
import { getData } from "../../helpers/HttpService"
const { actions: slice } = categorySlice;

export const setCategory = () => (dispatch) => {
  getData('/categories')
  .then(response=>dispatch(slice.setCategory(response)))
  
}
