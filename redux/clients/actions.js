import { clientSlice } from './slice'
import { getUserData } from '../../helpers/HttpService'
const { actions: slice } = clientSlice

export const setUserStory = stories => (dispatch) => {
    dispatch(slice.setUserStory(stories))
}

