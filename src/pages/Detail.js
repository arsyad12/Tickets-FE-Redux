import React, { useState } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import movie, * as movieSlices from "../slices/movie"
import { useSelector,useDispatch } from "react-redux";

function Detail() {
  const navigate = useNavigate();
  const { slug } = useParams(); //request parameter

//dispatch biar data bisa dipake ke seluruh page/component
  const dispatch = useDispatch()

//panggil state yang isinya adalah store movie 
//yang didalam nya semua object state slice/movie.js
  const state = useSelector((state)=>state)
  const{movie:{detailMovie,cinemaMovie}} = state
  const{user:{resultToken,resultProfile}} =state

//biasanya orang kalo liat film kan bakal buka banyak detail nya
//jadi supaya detail film yang di tampilin sesuai, kita buat variable
//findMovie dengan mencocokan list film yang ada di redux (detailMovie)
//dengan parameter dari slug
  const findMovie = detailMovie.find((item) => item.slug === slug) ?? []
//kenapa perlu ?? [] itu digunain buat set default value nya biar ga error pas di refresh

//nah buat cinema kita buatin variable untuk ngambil data
//berdasarkan nama movie yang ada di parameter slug
  const listCinema = cinemaMovie[slug] ?? []
//kenapa perlu ?? [] itu digunain buat set default value nya biar ga error pas di refresh

  const [dateMovie, setDateMovie] = useState(null);
  const [timeMovie, setTimeMovie] = useState(null);

  const responseHandler = async () => {
    try {

      
if (findMovie.length === 0) {
        const detailMovieAPI = await axios.get(
          `https://tickitz-be.onrender.com/arsyad/movie/detail/${slug}`
        ); //get data API dari axios
        //jika ada data yang didapet dari API maka akan masuk ke response
        
if (detailMovieAPI.data.data.length > 0) {
  
          dispatch(movieSlices.setDetailMovie(detailMovieAPI.data.data))

// setdetailMovie(detailMovieAPI.data.data[0]);
//kenapa dibagian dispatch ga make array [0] lagi?
//karena di bagian slices/movie.js 
//kita udah set kalo data nya akan di set dalam bentuk array object
//state.detailMovie = [...state.detailMovie, ...action.payload];

        }
      }

    
if (listCinema.length===0) {
      const cinemaAPI = await axios.get(
        `https://tickitz-be.onrender.com/arsyad/movie/${slug}/cinemas`
      ); //get data API dari axios
      //jika ada data yang didapet dari API maka akan masuk ke response
      

if (cinemaAPI.data.data.length > 0) {

//cara ngirim data data ke state yang berbentuk spread operator object

        dispatch(movieSlices.setCinemaMovie({
//jadi kita set state nya dengan ngirim nama movie dari data parameter slug
          movieName : slug,
//dan buat set state data nya pake data dari API 
          data : cinemaAPI.data.data
        }))
      }
    }
     
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    responseHandler();
  }, []); //fungsi array kosong untuk mencegah lopping  data dari callback useEffect

  window.scrollTo(0, 0);

  return (
    <>
      <Header />

      <div className="container mt-5 d-dekstop">
        {findMovie === null ? (
          <div className="text-center padding-spinner ">
            <div className="spinner-border" role="status">
              <br />
            </div>
            <span className="loading d-block" style={{ paddingTop: "10px" }}>
              Loading...
            </span>
          </div>
        ) : null}

        {findMovie != null ? (
          <div className="row">
            <div className="col-3">
              <div className="card card-body">
                <img className="p-3" src={findMovie.poster} alt="" />
              </div>
            </div>
            <div className="col-9 px-5">
              <h3 className="mb-2 h3-detail">{findMovie.title}</h3>
              <span className="genre" style={{ textTransform: "capitalize" }}>
                {findMovie?.genres?.map((item, key) => (
                  <span>
                    {findMovie.genres.length - 1 === key ? item : `${item}, `}
                  </span>
                ))}
              </span>

              <div className="row mt-5">
                <div className="col-6">
                  <span className="span-detail">Release date</span>
                  <p>{findMovie.release}</p>
                </div>
                <div className="col-6 mt-1">
                  <span className="span-detail">Directed by</span>
                  <p>{findMovie.director}</p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-6">
                  <span className="span-detail">Duration</span>
                  <p>{findMovie.duration}</p>
                </div>
                <div className="col-6 mt-1">
                  <span className="span-detail">Cast</span>
                  <p className="genre">
                    {findMovie?.cast?.map((item, key) => (
                      <span>
                        {findMovie.cast.length - 1 === key
                          ? item
                          : `${item}, `}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
                  <hr className="hr-detail"></hr>
                </div>
              </div>

              <div className="row mt-2 mb-5">
                <div className="col-12">
                  <h6>Synopsis</h6>
                  <p className="synopsis-detail">{findMovie.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="container mt-5 d-mobile">
        {findMovie === null ? (
          <div className="text-center padding-spinner ">
            <div className="spinner-border" role="status">
              <br />
            </div>
            <span className="loading d-block" style={{ paddingTop: "10px" }}>
              Loading...
            </span>
          </div>
        ) : null}

        {findMovie != null ? (
          <div className="row">
            <div className="col-12">
              <div className="card card-body">
                <img className="p-3" src={findMovie.poster} alt="" />
              </div>
            </div>
            <div className="col-12 px-5">
              <h3 className="mb-2 h3-detail pt-5">{findMovie.title}</h3>
              <span className="genre" style={{ textTransform: "capitalize" }}>
                {findMovie?.genres?.map((item, key) => (
                  <span>
                    {findMovie.genres.length - 1 === key ? item : `${item}, `}
                  </span>
                ))}
              </span>

              <div className="row mt-5">
                <div className="col-6">
                  <span className="span-detail">Release date</span>
                  <p>{findMovie.release}</p>
                </div>
                <div className="col-6 mt-1">
                  <span className="span-detail">Directed by</span>
                  <p>{findMovie.director}</p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-6">
                  <span className="span-detail">Duration</span>
                  <p>{findMovie.duration}</p>
                </div>
                <div className="col-6 mt-1">
                  <span className="span-detail">Cast</span>
                  <p className="genre">
                    {findMovie?.cast?.map((item, key) => (
                      <span>
                        {findMovie.cast.length - 1 === key
                          ? item
                          : `${item}, `}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
                  <hr className="hr-detail"></hr>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-12">
                  <h6>Synopsis</h6>
                  <p className="synopsis-detail">{findMovie.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="container mt-5 mb-5 text-center">
        <h5>Showtimes and Tickets</h5>
      </div>

      <div className="container mb-5">
        <div className="row gap-2 justify-content-center ">
          <div className="calendars" style={{ width: "260px" }}>
            <input
              className="col"
              type="date"
              class="form-control"
              onChange={(selectDate) => setDateMovie(selectDate.target.value)}
            />
          </div>

          <div className="times" style={{ width: "260px" }}>
            <select
              className=" col form-select"
              aria-label="Default select example"
              onChange={(selectTime) => setTimeMovie(selectTime.target.value)}
            >
              <option selected>Select Times</option>
              <option value="10:00">10:00</option>
              <option value="13:00">13:00</option>
              <option value="16:00">16:00</option>
              <option value="19:00">19:00</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {listCinema.map((item) => (
            <div className="col col-md-4 mt-2">
              <div className="card">
                
                <div className="card-body row">
                  <div className="col-sm logo text-center pt-3">
                    <img src={item.logo} alt="logo" />
                  </div>
                  <div className="col-sm cinema-name cinema-address text-center">
                    <div className="row justify-content-center">
                    <p
                      style={{
                        marginBottom: "5px",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="p-address"
                      style={{ marginTop: "3px", fontSize: "12px"}}
                    >
                      {item.address}
                    </p>
                    </div>
                  </div>
                </div>

                <hr
                  className="line"
                  style={{ width: "100%", marginTop: "0%" }}
                />

                <div className="card-body">
                  <span className="mute-text" style={{ fontSize: "12px" }}>
                    {item.movieStart.map((nesteditem) => (
                      <span
                        style={{ textTransform: "capitalize", margin: "12px" }}
                      >
                        {nesteditem} WIB
                      </span>
                    ))}
                  </span>
                </div>

                <div className="card-body">
                  <div className="d-flex" style={{ gap: "160px" }}>
                    <p className="card-text mute-text mx-3">Price</p>
                    <p className="card-text" style={{ fontWeight: "bold" }}>
                      Rp. {item.priceDisplay}
                    </p>
                  </div>
                </div>

                <div className="card-body">
                  <button
                    type="button"
                    className={
                      dateMovie && timeMovie
                        ? "btn  btn-active"
                        : "btn  btn-disable"
                    }
                    disable={!dateMovie || !timeMovie}
                    onClick={() => {
                      if (dateMovie && timeMovie)
                        navigate(`/choseSeat/${slug}`, {
                          state: {
                            dateMovie,
                            timeMovie,
                            titleMovie: findMovie.title,
                            cinemaId: item.id,
                            cinemaName: item.name,
                            cinemaLogo: item.logo,
                            price : item.price,
                            priceDisplay : item.priceDisplay
                          },
                        });
                    
                 if (!resultToken && !resultProfile) {
                  navigate("/")
                 }
                    
                      }}

                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Detail;