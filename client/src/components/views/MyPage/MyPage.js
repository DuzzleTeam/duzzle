import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Sections/MyPage.css";

function MyPage() {
  useEffect(() => {
    let num = Math.floor(Math.random() * 3) + 1;
    const banner = document.getElementById("topBanner");
    banner.innerHTML = `<img src="../images/myPage/${num}.jpg" />`;
  }, []);

  return (
    <div id="Container">
      {/* 상단배너 */}
      <div id="topBanner"></div>
      {/* 왼쪽 프로필 */}
      <div id="profile"></div>
      {/* 내 게시물 */}
      <div id="myPost"></div>
    </div>
  );
}

export default withRouter(MyPage);
