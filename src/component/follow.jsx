import React from "react";

function Follow(props) {
  const { icon, text } = props;

  return (
    <>
      <div id="fb" className="d-flex gap-2 pt-2 d-dekstop">
        <img src={icon} alt="facebook" srcset="" />
        <span>{text}</span>
      </div>

      <div id="fb" class="d-flex justify-content-center d-mobile">
        <img src={icon} alt="facebook" srcset="" />
        <span>{text}</span>
      </div>
    </>
  );
}

export default Follow;
