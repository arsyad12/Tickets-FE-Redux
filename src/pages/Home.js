import "../style/App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../style/dekstop.css";
import "../style/mobile.css";
import "../style/detail.css";
import "../style/signup.css";
import "../style/signin.css";
import "../style/resetPass.css";

import * as movieSlices from "../slices/movie"

//untuk menggunakan setter redux dari slices/movie.js, harus make use selector ini
//kemudian agar semua datanya bisa di store ke semua komponen kita pake dispatch
import { useSelector,useDispatch } from "react-redux";

import Poster from "../component/poster";
import Upcoming from "../component/upcoming";
import Follow from "../component/follow";

import React from "react"; //untuk menggunakan useeffect dan useState wajib import react
import axios from "axios"; //import axios
import Header from "../component/header";

function Home() {
  //mounted adalah proses pemasangan saat aplikasi sedang dijalankan
  //use state adalah variable biasa yang diambil dengan cara destrukturing

  //nah disini kita definiskan variabel state untuk ngambil object dari halaman slice/movie.js
  const state = useSelector((state)=>state)
  // abis itu kita definisikan dispatch buat store semua data ke komponen lain
  const dispatch = useDispatch()
  console.log(state)

  //state untuk mengambil data dari API
  const [resultNowshowing, setResultNowshowing] = React.useState([]);
  const [resultUpcoming, setResultUpcoming] = React.useState([]); // fungsi array kosong disini pada awal saat aplikasi dijalankan result useState akan bernilai array kosong

  // state untuk mengambil data dari tanggal di PC
  const date = new Date();
  const month = date.toLocaleString("en", { month: "short" }).toLowerCase();
  const [selectedMonth, setSelectedMonth] = React.useState(month);


//penggunaan async await dan trycatch jika mau make lebih dari 1 API
  const responseHanlder = async()=>{
    try {
      const nowshowingAPI = await  axios.get("https://tickitz-be.onrender.com/arsyad/movie/now-showing") //get data dari  API nowshowing dengan axios

        if (nowshowingAPI.status === 200) {

          dispatch(movieSlices.setResultNowshowing(nowshowingAPI.data.data)) //cara mengirim respon API ke state di Redux
          
          // setResultNowshowing(nowshowingAPI.data.data); //set result berfungsi untuk memasukan data dari response ke variabel result
        }
  
        const upcmomingAPI = await axios.get("https://tickitz-be.onrender.com/arsyad/movie/upcoming") //get data dari  API upcoming dengan axios
         if (upcmomingAPI.status === 200) {
          dispatch(movieSlices.setResultUpcoming(upcmomingAPI.data.data))
          // setResultUpcoming(upcmomingAPI.data.data); //set result berfungsi untuk memasukan data dari response ke variabel result
        }

    } catch (error) {
      console.log(error);
    }
  }


  // sebelum consume API dari folder public/api/movie.json install dulu Axios

  React.useEffect(() => {
   responseHanlder() //menjalankan get API dengan memanggil function response handler
  }, []); //fungsi array kosong untuk mencegah lopping  data dari callback useEffect

  return (
    <div className="App">
      {/* section header */}

     <Header/>

      {/* end of section header */}

      {/* section main */}

      <main className="container d-dekstop">
        <div className="row align-items-center d-dekstop">
          <div className="col-md-6 d-dekstop">
            <span className="mute-text">Nearest Cinema, Newest Movie,</span>
            <h1 className="h1">Find out now!</h1>
          </div>

          <div className="col-md-6 mt-5 main- poster d-dekstop">
            <img src="/img/main/Group 14.png" alt="" />
          </div>
        </div>
      </main>

      {/* end of section maain */}

      {/* <!-- section main mobile --> */}
      <main className="container d-mobile">
        <div className="row col-xs-12 d-mobile mt-5">
          <span className="mute-text">Nearest Cinema, Newest Movie,</span>
          <h1 className="h1">Find out now!</h1>
        </div>

        <div className="row col-xs-12 mt-5 d-mobile">
          <img src="/img/main/Group 14.png" alt="" />
        </div>
      </main>
      {/* <!-- end of section mobile --> */}

      {/* <!-- section now showing dekstop --> */}
      <main id="nowshowing">
        <div className="container mt-5 d-dekstop">
          <div className="d-flex justify-content-between d-dekstop">
            <a className="nowshowing" href="/#">
              Now Showing
            </a>
            <a className="nowshowing" href="/#">
              view all
            </a>
          </div>
          <hr />
          <div className="d-flex justify-content-center mt-5 d-dekstop">
            {resultNowshowing
              .slice(0, 5)
              .map((item) => (
                <Poster
                  posters={item.poster}
                  name={item.title}
                  genres={item.genres}
                  slug={item.slug}
                />
              ))}

            {/* filter digunakan untuk filter objek yang nilai isShowing nya true aja item.isShowing === true */}
            {/* slice untuk membatasi jumlah nilai yang diambil */}
            {/* map untuk melooping komponen sesuai dengan data API yang ada */}
            {/* item untuk ngambil nilai array satu persatu*/}
            {/* posters,name,genres adalah parameter yang dilempar dan akan di tangkap di komponen poster*/}
            {/* item.posters,item.name,item.genres adalah objek yang diambil dari result yang isinya data API */}
          </div>
        </div>
      </main>
      {/* <!--  end of section now showing dekstop --> */}

      {/* <!-- now showing mobile --> */}
      <main id="nowshowing">
        <div className="container mt-5 d-mobile">
          <div className="d-flex justify-content-between d-mobile">
            <a className="nowshowing" href="/#">
              Now Showing
            </a>
            <a className="nowshowing" href="/#">
              view all
            </a>
          </div>
          <hr />
          <div className="d-flex justify-content-between mt-5 poster-nowshowing-mobile d-mobile">
            {resultNowshowing
              .slice(0, 5)
              .map((item) => (
                <Poster
                  posters={item.poster}
                  name={item.title}
                  genres={item.genres}
                  slug={item.slug}
                />
              ))}

            {/* filter digunakan untuk filter objek yang nilai isShowing nya true aja bisa juga ditulis item.isShowing === true */}
            {/* slice untuk membatasi jumlah nilai yang diambil */}
            {/* map untuk melooping komponen sesuai dengan data API yang ada */}
            {/* item untuk ngambil nilai array satu persatu*/}
            {/* posters,name,genres adalah parameter yang dilempar dan akan di tangkap di komponen poster*/}
            {/* item.posters,item.name,item.genres adalah objek yang diambil dari result yang isinya data API */}
          </div>
        </div>
      </main>
      {/* <!-- end of now showing mobile --> */}

      {/* <!-- section upcoming dekstop--> */}

      <main className="container mt-5 d-dekstop" id="upcoming">
        <div className="d-flex justify-content-between d-dekstop">
          <a href="/#" style={{fontSize:"20px"}}>Upcoming Movies</a>
          <a className="upcoming" href="/#">
            view all
          </a>
        </div>

        <div className="d-flex justify-content-between mt-5 d-dekstop">
          {["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "des"].map((item) => (
          <button type="button"className={selectedMonth === item ? "btn btn-primary" : "btn btn-outline-primary"} id="month" onClick={()=>{setSelectedMonth(item.toLowerCase())}}>{item}</button>
          ))
          }
        
        </div>

        <div className="d-flex justify-content-center mt-5 d-dekstop">
          {resultUpcoming
          .filter((item)=> (item.showingMonth === selectedMonth))
          .slice(0,5)
          .map((item) => (<Upcoming posters={item.poster} name={item.title} genres={item.genres} slug={item.slug} />))}
        </div>
       
        {resultUpcoming
          .filter((item) => (item.showingMonth === selectedMonth)).length === 0 ? (<p className="text-center mb-5">Movie Not Found</p> ) : null
        }

      </main>

      {/* <!--  end of section upcoming dekstop--> */}

      {/* <!-- upcoming mobile --> */}

      <main className="container mt-5 d-mobile" id="upcoming">
        <div className="d-flex justify-content-between d-mobile">
          <a href="/#">Upcoming Movies</a>
          <a className="upcoming" href="/#">
            view all
          </a>
        </div>

        <div className="d-flex justify-content-between mt-5 d-mobile month-btn">
         
        {["jan", "feb", "mar", "apr", "mey", "june", "july", "aug", "sep", "oct", "nov", "des"].map((item) => (
          <button type="button"className={selectedMonth === item ? "btn btn-primary" : "btn btn-outline-primary"} id="month" onClick={()=>{setSelectedMonth(item.toLowerCase())}}>{item}</button>
          ))
          }
          
        </div>

        <div className="d-flex justify-content-between mt-5 d-mobile poster-upcoming-mobile">
          {resultUpcoming
          .filter((item) => (item.showingMonth=== selectedMonth))
          .slice(0,5)
          .map((item) => (<Upcoming posters={item.poster} name={item.title} genres={item.genres} slug={item.slug}/>))
          }
        </div>
        {resultUpcoming
          .filter((item) => (item.showingMonth === selectedMonth)).length === 0 ? (<p >Movie Not Found</p> ) : null
        }
      </main>

      {/* <!-- end of upcoming mobile --> */}

      {/* <!-- section Call to action --> */}

      <main className="container" id="cta">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="mute-text" style={{ fontSize: "17px" }}>
            Be the vanguard of the
          </span>
          <h2>Moviegoers</h2>
        </div>

        <div className="container d-flex justify-content-center mt-3">
          <div className="p-2 g-col-6">
            <input
              type="input"
              className="form-control"
              id="inputPassword2"
              placeholder="type your email"
            />
          </div>

          <div className="p-2 g-col-6">
            <button type="submit" className="btn btn-primary join">
              Join Now
            </button>
          </div>
        </div>

        <div className="container mt-3" style={{ textAlign: "center" }}>
          <span className="mute-text" style={{ fontSize: "13px" }}>
            By joining you as a Tickitz member,
          </span>
          <br />
          <span className="mute-text" style={{ fontSize: "13px" }}>
            we will always send you the latest updates via email .
          </span>
        </div>
      </main>

      {/* <!-- end of  section Call to action --> */}

      {/* <!-- section Footer dekstop --> */}

      <footer className="container d-flex justify-content-between mt-5 gap-4 d-dekstop">
        <div className="col-3 d-dekstop">
          <img
            className="d-block"
            src="/img/logo/Tickitz 1.png"
            alt="logo"
            srcset=""
          />
          <span className="mute-text d-block text-start">
            Stop waiting in line. Buy tickets
          </span>
          <span className="mute-text d-block text-start">
            conveniently, watch movies quietly.
          </span>
        </div>

        <div className="col-3 d-dekstop">
          <h6 className="text-start">Explore</h6>
          <span className="mute-text d-block text-start">Home</span>
          <span className="mute-text d-block text-start">List Movie</span>
        </div>

        <div className="col-3 d-dekstop">
          <h6 className="text-start">Our Sponsor</h6>
          <img
            className="d-block pt-2"
            src="/img/sponsor/ebv.id 2.svg"
            alt="logo"
            srcset=""
          />
          <img
            className="d-block pt-2"
            src="/img/sponsor/CineOne21 2.svg"
            alt="logo"
            srcset=""
          />
          <img
            className="d-block pt-3"
            src="/img/sponsor/hiflix 2.svg"
            alt="logo"
            srcset=""
          />
        </div>

        <div className="col-3 d-dekstop">
          <h6 className="text-start">Follow us</h6>
          <Follow icon ="/img/sponsor/eva_twitter-outline.svg" text="Tickitz Cinema Id"/>
          <Follow icon ="/img/sponsor/bx_bxl-instagram.svg" text="Tickitz.id"/>
          <Follow icon ="/img/sponsor/eva_facebook-outline.svg" text="Tickitz.id"/>
          <Follow icon ="/img/sponsor/feather_youtube.svg" text="Tickitz Cinema Id"/>
        </div>
      </footer>

      {/* <!-- end of section Footer dekstop --> */}

      {/* <!-- section Footer Mobile --> */}

      <footer className="container d-block mt-5 gap-4 d-mobile">
        <div class="col-12 d-mobile text-center">
          <img src="/img/logo/Tickitz 1.png" alt="logo" srcset="" />
          <span class="mute-text d-block">
            Stop waiting in line. Buy tickets
          </span>
          <span class="mute-text d-block">
            conveniently, watch movies quietly.
          </span>
        </div>

        <div class="col-12 d-mobile text-center pt-4">
          <h6>Explore</h6>
          <span class="mute-text d-block">Home</span>
          <span class="mute-text d-block">List Movie</span>
        </div>

        <div class="col-12 d-mobile pt-4">
          <div class="col-12 d-mobile d-flex justify-content-center">
            <h6>Our Sponsor</h6>
          </div>

          <div class="col-12 d-mobile d-flex justify-content-center">
            <img
              class="pt-2"
              src="/img/sponsor/ebv.id 2.svg"
              alt="logo"
              srcset=""
            />
          </div>

          <div class="col-12 d-mobile d-flex justify-content-center">
            <img
              class="pt-2"
              src="/img/sponsor/CineOne21 2.svg"
              alt="logo"
              srcset=""
            />
          </div>

          <div class="col-12 d-mobile d-flex justify-content-center">
            <img
              class="pt-3"
              src="/img/sponsor/hiflix 2.svg"
              alt="logo"
              srcset=""
            />
          </div>
        </div>

        <div class="col-12 d-mobile pt-4">
          <div class="d-flex justify-content-center">
            <h6>Follow us</h6>
          </div>
          <Follow icon ="/img/sponsor/eva_twitter-outline.svg" text="Tickitz Cinema Id"/>
          <Follow icon ="/img/sponsor/bx_bxl-instagram.svg" text="Tickitz.id"/>
          <Follow icon ="/img/sponsor/eva_facebook-outline.svg" text="Tickitz.id"/>
          <Follow icon ="/img/sponsor/feather_youtube.svg" text="Tickitz Cinema Id"/>
        </div>
      </footer>

      {/* <!-- end of section Footer Mobile --> */}

      {/* <!-- section copyright --> */}

      <div className="container mt-5 mb-5">
        <h6 className="mute-text" style={{ textAlign: "center;" }}>
          © 2020 Tickitz. All Rights Reserved.
        </h6>
      </div>

      {/* <!-- end of section copyright --> */}
    </div>
  );
}

export default Home;
