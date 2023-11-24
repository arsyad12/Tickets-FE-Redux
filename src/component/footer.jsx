import React from 'react'
import Follow from "../component/follow";

function Footer() {
    return (
        <>
          {/* <!-- section Footer dekstop --> */}

      <footer className="container d-flex justify-content-between mt-10 gap-4 d-dekstop">
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
      </>
    )
}

export default Footer
