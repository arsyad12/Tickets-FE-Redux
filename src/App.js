import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import ResetPass from "./pages/ResetPass"
import ChoseSeat from "./pages/ChoseSeat"

//list page
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home/>
        {/* <Link to="about">About Us</Link>  {/* link digunakan untuk ganti anchor atau ahref agar tidak mendownload ulang data dari page yang diakses saat diakses kembali */}  
      </div>
    ),
  },
  {
    path: "detail/:slug", //slug adalah parameter yang dilempar ke detail buat nangkap nama movie
    element: <Detail/>
  },
  {
    path: "signup",
    element : <Signup/>
  },
  {
    path : "signin",
    element : <Signin/>
  },
{
  path :"choseSeat/:slug",
  element: <ChoseSeat/>
},
{
  path : "resetPassword",
  element : <ResetPass/>
}
]);


function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
