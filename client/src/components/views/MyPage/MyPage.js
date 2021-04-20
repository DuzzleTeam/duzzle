import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./Sections/MyPage.css";
import ConfirmLayout from "./Sections/ConfirmLayout";
import EditLayout from "./Sections/EditLayout.js";

function MyPage() {
  // 04.18 / 상단 배너 이미지 랜덤으로 띄우기
  useEffect(() => {
    let num = Math.floor(Math.random() * 3) + 1;
    const banner = document.getElementById("topBanner");
    banner.innerHTML = `<img src="../images/myPage/${num}.jpg" />`;
  }, []);

  // 04.20 / 수정하기 화면 변경
  // const [Edit, setEdit] = useState(<ConfirmLayout />);

  // const onEditHandler = (event) => {
  //   event.preventDefault();
  //   if (Edit == <ConfirmLayout />) {
  //     setEdit(<EditLayout />);
  //   } else {
  //     setEdit(<ConfirmLayout />);
  //   }
  // };

  const [Edit, setEdit] = useState(true);

  const onEditHandler = (event) => {
    event.preventDefault();
    if (Edit == true) {
      setEdit(<EditLayout />);
    } else {
      setEdit(<ConfirmLayout />);
    }
  };

  return (
    <div id="Container">
      {/* 상단배너 */}
      <div id="topBanner"></div>

      {/* 왼쪽 프로필 */}
      <div id="profile">
        <div className="box">
          <img className="profile" src="../images/profile-image.jpg" />
        </div>
        <div className="userInfo1">
          <h1>오주영</h1>
          <font color="gray">UI/UX </font>
          <p>
            안녕하십니까. 3학년 뉴미디어디자인과 오주영입니다! 자유롭게
            오픈채팅으로 연락 부탁드립니다~
          </p>
        </div>
        <hr className="hr" />
        <div className="userInfo2">
          <h2 className="level">Lv.3 만렙 디자이너</h2>
          <div className="progress">
            <progress value="50" max="100"></progress>
          </div>
          <p />
          <div id="editLayout">{Edit}</div>
        </div>
        <button className="edit" onClick={onEditHandler}>
          수정하기
        </button>
      </div>

      {/* 내 게시물 */}
      <div id="myPost">
        <button className="btn apply">
          <strong>지원목록</strong>
        </button>
        <button className="btn post">
          <strong>내 게시물</strong>
        </button>
        <div className="postLayout"></div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
