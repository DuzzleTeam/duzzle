import React, { useEffect, useState } from "react";

import { sns } from "../../../../utils/sns";

// CSS
import "./Duzzle.css";

// 더 즐겁게 ~ 하라
const textList = ["DEVELOP", "DESIGN", "WORKING", "TOGETHER"];

function Duzzle() {
  // 인덱스를 통해 textList 값을 가져옴
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // 1초마다 인덱스 값을 증가시킴
    const countdown = setInterval(() => {
      if (index < textList.length - 1) {
        // Together가 아니면 인덱스 증가
        setIndex(index + 1);
      } else {
        // Together면 다시 develop으로 변경
        setIndex(0);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [index]);
  return (
    <section id="Container" className="LandingDuzzle">
      {/* 더 즐겁게, ~ 하라 */}
      <article>
        <h1 className="MainText">
          <span>더 즐겁게,</span>
          <div className="Text2Container">
            {/* Together이면 클래스를 부여해 CSS에서 색상을 변경할 수 있도록 함 */}
            <span
              className={
                textList[index] === "TOGETHER" ? "Text2 Together" : "Text2"
              }
            >
              {/* ~ 하라 부분 */}
              {textList[index]}
            </span>{" "}
            하라
          </div>
        </h1>
      </article>

      {/* puzzle gif */}
      <article className={"PuzzleGif"}>
        <img src="/images/landingPage/puzzle.gif" alt="puzzle" />
      </article>

      {/* instagram, facebook */}
      <article className="SNSContainer">
        <div className="Instagram">
          {/* text link */}
          <a
            href={sns.instagram}
            target="_blank"
            rel="noreferrer"
            className="InstaText"
          >
            instagram
          </a>
          {/* arrow image */}
          <img src="/images/arrow.png" alt="instagram" />
        </div>

        <div className="Facebook">
          <a
            href={sns.facebook}
            target="_blank"
            rel="noreferrer"
            className="FacebookText"
          >
            facebook
          </a>
          <img src="/images/arrow.png" alt="facebook" />
        </div>
      </article>
    </section>
  );
}

export default Duzzle;
