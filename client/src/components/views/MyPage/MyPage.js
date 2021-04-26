import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Sections/MyPage.css";
import EditLayout from "./Sections/EditLayout.js";

function MyPage() {
  // 유저 정보
  const [user, setUser] = useState({});
  const reduxUser = useSelector((state) => state.user.authPayload);
  useEffect(() => {
    if (reduxUser !== undefined) {
      setUser(reduxUser);
    }
  }, [reduxUser]);

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
        <div className="box">
          <img className="profile" src="../images/profile-image.jpg" />
        </div>
        <div className="userInfo1">
          <h1>{user.name}</h1>
          <font color="gray">{/*{user.field}*/}UI/UX</font>
          <p>{/*{user.introduction}*/}안녕하세요~</p>
        </div>
        <hr className="hr" />
        <div className="userInfo2">
          <h2 className="level">Lv.3{/*{user.level}*/} 만렙 디자이너</h2>
          <div className="progress3">
            <progress value="50" max="100"></progress>
          </div>
          <p />
          <div id="editLayout">
            <EditLayout isEdit={false} />
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
