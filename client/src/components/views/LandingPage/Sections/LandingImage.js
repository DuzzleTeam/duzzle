import React from "react";

// CSS
import "./LandingImage.css";

function LandingImage({ browser, mypage }) {
  return (
    <article className={"LandingImage"}>
      {/* mockup */}
      <img
        className={"LandingImageBrowser"}
        src={`/images/landingPage/${browser}.png`}
        alt="browser"
      />

      {/* mypage popup */}
      <img
        className={"LandingImageMypage"}
        src={`/images/landingPage/${mypage}.png`}
        alt="mypage"
      />
    </article>
  );
}

export default LandingImage;
