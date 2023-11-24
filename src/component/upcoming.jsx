import React from "react";
import { Link } from "react-router-dom";

function Upcoming(props) {
  const { posters, name, genres,slug } = props;

  return (
    <>
    <div className="card-group p-2">
      <div class="col-2 card d-dekstop" id="poster" style={{ textAlign: "center" }}>
      <Link to = {`/detail/${slug}`}>
        <img class="p-4 size-img-upcoming" src={posters} alt="" />
      </Link>
      <h6 className='h6-name-poster'>{name}</h6>  {/*memanggil nama*/}
        <span class="mute-text" style={{fontSize: "12px", textTransform:"capitalize"}}>{genres.map((item,key) => (
               <span>{genres.length -1 === key ? item : `${item}, `}</span>))}
        </span>
        <Link to = {`/detail/${slug}`}>
        <button type="button" class="btn btn-outline-primary m-3 btn-poster" id="details">
          Detail
        </button>
        </Link>
      </div>
    </div>

      <div class="col-6 card d-mobile" id="poster" style={{ textAlign: "center" }}>
      <Link to =  {`/detail/${slug}`}>
        <img class="p-4 size-img-upcoming" src={posters} alt="" />
      </Link>
      <h6 className='h6-name-poster'>{name}</h6>  {/*memanggil nama*/}
        <span class="mute-text" style={{fontSize: "12px", textTransform:"capitalize"}}>{genres.map((item,key) => (
               <span>{genres.length -1 === key ? item : `${item}, `}</span>))}
        </span>

        <Link to = {`/detail/${slug}`}>
        <button type="button" class="btn btn-outline-primary m-3 btn-poster" id="details">
          Detail
        </button>
        </Link>
      </div>
    </>
  );
}

export default Upcoming;
