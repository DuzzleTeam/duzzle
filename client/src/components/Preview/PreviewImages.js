import React from "react";

import "./PreviewImages.css";

function PreviewImage({ images, setShowImage }) {
  return (
    <section className="write-form__section--images">
      {images.map((url, index) => (
        <button
          key={index}
          className={"image-preview__button--show"}
          onClick={(e) => {
            e.preventDefault();
            setShowImage(url);
          }}
        >
          <img
            className={"write-form__image--preview"}
            src={url}
            key={index}
            alt={"upload"}
          />
        </button>
      ))}
    </section>
  );
}

export default PreviewImage;
