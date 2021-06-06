import React, { useEffect, useState } from "react";

// CSS
import "./Banner.css";

// image 목록
import { images } from "./banner-images";

// 최상단 배너 컨테이너
function Banner({ postType }) {
  // 현재 페이지 배너 + 그 외 배너들
  const IMAGES = [postType, ...images];

  // 인덱스를 통해 image url 값을 가져옴
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // 5초마다 인덱스 값을 증가시킴
    const countdown = setInterval(() => {
      if (index < images.length) {
        // 마지막 이미지가 아니면 인덱스 증가
        setIndex(index + 1);
      } else {
        // 마지막 이미지면 0으로 설정
        setIndex(0);
      }
    }, 5000);
    return () => clearInterval(countdown);
  }, [index]);

  // transform 구하기
  const getStyle = () => {
    const style = {
      transform: `translateX(-${index * 100}%)`,
    };
    return style;
  };

  return (
    <section className={"FeedBannerContainer"}>
      {/* 가로로 배너 이미지들을 배치함 */}
      <ul className={"BannerSlide"}>
        {/* 이미지별로 li > img를 만듬 */}
        {IMAGES.map((image, index) => (
          // 각각의 li에 스타일을 적용함
          // 현재 index를 기준으로 배너 슬라이드
          <li key={index} style={getStyle()}>
            {/* 실제 배너 이미지 */}
            <img src={`/images/banner/${image}.gif`} alt="banner" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Banner;
