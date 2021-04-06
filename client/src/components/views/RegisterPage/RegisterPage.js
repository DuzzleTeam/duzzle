import React, { useState } from "react";

import "../../../utils/Common.css";
import "./Sections/RegisterPage.css";

// 회원가입 페이지 (chohadam, 2021-04-05)
function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e) => {
    // 회원가입 버튼 클릭 시
    e.preventDefault();
  };

  return (
    <div id="Container" className="RegisterContainer">
      {/* Card Container */}
      <main className="CardContainer">
        {/* Left Contents */}
        <div className="Description">
          <div className="TextContainer">
            <span className="Accent">
              더즐과 함께
              <br />더 즐겨보세요!
            </span>

            <span>
              더즐은 미림인이라면 개발자, 디자이너
              <br />
              상관없이 모두 모여 작품을 공유할 수 있는
              <br />
              공간입니다.
            </span>
          </div>
          <img
            src="/images/signup_puzzle.png"
            alt="duzzle"
            className="Puzzle"
          />
        </div>
        {/* Right Contents */}
        <div className="SignUpContainer">
          <form onSubmit={handleSubmit} className="SignUpForm">
            <h1>회원가입</h1>
            <label>
              이메일
              <input
                className="RegisterInput"
                type="email"
                placeholder="미림 계정으로만 가입 가능합니다."
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              비밀번호
              <input
                className="RegisterInput"
                type="password"
                placeholder="8자 이상 영문, 숫자, 특수문자 포함"
                name="password1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label>
              비밀번호 확인
              <input
                className="RegisterInput"
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </label>

            <div className="AgreeContainer">
              <input type="checkbox" name="agree" id="agree" />
              <label htmlFor="agree"></label>
              <button className="AgreeLink">
                [필수] 개인정보 수집 및 이용 동의
              </button>
            </div>

            <input
              className="RegisterInput RegisterSubmit"
              type="submit"
              value="JOIN"
              disabled={true}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
