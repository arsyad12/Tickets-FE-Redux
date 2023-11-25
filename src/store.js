import { configureStore } from '@reduxjs/toolkit'

//import data state dari slice/movie.js ke store
import movieSlices from './slices/movie'

export const store = configureStore({
  reducer: {
    movie : movieSlices, 
//nah nama store nya movie, trus object movieSlices bakal digunain buat
//controller si setter di movie slice ada setResultNowshowing,setResultUpcoming,setAllResult,dll
  },
})