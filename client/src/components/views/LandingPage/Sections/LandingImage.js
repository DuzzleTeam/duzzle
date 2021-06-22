import React, { useEffect } from "react";
import useAnimation from "../../../../hooks/useAnimation";

// CSS
import "./LandingImage.css";

function LandingImage({ browser, mypage, startAnimation }) {
  // animation
  const translateY = `translateY(100%)`;
  const translateX = `translateX(${mypage.includes("wezzle") ? 150 : -150}%)`;
  const duration = 0.8;
  const delay = 0.1;

  // browser
  const [browserRef, onStartBrowser, resetStyleBrowser] = useAnimation(
    { transform: translateY },
    duration,
    delay
  );

  // mypage
  const [mypageRef, onStartMypage, resetStyleMypage] = useAnimation(
    { transform: translateX },
    duration,
    delay * 2
  );

  useEffect(() => {
    if (startAnimation) {
      onStartBrowser();
      onStartMypage();
    } else {
      resetStyleBrowser();
      resetStyleMypage();
    }
  }, [
    startAnimation,
    onStartBrowser,
    resetStyleBrowser,
    onStartMypage,
    resetStyleMypage,
  ]);
  return (
    <article className={"LandingImage"}>
      {/* mockup */}
      <img
        {...browserRef}
        className={"LandingImageBrowser"}
        src={`/images/landingPage/${browser}.png`}
        alt="browser"
      />

      {/* mypage popup */}
      <img
        {...mypageRef}
        className={"LandingImageMypage"}
        src={`/images/landingPage/${mypage}.png`}
        alt="mypage"
      />
    </article>
  );
}

export default LandingImage;
