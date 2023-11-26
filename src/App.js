import React from "react";

//create router brwoser untuk membuat root setiap page
//router provider untuk mengirim data dari provider ke semua page
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import store redux dari store js {store seperti gudang}
//import persistor untuk nymimpan data store ke localstorage
import { store, persistor } from "./store";
//PersistGate untuk menunda rendering UI aplikasi
//sampe integrasi data API selesai dan disimpan ke redux.
import { PersistGate } from "redux-persist/integration/react";
//import provider  dari react redux sebagai penyedia data
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ResetPass from "./pages/ResetPass";
import ChoseSeat from "./pages/ChoseSeat";

//list page
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
        {/* <Link to="about">About Us</Link>  {/* link digunakan untuk ganti anchor atau ahref agar tidak mendownload ulang data dari page yang diakses saat diakses kembali */}
      </div>
    ),
  },
  {
    path: "detail/:slug", //slug adalah parameter yang dilempar ke detail buat nangkap nama movie
    element: <Detail />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "choseSeat/:slug",
    element: <ChoseSeat />,
  },
  {
    path: "resetPassword",
    element: <ResetPass />,
  },
]);

function App() {
  return (
    <>
      {/* jadi provider menyediakan data dari store */}
      <Provider store={store}>
        {/* kemudian persist gate bakal integrasi data store ke localstorage */}
        <PersistGate loading={null} persistor={persistor}>
          {/* dan akhirnya semua data di distribusi ke semua page */}
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
