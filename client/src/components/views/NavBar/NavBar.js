import React from "react";
import { Link } from "react-router-dom";

import "./Sections/NavBar.css";

function NavBar() {
  return (
    <div className="NavContainer">
      <div id="LogoContainer">
        <img src="http://localhost:3000/logo.png" alt="Duzzle Logo" />
      </div>
      <ul className="NavList">
        <Link to="wezzle">위즐</Link>
        <Link to="mezzle">미즐</Link>
      </ul>
      <div id="AuthMenu">
        <Link to="login">로그인</Link>
      </div>
    </div>
  );
}

export default NavBar;
