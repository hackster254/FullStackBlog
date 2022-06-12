import {createSlice} from '@reduxjs/toolkit'
import { appApi } from '../services/appApi'

const initialState = []

export const blogsSlice = createSlice({
    name: 'blog',
    initialState,
    extraReducers: (builder)=> {
        builder.addMatcher(appApi.endpoints.getAllBlogs.matchFulfilled,(state, {payload})=> {
            return payload
        })
    }

})


export default blogsSlice.reducer