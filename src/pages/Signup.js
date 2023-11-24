import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  //state untuk ambil data yang diabmbil dari form pake event onchange
  const [fullName, setFullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //state untuk loading saat data sedang di proses
  const [loading, setLoading] = React.useState(false); // nilai default loading false dan akan menampilkan string signup di button

  //state untuk handle error login
  const [isSucces, setSucces] = React.useState(false);
  const [errMssg, setErrMssg] = React.useState(null);

   //navigate berguna untuk membuat private root, agar halaman login dan signup tidak dapat diakses, jika sudah memiliki data didalam local storage
   const navigate = useNavigate()

   React.useEffect(()=>{
    if (localStorage.getItem("token") && localStorage.getItem("profile")) {
      navigate("/")
    }
  })



  const reqisterHandle = async (req, res) => {
    setLoading(true); //saat dijalankan dengan klik button signup nilai loading akan true dan memproses data
    axios
      .post("https://tickitz-be.onrender.com/arsyad/auth/register", {
        // parameter dari form yang dikirim ke API untuk di proses
        email: email,
        password: password,
        fullname: fullName,
        phone_number: phoneNumber,
      })
      .then(() => {
        setSucces(true);//jika login berhasil nilai nya akan true dan menampilkan alert
        console.log("berhasil");
      })
      .catch((err) => {
        setSucces(false); //jika login gagal nilai nya akan false dan tidak menampilkan alert

        console.error("gagal", err);
        
        //variable yang digunakan untuk bikin pesan error, yang bisa diliat dari console log

        const errFullname = err.response?.data?.messages?.fullname?.message;
        const errEmail = err.response?.data?.messages?.email?.message;
        const errPhoneNumber = err.response?.data?.messages?.phone_number?.message;
        const errPassword = err.response?.data?.messages?.password?.message;

        //mengirim nilai variabel ke state errmssg dimulai dari fullname sampe password secara bergantian

        setErrMssg(
          errFullname ??
            errEmail ??
            errPhoneNumber ??
            errPassword ??
            "something wrong in our app"
        );
      })
      .finally(() => {
        setLoading(false); //saat proses then catch selesai state loading dikembalikan lagi ke false agar kembali nampilin string Sgnup
      });
  };

  return (
  <div>
{/* Dekstop SECTION */}
    <div style={{ overflow: "hidden" }} className="d-dekstop">
      <div className="row">
        <div className="col-7 signup-img d-block text-center">
          <Link to="/">
            <img
              src="/img/signin/tickitz 1.png"
              alt="tickitz"
              className="logo-white"
            />
            <p className="moto">wait, watch, wow!</p>
          </Link>
        </div>

        <div className="col-5 form-signup">
          <div className="text-signup ps-5">
            <p className="p-signup">Sign Up</p>
            <p className="note-signup mute-signup">
              Fill your additional details
            </p>
          </div>

          <div className="mb-3 pe-5 ps-5">
            {isSucces ? (
              <div className="alert alert-info" role="alert">
                Register Succes, Please Check Your Email
              </div>
            ) : null}

            {errMssg ? (
              <div className="alert alert-danger" role="alert">
               {errMssg}
              </div>
            ) : null}

            <label for="exampleInputEmail1" className="form-label pt-1">
              Full Name
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="First Name"
              onChange={(event) => setFullName(event.target.value)} // untuk mengirim data ke state setFullname
            />
            <label for="exampleInputEmail1" className="form-label pt-3">
              Phone Number
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Phone Number"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <label for="exampleInputEmail1" className="form-label pt-3">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label for="exampleInputEmail1" className="form-label pt-3">
              Password
            </label>
            <input
              type="Password"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className="btn mt-3 mb-3 btn-signup"
              onClick={() => reqisterHandle()}
              disabled={loading}
            >
              {/* onclick untuk menajalankan function register reqisterHandle */}
              {/* saat loading bernilai tru,maka button di disable  */}

              {loading ? "Loading" : "Sign up"}
              {/* saat nilai loading false, maka akan menampilkan signup di button */}
              {/* saat nilai loading true, maka akan menampilkan Loading di button */}
            </button>
            <div className="text-center">
              <span className="mute-signup" style={{ fontSize: "16px" }}>
                Already have account ?
              </span>
              <Link to="/signin">
                <span className="text-signin px-2" style={{ fontSize: "16px" }}>
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
{/* MOBILE SECTION */}
    <div style={{ overflow: "hidden" }} className="d-mobile">
    <div className="row">
      <div className="col-12 signup-img-mobile d-block text-center">
        <Link to="/">
          <img
            src="/img/signin/tickitz 1.png"
            alt="tickitz"
            className="logo-white-mobile"
          />
          <p className="moto-mobile">wait, watch, wow!</p>
        </Link>
      </div>

      <div className="col-12 form-signup">
        <div className="text-signup ps-5">
          <p className="p-signup">Sign Up</p>
          <p className="note-signup mute-signup">
            Fill your additional details
          </p>
        </div>

        <div className="mb-3 pe-5 ps-5">
          {isSucces ? (
            <div className="alert alert-info" role="alert">
              Register Succes, Please Check Your Email
            </div>
          ) : null}

          {errMssg ? (
            <div className="alert alert-danger" role="alert">
            {errMssg}
            </div>
          ) : null}

          <label for="exampleInputEmail1" className="form-label pt-1">
            Full Name
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="First Name"
            onChange={(event) => setFullName(event.target.value)} // untuk mengirim data ke state setFullname
          />
          <label for="exampleInputEmail1" className="form-label pt-3">
            Phone Number
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Phone Number"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <label for="exampleInputEmail1" className="form-label pt-3">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label for="exampleInputEmail1" className="form-label pt-3">
            Password
          </label>
          <input
            type="Password"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="button"
            className="btn mt-3 mb-3 btn-signup"
            onClick={() => reqisterHandle()}
            disabled={loading}
          >
            {/* onclick untuk menajalankan function register reqisterHandle */}
            {/* saat loading bernilai tru,maka button di disable  */}

            {loading ? "Loading" : "Sign up"}
            {/* saat nilai loading false, maka akan menampilkan signup di button */}
            {/* saat nilai loading true, maka akan menampilkan Loading di button */}
          </button>
          <div className="text-center">
            <span className="mute-signup" style={{ fontSize: "16px" }}>
              Already have account ?
            </span>
            <Link to="/signin">
              <span className="text-signin px-2" style={{ fontSize: "16px" }}>
                Sign In
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

export default Signup;
