import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from '../redux/users/slice'
import { categorySlice } from '../redux/categories/slice'
import { adminSlice } from '../redux/admins/slice'
import { SettingSlice } from '../redux/settings/slice'
import { storySlice } from '../redux/stories/slice'
import { contestSlice } from '../redux/contests/slice'
import { tagSlice } from './../redux/tag/slice';

export const rootReducer = combineReducers({
    users: userSlice.reducer,
    admins: adminSlice.reducer,
    settings: SettingSlice.reducer,
    categories: categorySlice.reducer,
    stories: storySlice.reducer,
    contests: contestSlice.reducer,
    tags: tagSlice.reducer
})