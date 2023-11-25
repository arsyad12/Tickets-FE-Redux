import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial value berguna seperti react.usstate yang memberikan nilai default pada state
  resultToken:null,
  resultProfile: null,

};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //reducer berguna untuk mengubah nilai dari  state yang awal menjadi hasil terkini dari sebuah proses di page lain
    setResultToken: (state, action) => {
      state.resultToken = action.payload; //nilai payload didapat dari hasil API atau hasil sebuah proses di page lain
    },
    setResultProfile: (state, action) => {
        state.resultProfile = action.payload; //nilai payload didapat dari hasil API atau hasil sebuah proses di page lain
      },
  }, 
});

// kita export si setter agar bisa diakses di halaman lain
export const {
 setResultToken,
 setResultProfile
} = counterSlice.actions;

export default counterSlice.reducer;
