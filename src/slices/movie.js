import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial value berguna seperti react.usstate yang memberikan nilai default pada state
  resultNowshowing: [],
  resultUpcoming: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: { //reducer berguna untuk mengubah nilai dari  state yang awal menjadi hasil terkini dari sebuah proses di page lain
    setResultNowshowing: (state, action) => { 
      state.resultNowshowing = action.payload; //nilai payload didapat dari hasil API atau hasil sebuah proses di page lain
    },
    setResultUpcoming: (state, action) => {
      state.resultUpcoming = action.payload;
    },
    setAllResult: (state, action) => { //di redux, bisa mengupdate seluruh datadengan sati object function seperti ini
        state.resultNowshowing = action.payload.resultNowshowing; 
        state.resultUpcoming = action.payload.resultUpcoming;
      },
  },
});

// kita export si setter agar bisa diakses di halaman lain
export const { setResultNowshowing,setResultUpcoming,setAllResult } = counterSlice.actions;

export default counterSlice.reducer;
