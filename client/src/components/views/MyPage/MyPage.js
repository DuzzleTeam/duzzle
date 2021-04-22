import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./Sections/MyPage.css";
import EditLayout from "./Sections/EditLayout.js";

function MyPage() {
  // 04.21 / 수정하기 버튼
  const [Infobtn, setInfobtn] = useState("수정하기");
  const [Bool, setBool] = useState(false);

  // 04.18 / 상단 배너 이미지 랜덤으로 띄우기
  useEffect(() => {
    let num = Math.floor(Math.random() * 3) + 1;
    const banner = document.getElementById("topBanner");
    banner.innerHTML = `<img src="../images/myPage/${num}.jpg" />`;
  }, []);

  const onEditHandler = () => {
    if (Infobtn == "수정하기") {
      setInfobtn("확인하기");
      setBool(true);
    } else {
      setInfobtn("수정하기");
      setBool(false);
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
          <div id="editLayout">
            <EditLayout isEdit={Bool} />
          </div>
          <div className="divEdit">
            <button className="edit" onClick={onEditHandler}>
              {Infobtn}
            </button>
          </div>
        </div>
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
