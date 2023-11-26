import React, { useState } from "react";

import Headers from "../component/header";

import Footer from "../component/footer";

import "../style/choseSeat.css";

import axios from "axios";

import { useParams, useLocation, useNavigate } from "react-router";

import moment from "moment/moment";

import { useSelector } from "react-redux";

function RowSeat({ position, selectedSeat, setSelectedSeat, bookedSeat }) {
  const getSeatColor = (key) => {
    if (bookedSeat?.find((_item) => _item === `${position}${key}`)) {
      return "#6E7191"; // booked
    } else if (selectedSeat?.find((_item) => _item === `${position}${key}`)) {
      return "#5F2EEA"; // ungu
    } else {
      return "#D6D8E7"; // gray
    }
  };

  const checkIfDisabled = (key) => {
    if (bookedSeat?.find((_item) => _item === `${position}${key}`)) {
      return true; // booked
    } else if (selectedSeat?.find((_item) => _item === `${position}${key}`)) {
      return true; // ungu
    } else {
      return false; // gray
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
    >
      <p>{position}</p>
      {/* left */}
      <div
        style={{
          display: "flex",
          width: "40%",
          justifyContent: "space-between",
        }}
      >
        {[...new Array(7)].map((item, key) => {
          const nextKey = ++key;

          return (
            <div
              style={{
                background: getSeatColor(nextKey),
                borderRadius: "5px",
                width: "25px",
                height: "25px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!checkIfDisabled(nextKey)) {
                  setSelectedSeat([
                    ...selectedSeat,
                    ...[`${position}${nextKey}`],
                  ]);
                }
              }}
            ></div>
          );
        })}
      </div>
      {/* right */}
      <div
        style={{
          display: "flex",
          width: "40%",
          justifyContent: "space-between",
        }}
      >
        {[...new Array(7)].map((item, key) => {
          const keyPage2 = ++key + 7;

          return (
            <div
              style={{
                background: getSeatColor(keyPage2),
                borderRadius: "5px",
                width: "25px",
                height: "25px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!checkIfDisabled(keyPage2)) {
                  setSelectedSeat([
                    ...selectedSeat,
                    ...[`${position}${keyPage2}`],
                  ]);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function RowSeatNumber() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
    >
      <p></p>
      {/* left */}
      <div
        style={{
          display: "flex",
          width: "40%",
          justifyContent: "space-between",
          marginLeft: "16px",
          paddingLeft: "5px",
          marginBottom: "30px",
        }}
      >
        {[...new Array(7)].map((item, key) => (
          <div
            style={{
              width: "25px",
              height: "25px",
            }}
          >
            <p>{1 + key}</p>
          </div>
        ))}
      </div>
      {/* right */}
      <div
        style={{
          display: "flex",
          width: "40%",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        {[...new Array(7)].map((item, key) => {
          const nextKey = key + 8;

          return (
            <div
              style={{
                width: "25px",
                height: "25px",
              }}
            >
              <p>{nextKey}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChoseSeat() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    state: {
      dateMovie,
      timeMovie,
      titleMovie,
      cinemaId,
      cinemaName,
      cinemaLogo,
      price,
      priceDisplay,
    },
  } = useLocation();

  const state = useSelector((state)=>state)

  const {user:{resultToken,resultProfile}} = state


  const [fullDate, setFullDate] = React.useState(null);
  const [setTime, setFullTime] = React.useState(null);
  //booking
  const [bookedSeat, setBookedSeat] = React.useState([]);
  //select seat
  const [selectSeat, setSelectSeat] = React.useState([]);
  //
  const [isLoading, setIsLoading] = React.useState(false);

  const requesHandler = async (req, res) => {
    try {
      const formatDate = moment(dateMovie).format("dddd, DD MMMM YYYY");
      const slugSeatAPI = await axios.post(
        `https://tickitz-be.onrender.com/v1/movie/${slug}/seat`,
        {
          startMovie: `${formatDate} at ${timeMovie}`,
          cinemaId: cinemaId,
        }
      );

      setFullDate(moment(dateMovie).format("ddd, DD MMM YYYY"));
      setFullTime(`${timeMovie}`);

      console.log(slugSeatAPI?.data?.data?.booked ?? []);

      setBookedSeat(slugSeatAPI?.data?.data?.booked ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const requestHandleCheckout = async () => {
    try {
      setIsLoading(true);
      const formatDate = moment(dateMovie).format("dddd, DD MMMM YYYY");
      const requestBooking = await axios.post(
        `https://tickitz-be.onrender.com/v1/ticket/seat`,
        {
          movieSlug: slug,
          cinemaId: cinemaId, // 1, 3, 3
          seat: selectSeat,
          startMovie: `${formatDate} at ${timeMovie}`,
        },
        {
          headers: {
            Authorization: `Bearer ${resultToken}`,
          },
        }
      );

      console.log(requestBooking)

      if (requestBooking.data.data.paymentId) {
        const requestPayment = await axios.patch(
          `https://tickitz-be.onrender.com/v1/ticket/purchase/${requestBooking.data.data.paymentId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${resultToken}`,
            },
          }
          
        );
        
        console.log(requestPayment);
        
        if (requestPayment.data.data.redirect_url) {
          window.location.href = requestPayment.data.data.redirect_url;
        }
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    requesHandler();
  }, []);

  return (
    <>
      <Headers />

      {/* seat section dekstop*/}
      <div className="container-color mt-3 d-dekstop">
        <div className="container">
          <div className="row pt-row">
            <div className="col-8 container mb-5">
              <div className="container">
                <h6>Movie Selected</h6>
              </div>
              <div className="container card">
                <div className="row card-body">
                  <div className="col pt-2">
                    <h6>{titleMovie}</h6>
                  </div>
                </div>
              </div>
              <div className="container mt-3">
                <h6>Chose Your Seat</h6>
              </div>

              <div className="card mb-5">
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "50px 200px 20px 200px",
                  }}
                >
                  {/* screen */}
                  <p className="text-center" style={{ marginLeft: "10%" }}>
                    Screen
                  </p>
                  <div
                    style={{
                      backgroundColor: "#D6D8E7",
                      width: "90%",
                      height: "25px",
                      borderRadius: "10px",
                      marginLeft: "10%",
                    }}
                  />
                </div>
                <div
                  className="container"
                  style={{ padding: "0px 100px 0px 70px" }}
                >
                  <RowSeat
                    position="A"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="B"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="C"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="D"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="E"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="F"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="G"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                </div>
                <div
                  className="container"
                  style={{ padding: "0px 95px 0px 70px" }}
                >
                  <RowSeatNumber />
                </div>
              </div>
            </div>

            {/* order section */}
            <div className="col-4 container">
              <div className="container">
                <h6>Order</h6>
              </div>
              <div className="card">
                <div className="row card-body text-center justify-content-center">
                  <img src={cinemaLogo} alt="logo" style={{ width: "150px", paddingBottom:"10px" }} />
                  <h5>{cinemaName}</h5>
                </div>

                <div className="row card-body text-center">
                  <div className="col-sm text-start mute-text">
                    <p>Movie Selected</p>
                    <p>{fullDate}</p>
                    <p>one price ticket</p>
                    <p>seat chosed</p>
                  </div>
                  <div className="col-md text-end">
                    <p className="p-title">{titleMovie}</p>
                    <p>{setTime}</p>
                    <p>{priceDisplay}</p>
                    <p>{selectSeat.map((item) => `${item},`)}</p>
                  </div>
                </div>

                <hr style={{ width: "100%" }}></hr>

                <div className="row card-body text-center">
                  <div className="col">
                    <h6>Total Payment</h6>
                  </div>
                  <div className="col">
                    <h6>Rp. {price * selectSeat.length}</h6>
                  </div>
                </div>

                <div className="row card-body text-center">
                  <div className="col">
                    <button
                      className="btn-cm btn btn-md btn-outline-primary"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      Change movie
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className={
                        isLoading || selectSeat.length === 0
                          ? "btn-cm btn btn-md btn-secondary"
                          : "btn-cm btn btn-md btn-outline-primary"
                      }
                      type="button"
                      disabled={isLoading || selectSeat.length === 0}
                      onClick={() => requestHandleCheckout()}
                    >
                      {isLoading ? "Loading..." : "Checkout"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end seat section dekstop*/}
     
       {/* seat section mobile*/}
       <div className="container-color mt-3 d-mobile">
        <div className="container">
          <div className="row pt-row">
            <div className="col-12 container mb-5">
              <div className="container">
                <h6>Movie Selected</h6>
              </div>
              <div className="container card">
                <div className="row card-body">
                  <div className="col pt-2">
                    <h6>{titleMovie}</h6>
                  </div>
                </div>
              </div>
              <div className="container mt-3">
                <h6>Chose Your Seat</h6>
              </div>

              <div className="card mb-5">
                <div
                  style={{
                    backgroundColor: "grey",
                    borderRadius: "10px",
                    width :"200px",
                    margin:"90px"
                  }}
                  >
                  <p></p>
                  </div>
                  {/* screen */}
                  <div>
                  <p className="text-center" >
                    Screen
                  </p>
                </div>
                <div
                  className="container"
                  style={{ padding: "0px 100px 0px 70px" }}
                >
                  <RowSeat
                    position="A"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="B"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="C"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="D"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="E"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="F"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                  <RowSeat
                    position="G"
                    selectedSeat={selectSeat}
                    setSelectedSeat={(e) => setSelectSeat(e)}
                    bookedSeat={bookedSeat}
                  />
                </div>
                <div
                  className="container"
                  style={{ padding: "0px 95px 0px 70px" }}
                >
                  <RowSeatNumber />
                </div>
              </div>
            </div>

            {/* order section */}
            <div className="col-12 container">
              <div className="container">
                <h6>Order</h6>
              </div>
              <div className="card">
                <div className="row card-body text-center justify-content-center">
                  <img src={cinemaLogo} alt="logo" style={{ width: "150px", paddingBottom:"10px" }} />
                  <h5>{cinemaName}</h5>
                </div>

                <div className="row card-body text-center">
                  <div className="text-start">
                    <p className="mute-text">Movie Selected</p>
                    <p className="p-title">{titleMovie}</p>
                    <p className="mute-text">{fullDate}</p>
                    <p>{setTime}</p>
                    <p className="mute-text">one price ticket</p>
                    <p>{priceDisplay}</p>
                    <p className="mute-text">seat chosed</p>
                    <p>{selectSeat.map((item) => `${item},`)}</p>
                  </div>
                </div>

                <hr style={{ width: "100%" }}></hr>

                <div className="row card-body text-center">
                  <div className="col">
                    <h6>Total Payment</h6>
                  </div>
                  <div className="col">
                    <h6>Rp. {price * selectSeat.length}</h6>
                  </div>
                </div>

                <div className="row card-body text-center">
                  <div className="col">
                    <button
                      className="btn-cm btn btn-md btn-outline-primary"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      Change movie
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className={
                        isLoading || selectSeat.length === 0
                          ? "btn-cm btn btn-md btn-secondary"
                          : "btn-cm btn btn-md btn-outline-primary"
                      }
                      type="button"
                      disabled={isLoading || selectSeat.length === 0}
                      onClick={() => requestHandleCheckout()}
                    >
                      {isLoading ? "Loading..." : "Checkout"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end seat section mobile*/}
      <Footer />
    </>
  );
}

export default ChoseSeat;
