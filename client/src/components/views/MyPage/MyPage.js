import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Sections/MyPage.css";
import EditLayout from "./Sections/EditLayout.js";
import MyPost from "./Sections/MyPost.js";

function MyPage() {
  // 04.18 / 상단 배너 이미지 랜덤으로 띄우기
  useEffect(() => {
    let num = Math.floor(Math.random() * 3) + 1;
    const banner = document.getElementById("topBanner");
    banner.innerHTML = `<img src="/images/myPage/${num}.jpg" />`;
  }, []);

  return (
    <div id="Container">
      {/* 상단배너 */}
      <div id="topBanner"></div>

      {/* 왼쪽 프로필 */}
      <div id="profile">
        <EditLayout isEdit={false} />
      </div>

      {/* 내 게시물 */}
      <div id="myPost">
        <MyPost isPost={false} />
      </div>
    </div>
  );
}

export default withRouter(MyPage);
