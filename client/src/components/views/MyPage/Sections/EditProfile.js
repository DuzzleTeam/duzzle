import React, { useState } from "react";

// CSS
import "./EditProfile.css";
import Input from "./Input";

function EditProfile({ user }) {
  // Form data state
  const [name, setName] = useState(user.name);
  const [field, setField] = useState(user.field);
  const [introduction, setIntroduction] = useState(user.introduction);
  const [group, setGroup] = useState(user.group);
  const [openChating, setOpenChating] = useState(user.openChating);

  return (
    <article className={"MypageEditProfile"}>
      {/* 프로필 사진 편집 */}
      <div className="EditProfileImageContainer">
        {/* 이미지 위에 검은색 편집 프레임 */}
        <div className="EditProfileImage">
          {/* 카메라 아이콘 */}
          <img src="/images/myPage/image_edit.png" alt="edit" />
          <span>편집</span>
        </div>
        <img className={"UserProfileImage"} src={user.profileImage} alt="" />
      </div>

      {/* 프로필 사진 외 텍스트들 */}
      <form className="EditProfileForm">
        {/* 이름 */}
        <Input
          className="ProfileName"
          value={name}
          setValue={setName}
          placeholder={"이름"}
        />

        {/* 분야 */}
        <Input
          className="ProfileField"
          value={field}
          setValue={setField}
          placeholder={"분야"}
        />

        {/* 소개 */}
        <textarea
          className="ProfileIntro"
          value={introduction}
          rows={Math.ceil(introduction.length / 15) + 1}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder={"소개"}
        />

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
          <Input value={group} setValue={setGroup} placeholder={""} />

          <span>메일</span>
          <span>{user.email}</span>

          <span>오픈채팅</span>
          <Input
            value={openChating}
            setValue={setOpenChating}
            placeholder={""}
          />
        </div>

        {/* 수정하기 버튼 */}
        <button className="ButtonEditComplete">완료하기</button>
      </form>
    </article>
  );
}

export default EditProfile;
