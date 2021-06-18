import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// CSS
import "./Section/Footer.css";

import { sns } from "../../../utils/sns";

function Footer() {
  // Redux에서 접속 User 정보 가져오기
  const user = useSelector((state) => state.user.authPayload);

  return (
    <footer>
      <div className="TopFooter">
        {/* Duzzle 로고 이미지 */}
        <div className="FooterLogo">
          <img src="/images/footer/duzzle_white_logo.png" alt="logo" />
        </div>

        {/* SNS, Email, Menu */}
        {/* SNS, Email */}
        <div className="TopLeftFooter">
          <div className="FooterSNS">
            <a
              href={sns.instagram}
              target="_blank"
              rel="noreferrer"
              className="InstaText"
            >
              <img src="/images/footer/instagram.png" alt="" />
            </a>
            <a
              href={sns.facebook}
              target="_blank"
              rel="noreferrer"
              className="FacebookText"
            >
              <img src="/images/footer/facebook.png" alt="" />
            </a>
          </div>
          <span>{"duzzlemanager@gmail.com"}</span>
        </div>
        {/* Menu */}
        <div className="FooterMenu">
          <span>Menu</span>
          <div className="FooterMenuLinks">
            <Link to={"/"}>home</Link>
            <Link to={"/wezzle"}>wezzle</Link>
            {user && <Link to={`/users/${user.email}`}>mypage</Link>}
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
