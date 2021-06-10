import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editUser } from "../../../../_actions/user_action";

import Input from "./Input";
import Loading from "../../../Loading/Loading";

// CSS
import "./EditProfile.css";

function EditProfile({ user, setUser, setIsEditing }) {
  // Form data state
  const [name, setName] = useState(user.name);
  const [field, setField] = useState(user.field);
  const [introduction, setIntroduction] = useState(user.introduction ?? "");
  const [group, setGroup] = useState(user.group);
  const [openChating, setOpenChating] = useState(user.openChating);

  // Redux dispatch
  const dispatch = useDispatch();

  // 프로필 이미지
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // 실제 수정 요청 보내기
  const onEditSubmit = async (e) => {
    e.preventDefault();

    // 로딩
    setIsLoading(true);

    // 변경했다면 변경한 이미지 URL, 아니면 null
    const imageUrl = await onProfileHandler();

    // null이면 현 프로필 URL 대입
    const profileImage = imageUrl ? imageUrl : user.profileImage;
    // 요청을 보낼 body 객체
    const body = {
      profileImage,
      name,
      field,
      introduction,
      group,
      openChating,
    };

    // 회원정보 수정
    const response = await dispatch(editUser(body));

    // 로딩 완료
    setIsLoading(false);

    if (response.payload.editSuccess) {
      alert("수정되었습니다!");
      // 수정된 유저 저장
      setUser((prevUser) => {
        return {
          ...prevUser,
          ...body,
        };
      });
    } else {
      alert("수정에 실패하였습니다.");
    }

    // 수정 화면에서 벗어남
    setIsEditing(false);
  };

  // 프로필 사진 변경 (제출 눌렀을 때)
  const onProfileHandler = async () => {
    if (image) {
      // Image state가 변경되었을 떄
      // form data 생성
      const formData = new FormData();
      formData.append("selectImg", image);

      // 이미지 서버에 업로드
      const res = await axios.post("/api/upload", formData);

      // 새로운 이미지 파일 이름 저장
      const imageUrl = "/" + res.data.filename.toString();

      return imageUrl;
    }

    return null;
  };

  const profileImageRef = useRef();
  const onProfileImageChange = (e) => {
    // 업로드 한 파일 객체
    const file = e.target.files[0];
    // 미리보기를 위해서 file reader 생성
    const reader = new FileReader();

    // image 정보 객체 저장
    setImage(file);

    // 리더가 로드되면
    reader.addEventListener(
      "load",
      () => {
        // 이미지 변경
        profileImageRef.current.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <article className={"MypageEditProfile"}>
      {/* 프로필 사진 편집 */}
      <div className="EditProfileImageContainer">
        {/* 실제 file input */}
        <input
          type="file"
          className={"EditProfileImageInput"}
          accept="image/*"
          onChange={onProfileImageChange}
        />
        {/* 이미지 위에 검은색 편집 프레임 */}
        <div className="EditProfileImage">
          {/* 카메라 아이콘 */}
          <img src="/images/myPage/image_edit.png" alt="edit" />
          <span>편집</span>
        </div>
        <img
          ref={profileImageRef}
          className={"UserProfileImage"}
          src={user.profileImage}
          alt="profile"
        />
      </div>

      {/* 프로필 사진 외 텍스트들 */}
      <form className="EditProfileForm" onSubmit={onEditSubmit}>
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
        <button type="submit" className="ButtonEditComplete">
          완료하기
        </button>
      </form>

      {/* 로딩 중이라면 (수정 요청 보낸 후) */}
      {isLoading && <Loading />}
    </article>
  );
}

export default EditProfile;
