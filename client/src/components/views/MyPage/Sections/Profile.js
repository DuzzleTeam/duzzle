import React from "react";

import "./Profile.css";

function Profile({ user }) {
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
        <span className="ProfileLevel">{`Lv.${user.level} 레벨 코멘트`}</span>
        <div className="ProfileLevelBar">
          <div className="ProfileFillLevelBar"></div>
        </div>

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
        <button className="ButtonProfileEdit">수정하기</button>
      </div>
    </article>
  );
}

export default Profile;
