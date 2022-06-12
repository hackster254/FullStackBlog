// file to handle redux
import {configureStore} from '@reduxjs/toolkit'
import blogsSlice from './features/blogsSlice'
import userSlice from './features/userSlice'
// we will have user and article state in the store
// we need to slices for the two states

//import storage from readux persist
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {persistReducer} from 'redux-persist'

import {appApi} from './services/appApi'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [appApi.reducerPath]
}


const reducers = combineReducers({
    user: userSlice,
    blogs: blogsSlice,
    [appApi.reducerPath]: appApi.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: [thunk, appApi.middleware]
})

export default store






