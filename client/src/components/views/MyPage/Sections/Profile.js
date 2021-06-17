import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LevelBar from "./LevelBar";

import "./Profile.css";

function Profile({ user, setIsEditing }) {
  // Redux에서 접속 User 정보 가져오기
  const connectUser = useSelector((state) => state.user.authPayload);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (connectUser) {
      // 접속 유저 정보가 있을 때 실행
      if (user._id === connectUser._id) {
        // 접속 유저와 마이페이지 유저가 같다면
        setIsAuth(true);
      }
    }
  }, [connectUser, user._id]);

  return (
    <article className={"MypageLeftProfile"}>
      {/* 프로필 사진 */}
      <img src={user.profileImage} alt="" />

      {/* 프로필 사진 외 텍스트들 */}
      <div className="MypageTextContainer">
        {/* 이름 */}
        <span className="ProfileName">{user.name}</span>
        {/* 분야 */}
        <span className="ProfileField">{user.field}</span>

        {/* 소개 */}
        <span className="ProfileIntro">{user.introduction}</span>

        {/* divide */}
        <hr className={"hr"} />

        {/* 레벨 */}
        <LevelBar level={user.level} />

        {/* 소속, 메일, 오픈채팅 */}
        <div className="ProfileContact">
          <span>소속</span>
          <span>{user.group}</span>

          <span>메일</span>
          <span>{user.email}</span>

          <span>오픈채팅</span>
          <span>{user.openChating}</span>
        </div>

        {/* 수정하기 버튼 */}
        {/* 현재 접속 유저가 마이페이지 유저와 동일할 때만 보여줌 */}
        {isAuth && (
          <button
            onClick={() => setIsEditing(true)}
            className="ButtonProfileEdit"
          >
            수정하기
          </button>
        )}
      </div>
    </article>
  );
}

export default Profile;
