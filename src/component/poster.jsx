import React from 'react'
import { Link } from "react-router-dom";

function Poster(props) {

    const{posters,name,genres,slug}= props  //props digunakan untuk menangkap parameter yang dilempar dari Home.js parameter itu berisi data API

    return (  
<>
<div className="card-group p-1">
<div class="col-2 card card-nowshowing d-dekstop" id="poster">
    <Link to = {`/detail/${slug}`}>
    <img class="p-3 size-img-poster" src={posters} alt="" /> {/*memanggil poster*/}
    </Link>
    <h6 className='h6-name-poster'>{name}</h6>  {/*memanggil nama*/}
    <span class="mute-text" style={{fontSize: "12px"}}>{genres.map((item,key) => (
               <span style={{textTransform:"capitalize"}}>{genres.length -1 === key ? item : `${item}, `}</span>))}</span> {/*Memanggil genres*/}
    <Link to = {`/detail/${slug}`}>
    <button type="button" class="btn btn-outline-primary m-3 btn-poster" id="details">Detail</button>
    </Link>
</div>
</div>

<div class="col-6 card card-nowshowing d-mobile" id="poster">
<Link to = {`/detail/${slug}`}>
<img class="p-4 size-img-poster" src={posters} alt="" /> {/*memanggil poster*/}
</Link>
    <h6 className='h6-name-poster'>{name}</h6> {/*memanggil nama*/}
    
    <span class="mute-text" style={{fontSize: "12px"}}>{genres.map((item,key) => (
               <span style={{textTransform:"capitalize"}}>{genres.length -1 === key ? item : `${item}, `}</span>))}</span> {/*Memanggil genres*/}


<Link to ={`/detail/${slug}`}>
    <button type="button" class="btn btn-outline-primary m-3 btn-poster" id="details">Detail</button>
    </Link>
</div>

</>

    );

  
}

export default Poster;