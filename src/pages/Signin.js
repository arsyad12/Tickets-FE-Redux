import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import user, * as userSlices from "../slices/user";

function Signin() {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const { user: resultToken, resultProfile } = state;

  //state untuk ambil data yang diabmbil dari form pake event onchange
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //state untuk loading saat data sedang di proses
  const [loading, setLoading] = React.useState(false); // nilai default loading false dan akan menampilkan string signup di button

  //state untuk handle error login
  const [isSucces, setSucces] = React.useState(false);
  const [errMssg, setErrMssg] = React.useState(null);

  //navigate berguna untuk membuat private root, agar halaman login dan signup tidak dapat diakses, jika sudah memiliki data didalam local storage
  const navigate = useNavigate();

  React.useEffect(() => {
    if (resultToken && resultProfile) {
      navigate("/");
    }
  });

  const loginHandler = async () => {
    setLoading(true);
    axios
      .post("https://tickitz-be.onrender.com/arsyad/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res); //bisa liat urutan objectnya dengan console dulu
        //mengambil token yang dikirim API
        const token = res.data?.data?.token; //? tanda tanya disini adalah chaining operation, jika respon nya ada maka akan diambil sesuai urutan object
        //mengambil profile yang dikirim API
        const profile = res.data?.data?.result;
        //memasukan token dan data profile ke localstoreage

        dispatch(userSlices.setResultToken(token));
        dispatch(userSlices.setResultProfile(profile));

        setSucces(true);

        window.location.href = "/";
        
      })
      .catch((err) => {
        setSucces(false);
        console.error(err);

        const errEmail = err.response?.data?.messages?.email?.message;
        const errPassword = err.response?.data?.messages;

        setErrMssg(errEmail ?? errPassword ?? "Something Wrong In Our app");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ overflow: "hidden" }} className="d-dekstop">
        <div className="row">
          <div className="col-7 signin-img d-block text-center">
            <Link to="/">
              <img
                src="/img/signin/tickitz 1.png"
                alt="tickitz"
                className="logo-white"
              />
              <p className="moto">wait, watch, wow!</p>
            </Link>
          </div>

          <div className="col-5 form-signin">
            <div className="text-signin ps-5">
              <p className="p-signin">Sign In</p>
              <p className="note-signin mute-signin">
                Sign in with your data that you entered during your registration
              </p>
            </div>
            <div class="mb-3 pe-5 ps-5">
              {isSucces ? (
                <div className="alert alert-info" role="alert">
                  Login Succes
                </div>
              ) : null}
              {errMssg ? (
                <div className="alert alert-danger" role="alert">
                  {errMssg}
                </div>
              ) : null}
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
              <label for="exampleInputEmail1" class="form-label pt-3">
                Password
              </label>
              <input
                type="Password"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                class="btn mt-3 mb-3 btn-signin"
                onClick={() => loginHandler()}
                disabled={loading}
              >
                {loading ? "Loading..." : "Signin"}
              </button>
              <div className="text-center">
                <span className="mute-signin" style={{ fontSize: "16px" }}>
                  Forgot your password?
                </span>
                <Link to="/resetPassword">
                  <span
                    className="text-signin px-2"
                    style={{ fontSize: "16px" }}
                  >
                    Reset Now
                  </span>
                </Link>
              </div>
              <div className="text-center pt-2">
                <span className="mute-signin" style={{ fontSize: "16px" }}>
                  Don’t have an account?
                </span>
                <Link to="/signup">
                  <span
                    className="text-signin px-2"
                    style={{ fontSize: "16px" }}
                  >
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ overflow: "hidden" }} className="d-mobile">
        <div className="row">
          <div className="col-12 signin-img-mobile d-block text-center">
            <Link to="/">
              <img
                src="/img/signin/tickitz 1.png"
                alt="tickitz"
                className="logo-white-mobile"
              />
              <p className="moto">wait, watch, wow!</p>
            </Link>
          </div>

          <div className="col-12 form-signin-mobile">
            <div className="text-signin ps-5">
              <p className="p-signin">Sign In</p>
              <p className="note-signin mute-signin">
                Sign in with your data that you entered during your registration
              </p>
            </div>
            <div class="mb-3 pe-5 ps-5">
              {isSucces ? (
                <div className="alert alert-info" role="alert">
                  Login Success
                </div>
              ) : null}
              {errMssg ? (
                <div className="alert alert-danger" role="alert">
                  {errMssg}
                </div>
              ) : null}
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
              <label for="exampleInputEmail1" class="form-label pt-3">
                Password
              </label>
              <input
                type="Password"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                class="btn mt-3 mb-3 btn-signin"
                onClick={() => loginHandler()}
                disabled={loading}
              >
                {loading ? "Loading..." : "Signin"}
              </button>
              <div className="text-center">
                <span className="mute-signin" style={{ fontSize: "16px" }}>
                  Forgot your password?
                </span>
                <Link to="/resetPassword">
                  <span
                    className="text-signin px-2"
                    style={{ fontSize: "16px" }}
                  >
                    Reset Now
                  </span>
                </Link>
              </div>
              <div className="text-center pt-2">
                <span className="mute-signin" style={{ fontSize: "16px" }}>
                  Don’t have an account?
                </span>
                <Link to="/signup">
                  <span
                    className="text-signin px-2"
                    style={{ fontSize: "16px" }}
                  >
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
