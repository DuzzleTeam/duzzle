import React from "react";

import "./Profile.css";

function Profile({ user }) {
  return (
    <article className={"MypageLeftProfile"}>
      {/* 프로필 사진 */}
      <img width={100} src={user.profileImage} alt="" />

      {/* 이름 */}
      <span className="ProfileName">{user.name}</span>
      {/* 분야 */}
      <span className="ProfileField">{"디자인"}</span>

      {/* 소개 */}
      <span className="ProfileIntro">{"안녕하세요."}</span>

      {/* divide */}

      {/* 레벨 */}
      <span className="ProfileLevel">{"Lv.3 만렙 디자이너"}</span>

      {/* 소속, 메일, 오픈채팅 */}
      <div className="ProfileContact">
        <span>소속</span>
        <span>{"CPU"}</span>

        <span>메일</span>
        <span>{user.email}</span>

        <span>오픈채팅</span>
        <span>{"asdfsad"}</span>
      </div>

      {/* 수정하기 버튼 */}
      <button className="ButtonProfileEdit">수정하기</button>
    </article>
  );
}

export default Profile;
