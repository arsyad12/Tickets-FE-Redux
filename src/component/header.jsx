import React, { useState } from "react";
import "../style/App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../style/dekstop.css";
import "../style/mobile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import  {persistor} from '../store'

function Header() {

  const state = useSelector((state)=>state)

  const{user:{resultToken,resultProfile}} = state

 
  return (
    <>
      <header>
        <nav className="container d-flex justify-content-between mt-3">
          <div className="container d-flex gap-4 menu">
            <img clas="logo" src="/img/logo/Tickitz 1.png" alt="logo" />
            <a className="mt-3 d-dekstop" id="home" href="/#">
              Home
            </a>
            <a className="mt-3 d-dekstop" id="list" href="/#">
              List Movies
            </a>
          </div>

          <div className="profile-dropdown d-dekstop">
            {resultProfile ? ( //jika profile ditemukan di local storage setelah login, maka tampilkan foto dari profil
              <img
                className="d-dekstop dropdown-toggle"
                data-bs-toggle="dropdown"
                src={resultProfile?.photo}
                alt="profile"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#e5e5e5",
                  borderRadius: "50%",
                  marginTop: "10px",
                }}
              />
            ) : (
              //jika tidak ada maka tampilkan signup button
              <Link to="signup">
                <button
                  type="button"
                  className="btn btn-primary mt-3 d-dekstop"
                  id="signup"
                >
                  Sign Up
                </button>
              </Link>
            )}
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Reset Password
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    persistor.purge()
                    window.location.href = "/";
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>

          {/* Header Mobile */}

          <div className="d-mobile">
            <nav className="navbar d-mobile">
              <div className="container-fluid">
                <div className="profile-dropdown">
                  {resultProfile ? ( //jika profile ditemukan di local storage setelah login, maka tampilkan foto dari profil
                    <img
                      src={resultProfile?.photo}
                      alt="profile"
                      className="dropdown-toggle"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e5e5e5",
                        borderRadius: "50%",
                        marginTop: "10px",
                      }}
                    />
                  ) : (
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                      aria-controls="navbarNav"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <img src="/img/icon/hamburger.png" alt="" />
                    </button>
                  )}
                  {/* modal */}
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Menu
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body row ">
                          <div>
                          
                            <button
                              type="button"
                              class="btn btn-secondary mt-2"
                              style={{ width: "50%" }}
                              onClick={() => {
                                window.location.href = "/";
                              }}
                            >
                              Home
                            </button>
                            
                          </div>
                          <div>
                            <button
                              type="button"
                              class="btn btn-secondary mt-2"
                              style={{ width: "50%" }}
                            >
                              Profile
                            </button>
                          </div>
                          <div>
           
                            <button
                              type="button"
                              class="btn btn-secondary mt-2"
                              style={{ width: "50%" }}
                              onClick={() => {
                                window.location.href = "/resetPassword";
                              }}
                            >
                              Reset Password
                            </button>
                  
                          </div>
                          <div>
                            <button
                              type="button"
                              class="btn btn-danger mt-2"
                              style={{ width: "50%" }}
                              onClick={() => {
                                persistor.purge()
                                window.location.href = "/";
                              }}
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end of modal */}
                </div>
              </div>
            </nav>
          </div>
        </nav>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item d-flex justify-content-center">
              <a className="nav-link" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item d-flex justify-content-center">
              <a className="nav-link" href="/#">
                List
              </a>
            </li>
            <li className="nav-item d-flex justify-content-center">
            <Link to="signup">
              <button
                type="button"
                className="btn btn-primary mt-3"
                id="signup"
              >
                Sign Up
              </button>
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* end of section header */}
    </>
  );
}

export default Header;
