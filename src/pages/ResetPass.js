import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function ResetPass() {

const [email,setEmail]= React.useState("")
const [isLoading,setLoading] =React.useState(false)
const [isSucces,setSucces] = React.useState(false)
const [errMessage,setErrMsg] = React.useState(null)

const reqHandler = async()=>{

    setLoading(true)
    
    axios.post(`https://tickitz-be.onrender.com/arsyad/auth/forgot-password`,{
    email: email
})
.then(res => {
    console.log(res.data.status)
    if (res?.data) {
        setSucces(true)
    }
})
.catch(err => {
    console.error(err); 
   const errorEmail = err?.response?.data?.messages.email.message
   console.log(errorEmail)
   setErrMsg(errorEmail)
})

.finally(()=>{
    setLoading(false)
})

}

    return (
        <div>
            
    <div style={{ overflow: "hidden" }} className='d-dekstop'>
      <div className="row">
        <div className="col-7 resetPass-img d-block text-center">
          <Link to="/">
            <img
              src="/img/signin/tickitz 1.png"
              alt="tickitz"
              className="logo-white"
            />
            <p className="moto">wait, watch, wow!</p>
          </Link>
        </div>

        <div className="col-5 form-resetPass">
          <div className="text-resetPass ps-5">
            <p className="p-resetPass">Reset Password</p>
            <p className="note-resetPass mute-resetPass">
              Please fill your email 
            </p>
          </div>
          <div class="mb-3 pe-5 ps-5">
            {isSucces?(
            <div className="alert alert-info" role="alert">
              Reset Succes, Please Check Your Email
            </div>
            ):null}
            {errMessage?(
            <div className="alert alert-danger" role="alert">
             {errMessage}
            </div>
            ):null}
            <label for="exampleInputEmail1" class="form-label pt-3">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
           
            <button
              type="button"
              class="btn mt-3 mb-3 btn-resetPass"
              onClick={() => reqHandler()}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Signin"}
            </button>
            <div className="text-center">
              <span className="mute-resetPass" style={{ fontSize: "16px" }}>
                Signin Now?
              </span>
              <Link to ="/signin">
              <span className="text-resetPass px-2" style={{ fontSize: "16px" }}>
                Sign in
              </span>
              </Link>
            </div>
            <div className="text-center pt-2">
              <span className="mute-resetPass" style={{ fontSize: "16px" }}>
                Don’t have an account?
              </span>
              <Link to="/signup">
                <span className="text-resetPass px-2" style={{ fontSize: "16px" }}>
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div style={{ overflow: "hidden" }} className='d-mobile'>
      <div className="row">
        <div className="col-12 resetPass-img-mobile d-block text-center">
          <Link to="/">
            <img
              src="/img/signin/tickitz 1.png"
              alt="tickitz"
              className="logo-white-mobile"
            />
            <p className="moto">wait, watch, wow!</p>
          </Link>
        </div>

        <div className="col-12 form-resetPass-mobile">
          <div className="text-resetPass ps-5">
            <p className="p-resetPass">Reset Password</p>
            <p className="note-resetPass mute-resetPass">
              Please fill your email 
            </p>
          </div>
          <div class="mb-3 pe-5 ps-5">
            {isSucces?(
            <div className="alert alert-info" role="alert">
              Reset Succes, Please Check Your Email
            </div>
            ):null}
            {errMessage?(
            <div className="alert alert-danger" role="alert">
             {errMessage}
            </div>
            ):null}
            <label for="exampleInputEmail1" class="form-label pt-3">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
           
            <button
              type="button"
              class="btn mt-3 mb-3 btn-resetPass"
              onClick={() => reqHandler()}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Signin"}
            </button>
            <div className="text-center">
              <span className="mute-resetPass" style={{ fontSize: "16px" }}>
                Signin Now?
              </span>
              <Link to ="/signin">
              <span className="text-resetPass px-2" style={{ fontSize: "16px" }}>
                Sign in
              </span>
              </Link>
            </div>
            <div className="text-center pt-2">
              <span className="mute-resetPass" style={{ fontSize: "16px" }}>
                Don’t have an account?
              </span>
              <Link to="/signup">
                <span className="text-resetPass px-2" style={{ fontSize: "16px" }}>
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>


        </div>
    )
}

export default ResetPass
