import React, { useEffect } from "react";
// hooks
import useAnimation from "../../../../hooks/useAnimation";

import LandingText from "./LandingText";
import LandingImage from "./LandingImage";

import "./WezzleMezzle.css";

function Mezzle({ startAnimation }) {
  const text = {
    title1: "소통은 더 유익하게",
    accent: "미즐",
    description1: [
      "에서 개발부터 디자인, 아이디어까지 다양한 주제로 소통해보세요.",
      "다양한 의견을 듣고 지식을 나누고 싶다면, 미즐을 이용해보세요!",
    ],
    title2: "프로젝트에서 발생한 문제를 해결하고 싶다면",
    description2: [
      "미즐에서 개발, 디자인, 아이디어 등 어떤 주제든 상관없이 글을 작성해보세요.",
      "더즐을 사용하는 사람들이 댓글을 통해 문제점을 함께 해결해 줄 거예요.",
      "작성한 글은 마이페이지에서 모아볼 수 있답니다.",
    ],
  };

  const [mezzleRef, onStartMezzle] = useAnimation({ opacity: true }, 1);
  useEffect(() => {
    if (!mezzleRef.ref.current) return;

    if (startAnimation) {
      onStartMezzle();
    } else {
      // reset style
      const style = JSON.stringify(mezzleRef.style).replace(/{|}|"/g, "");
      mezzleRef.ref.current.style = style;
    }
  }, [startAnimation, mezzleRef, onStartMezzle]);

  return (
    <section {...mezzleRef} className={"LandingWezzleMezzle"}>
      <LandingImage browser={"mezzle-browser"} mypage={"mezzle-mypage"} />

      <LandingText icon={"orange"} text={text} />
    </section>
  );
}

export default Mezzle;
