import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial value berguna seperti react.usstate yang memberikan nilai default pada state
  resultNowshowing: [],
  resultUpcoming: [],
  detailMovie: [],
  cinemaMovie: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //reducer berguna untuk mengubah nilai dari  state yang awal menjadi hasil terkini dari sebuah proses di page lain
    setResultNowshowing: (state, action) => {
      state.resultNowshowing = action.payload; //nilai payload didapat dari hasil API atau hasil sebuah proses di page lain
    },
    setResultUpcoming: (state, action) => {
      state.resultUpcoming = action.payload;
    },
    setAllResultMovie: (state, action) => {
      //di redux, bisa mengupdate seluruh datadengan sati object function seperti ini
      state.resultNowshowing = action.payload.resultNowshowing;
      state.resultUpcoming = action.payload.resultUpcoming;
    },
    setDetailMovie: (state, action) => {
        //disini menggunakan spread Array operator berguna kalo udah ada data sebelumnya bisa disimpan
        //dan kalo ada data baru tambahin ke data yang udah ada 
      state.detailMovie = [...state.detailMovie, ...action.payload];
    },
    setCinemaMovie: (state, action) => {
        //kemudian ada juga spread operator object
        //karena setiap movie ada beda beda cinema 
        //jadi kita rubah format data nya, untuk nama kita buat array 
        //dan isi nya  yang  berbentuk object adalah data cinema 
      state.cinemaMovie = {...state.cinemaMovie, [action.payload.movieName]:action.payload.data};
        //nama movie nya kita tangkap dari parameter slug yang dilempar dari detail.js
        //buat data nya kita tangkap dari hasil fetch API yang dilempar dari detail.js
    },
  }, 
});

// kita export si setter agar bisa diakses di halaman lain
export const {
  setResultNowshowing,
  setResultUpcoming,
  setAllResult,
  setDetailMovie,
  setCinemaMovie,
  setDetailandCinema,
} = counterSlice.actions;

export default counterSlice.reducer;
