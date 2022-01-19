import { contestSlice } from './slice'
import { getData, getUserData } from '../../helpers/HttpService'
const { actions: slice } = contestSlice

export const setContest = () => (dispatch) => {
    getData('contests')
        .then(contests=>dispatch(slice.setContest(contests)))
    
}

export const setUserContest = token => (dispatch) => {
    getUserData('contests/fetch', token)
        .then(contests=>dispatch(slice.setUserContest(contests)))
    
}

export const setAdminContest = token => (dispatch) => {
    getUserData('admin/contests', token)
        .then(contests=>dispatch(slice.setAdminContest(contests)))
    
}

