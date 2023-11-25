import { combineReducers, configureStore } from '@reduxjs/toolkit'
//import redux persistor untuk nyimpan data ke local storage
import { persistStore, persistReducer } from 'redux-persist'
// koneksi ke defaults to localStorage for web
import storage from 'redux-persist/lib/storage' 
//import data list state movie dari slice/movie.js ke store
import movieSlices from './slices/movie'
//import data list state user dari slice/user.js ke store
import userSlices from './slices/user'

const reducers = combineReducers({
    movie: movieSlices, 
    user: userSlices,
//nah nama store nya movie, trus object movieSlices bakal digunain buat
//controller si setter di slices/moive.js ada setResultNowshowing,setResultUpcoming,setAllResult,dll
  })

  const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
  };

  export const persist = persistReducer(persistConfig, reducers)
  
  export const store = configureStore({
      reducer : persist
    })
    

export let persistor = persistStore(store)