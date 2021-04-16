import React from "react";
import { Link } from "react-router-dom";

import AuthMenu from "./Sections/AuthMenu";
import "./Sections/NavBar.css";

function NavBar() {
  return (
    // Nav 최상위 컨테이너
    <nav id="NavContainer">
      {/* Logo */}
      <div className="NavLeftContainer">
        <Link to="/">
          <img src="/logo.png" alt="Duzzle Logo" />
        </Link>
        {/* Menu */}
        <ul className="NavList">
          <li>
            <Link to="/wezzle">위즐</Link>
          </li>
          <li>
            <Link to="/mezzle">미즐</Link>
          </li>
        </ul>
      </div>
      {/* 로그인 or 프로필 사진 & 알림 */}
      <AuthMenu />
    </nav>
  );
}

export default NavBar;
