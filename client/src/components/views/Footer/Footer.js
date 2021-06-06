import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./Section/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="TopFooter">
        {/* Duzzle 로고 이미지 */}
        <div className="FooterLogo"></div>

        {/* SNS, Email, Menu */}
        {/* SNS, Email */}
        <div className="TopLeftFooter">
          <div className="FooterSNS"></div>
          <span>{"duzzlemanager@gmail.com"}</span>
        </div>
        {/* Menu */}
        <div className="FooterMenu">
          <span>Menu</span>
          <div className="FooterMenuLinks">
            <Link to={"/"}>home</Link>
            <Link to={"/wezzle"}>wezzle</Link>
            <Link to={"/mypage"}>mypage</Link>
            <Link to={"/mezzle"}>mezzle</Link>
          </div>
        </div>
      </div>

      {/* divider */}
      <hr className={"FooterDivider"} />

      {/* 하단 푸터 (copyright, 개인정보처리방침) */}
      <div className="BottomFooter">
        <span>{"COPYRIGHT 2021. Duzzle All rights reserved."}</span>
        <a
          href="https://chohadam.tistory.com/3"
          target="_blank"
          rel="noreferrer"
          className="InstaText"
        >
          개인정보처리방침
        </a>
      </div>
    </footer>
  );
}

export default Footer;
