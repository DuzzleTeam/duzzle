import React, { useEffect } from "react";
// hooks
import useAnimation from "../../../../hooks/useAnimation";

// CSS
import "./LandingText.css";

// Wezzle, Mezzle Description
// chohadam, 2021-06-20

// icon : title 위 puzzle icon
// text : {
//  title1,
//  description1,
//  title2,
//  description2
// }
function LandingText({ icon, text, startAnimation }) {
  const { title1, accent, description1, title2, description2 } = text;

  // animation
  const translate = `translateX(${accent === "위즐" ? -150 : 150}%)`;
  const transform = { transform: translate };
  const duration = 0.8;
  const delay = 0.2;

  // icon
  const [iconRef, onStartIcon, resetStyleIcon] = useAnimation(
    transform,
    duration
  );

  // 협업은 더 쉽게
  const [title1Ref, onStartTitle1, resetStyleTitle1] = useAnimation(
    transform,
    duration
  );

  // 위즐에서 ~
  const [desc1Ref, onStartDesc1, resetStyleDesc1] = useAnimation(
    transform,
    duration,
    delay
  );

  // 빠르게 프로젝트를 시작~
  const [title2Ref, onStartTitle2, resetStyleTitle2] = useAnimation(
    transform,
    duration,
    delay * 2
  );

  // 위즐에서 ~
  const [desc2Ref, onStartDesc2, resetStyleDesc2] = useAnimation(
    transform,
    duration,
    delay * 3
  );

  // animation start and reset
  useEffect(() => {
    if (startAnimation) {
      onStartIcon();
      onStartTitle1();
      onStartDesc1();
      onStartTitle2();
      onStartDesc2();
    } else {
      resetStyleIcon();
      resetStyleTitle1();
      resetStyleDesc1();
      resetStyleTitle2();
      resetStyleDesc2();
    }
  }, [
    startAnimation,
    onStartIcon,
    resetStyleIcon,
    onStartTitle1,
    resetStyleTitle1,
    onStartDesc1,
    resetStyleDesc1,
    onStartTitle2,
    resetStyleTitle2,
    onStartDesc2,
    resetStyleDesc2,
  ]);

  return (
    <article className={"LandingTextContainer"}>
      <img {...iconRef} src={`/images/landingPage/${icon}.png`} alt={accent} />
      <h1 {...title1Ref} className={"LandingTextTitle"}>
        {title1}
      </h1>
      <p {...desc1Ref} className={"LandingTextDescription"}>
        <span data-color={icon} className={"LandingTextAccent"}>
          {accent}
        </span>
        {description1.map((txt, index) => (
          <span key={index}>{txt}</span>
        ))}
      </p>

      <h2 {...title2Ref} className={"LandingTextTitle"}>
        {title2}
      </h2>
      <p {...desc2Ref} className={"LandingTextDescription"}>
        {description2.map((txt, index) => (
          <span key={index}>{txt}</span>
        ))}
      </p>
    </article>
  );
}

export default LandingText;
