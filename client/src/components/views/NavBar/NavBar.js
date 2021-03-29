import React from "react";
import { Link } from "react-router-dom";

import "./Sections/NavBar.css";

function NavBar() {
  return (
    // Nav 최상위 컨테이너
    <div id="NavContainer">
      {/* Logo */}
      <div className="NavLeftContainer">
        <Link to="/">
          <img src="logo.png" alt="Duzzle Logo" />
        </Link>
        {/* Menu */}
        <ul className="NavList">
          <Link to="wezzle">위즐</Link>
          <Link to="mezzle">미즐</Link>
        </ul>
      </div>
      {/* 로그인 or 프로필 사진 & 알림 */}
      <div id="AuthMenu">
        <Link to="login">로그인</Link>
      </div>
    </div>
  );
}

export default NavBar;
