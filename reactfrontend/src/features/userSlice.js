import {createSlice} from '@reduxjs/toolkit'
import { appApi } from '../services/appApi'

const initialState = {
   
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder)=> {
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, {payload})=> {
            // state.user = payload.user
            console.log(payload, 'user signup ')
            // return payload.user
            state.user = payload.user
            state.token = payload.token
            //return payload
        })

        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, {payload})=> {

            console.log(payload, 'user trying to login : ')
            state.user = payload.user
            state.token = payload.token
            //return payload
        })

        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, (state)=> {
            console.log('trying to logout the user', state)
            delete state.user;
            delete state.token;
        })
    }

})


export default userSlice.reducer