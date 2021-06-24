import React, { useRef } from "react";

import "./ShowImage.css";
import useOutsideClick from "../views/NavBar/Sections/useOutsideClick";

function ShowImage({ src, setShowImage }) {
  // show-image__container 참조
  const previewImagesContainer = useRef();
  // 이미지 미리보기 컨테이너 밖 클릭 시 모달 접기
  useOutsideClick(previewImagesContainer, () => {
    setShowImage("");
  });

  return (
    <div className={"show-image__container"}>
      <div className="show-image__contents" ref={previewImagesContainer}>
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
