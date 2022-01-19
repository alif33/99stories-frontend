import { storySlice } from './slice'
import { getData, getUserData } from '../../helpers/HttpService'
const { actions: slice } = storySlice

export const setStory = stories => (dispatch) => {
    getData('/contests')
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    // dispatch(slice.setStory(stories))
}

export const setUserStory = token => (dispatch) => {

    console.log('calling...');
    getUserData('/stories/fetch', token)
        .then(stories =>{
            console.log(stories);
            dispatch(slice.setUserStory(stories))
        })


        // await axios.get(`${API_URL}stories/fetch`, {
        //     headers: {
        //     'Authorization': `Bearer ${users.token}`, 
        //     'Content-Type': 'application/json'
        //     }
        // }).then(stories=>dispatch(setUserStory(stories.data)))
        //     .catch(err=>console.log(err))
    
}

export const setAdminStory = token => (dispatch) => {
    getUserData('admin/stories', token)
        .then(stories => dispatch(slice.setAdminStory(stories)))
    
}

