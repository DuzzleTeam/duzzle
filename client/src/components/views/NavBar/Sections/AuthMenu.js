import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import useOutsideClick from "./useOutsideClick";
import "./AuthMenu.css";

// login button or user profile (chohadam, 2021-03-31)
function AuthMenu(props) {
  // 드롭다운 열려있는지
  const [openingDropdown, setOpeningDropdown] = useState(false);
  // 프로필 사진 눌리면
  const profileDropdownHandler = (e) => {
    // 열림 여부 반전
    setOpeningDropdown(!openingDropdown);
  };

  // ProfileContainer 참조
  const profileContainer = useRef();
  // 메뉴 밖 클릭 시 드롭다운 접기
  useOutsideClick(profileContainer, () => {
    setOpeningDropdown(false);
  });

  return (
    <div id="AuthMenu">
      {/* 로그인 되었는지 */}
      {props.isAuth ? (
        // notification and profile image
        <div className="RightMenuContainer">
          {/* Notification */}
          <div className="NoticiationContaier">
            <button className="RightButton NotificationButton">
              <img src="images/notification.png" alt="notification" />
            </button>
          </div>
          {/* Profile */}
          <div ref={profileContainer}>
            {/* Circle Profile Image */}
            <button
              className="RightButton ProfileButton"
              onClick={profileDropdownHandler}
            >
              <img src="images/profile-image.jpg" alt="profileImage" />
            </button>
            {/* Dropdown Menu (My page, Logout) */}
            <ul
              className={`ProfileDropdown ${
                openingDropdown ? "OpeningDropdown" : ""
              }`}
              // 페이지 이동 시 드롭다운 접기
              onClick={() => {
                setOpeningDropdown(false);
              }}
            >
              <li>
                <Link to="/auth/mypage">마이페이지</Link>
              </li>
              <div className="divider"></div>
              <li>
                <Link to="/auth/logout">로그아웃</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // login button
        <Link to="/auth/login">로그인</Link>
      )}
    </div>
  );
}

export default AuthMenu;
