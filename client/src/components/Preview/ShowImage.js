import React from "react";

import "./ShowImage.css";

function ShowImage({ src, setShowImage }) {
  return (
    <div className={"show-image__container"}>
      <div className="show-image__contents">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowImage("");
          }}
          className={"show-image__button--cancel"}
        >
          <img src="/images/exit.png" alt="cancel" />
        </button>

        <img src={src} alt="show" className="show-image__image" />
      </div>
    </div>
  );
}

export default ShowImage;
