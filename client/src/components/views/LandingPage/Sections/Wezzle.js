import React, { useEffect } from "react";

// hooks
import useAnimation from "../../../../hooks/useAnimation";

import LandingText from "./LandingText";
import LandingImage from "./LandingImage";

import "./WezzleMezzle.css";

function Wezzle({ startAnimation }) {
  const text = {
    title1: "협업은 더 쉽게",
    accent: "위즐",
    description1: [
      "에서 프로젝트를 함께할 팀원들을 더 쉽게 구해보세요.",
      "그동안 프로젝트를 하고 싶은데 팀원을 구하기 어려웠다면,",
      "위즐을 이용해보세요!",
    ],
    title2: "빠르게 프로젝트를 시작하고 싶다면",
    description2: [
      "위즐에서 팀원을 모집하고 있는 프로젝트에 협업해요 버튼 클릭 한 번으로",
      "협업 의사를 밝힐 수 있어요. 협업을 지원한 프로젝트는 마이페이지에서",
      "모아볼 수 있답니다.",
    ],
  };

  const [wezzleRef, onStartWezzle, resetStyle] = useAnimation(
    { opacity: true },
    1
  );
  useEffect(() => {
    if (!wezzleRef.ref.current) return;

    if (startAnimation) {
      onStartWezzle();
    } else {
      resetStyle();
    }
  }, [startAnimation, wezzleRef, onStartWezzle, resetStyle]);

  return (
    <section {...wezzleRef} className={"LandingWezzleMezzle LandingWezzle"}>
      <LandingText icon={"blue"} text={text} {...startAnimation} />
      <LandingImage
        browser={"wezzle-browser"}
        mypage={"wezzle-mypage"}
        {...startAnimation}
      />
    </section>
  );
}

export default Wezzle;
