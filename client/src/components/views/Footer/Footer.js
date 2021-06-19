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
        <div className="FooterFirst">
          {/* Duzzle 로고 이미지 */}
          <div className="FooterLogo">
            <img src="/images/footer/duzzle_white_logo.png" alt="logo" />
          </div>

          {/* Team, email, address */}
          <span>team. puzzle</span>
          <span>duzzlemanager@gmail.com</span>
          <span>(08821) 서울시 관악구 호암로 546 (신림동)</span>
        </div>

        {/* 더즐이란 */}
        <div className="FooterSecond">
          <span>DUZZLE ?</span>
          <span>
            DUZZLE은 미림마이스터고 학생들의
            <br />
            빠르고 편리한 협업과 컨펌을 위한
            <br />
            서비스입니다.
          </span>
        </div>

        {/* Menu */}
        <div className="FooterMenu">
          <span>Navigation</span>
          <div className="FooterMenuLinks">
            {user && (
              <Link
                to={
                  // 로그인 안 했으면 login으로
                  // 했다면 mypage로
                  user.email !== undefined ? `/users/${user.email}` : "/login"
                }
              >
                마이페이지
              </Link>
            )}
            <Link to={"/wezzle"}>위즐</Link>
            <Link to={"/mezzle"}>미즐</Link>
          </div>
        </div>

        {/* SNS */}
        <div className="FooterSNS">
          <span>SNS</span>
          <a
            href={sns.facebook}
            target="_blank"
            rel="noreferrer"
            className="FacebookText"
          >
            <img src="/images/footer/facebook.png" alt="" />
            <span>facebook</span>
          </a>
          <a
            href={sns.instagram}
            target="_blank"
            rel="noreferrer"
            className="InstaText"
          >
            <img src="/images/footer/instagram.png" alt="" />
            <span>instagram</span>
          </a>
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
