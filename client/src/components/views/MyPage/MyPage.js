import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./Sections/MyPage.css";

function MyPage() {
  // 04.18 / 상단 배너 이미지 랜덤으로 띄우기
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
      <div id="profile">
        <div class="box">
          <img class="profile" src="../images/profile-image.jpg" />
        </div>
        <div class="userInfo1">
          <h1>오주영</h1>
          <font color="gray">UI/UX </font>
          <p>
            안녕하십니까. 3학년 뉴미디어디자인과 오주영입니다! 자유롭게
            오픈채팅으로 연락 부탁드립니다~
          </p>
        </div>
        <hr class="hr" />
        <div class="userInfo2">
          <h2 class="level">Lv.3 만렙 디자이너</h2>
          <div class="progress">
            <progress value="50" max="100"></progress>
          </div>
          <p />
          <div>
            <strong>소속</strong> <div class="font">DST </div>
            <p />
            <strong>메일</strong> <div class="font">2019d12@e-mirim.hs.kr </div>
            <p />
            <strong>오픈채팅</strong> <div class="font">asdfeljsfd.com </div>
            <p />
          </div>
        </div>
      </div>

      {/* 내 게시물 */}
      <div id="myPost"></div>
    </div>
  );
}

export default withRouter(MyPage);
