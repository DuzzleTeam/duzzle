import React, { useState, useEffect } from "react";

import "../../../utils/Common.css";
import "./Sections/RegisterPage.css";

// 회원가입 페이지 (chohadam, 2021-04-05)
function RegisterPage() {
  // 이메일
  const [email, setEmail] = useState("");
  // 비밀번호
  const [password, setPassword] = useState("");
  // 비밀번호 확인
  const [password2, setPassword2] = useState("");

  // 미림 이메일인지
  const [isMirimEmail, setIsMirimEmail] = useState(true);
  // 비밀번호 요구 조건 충족하는지
  const [pwCheck, setPwCheck] = useState(true);
  // 비밀번호와 확인이 일치한지
  const [equalPw, setEqualPw] = useState(true);
  // 개인정보 수집에 동의했는지
  const [agreed, setAgreed] = useState(false);

  // 모든 유효성 검사를 통과했는지
  const [isAllPassed, setIsAllPassed] = useState(false);
  // 각각의 유효성 검사 결과가 바뀔 때마다 실행됨
  useEffect(() => {
    // 모두 통과했는지 (all true -> true)
    setIsAllPassed(isMirimEmail && pwCheck && equalPw && agreed);
  }, [isMirimEmail, pwCheck, equalPw, agreed]);

  const handleSubmit = (e) => {
    // 회원가입 버튼 클릭 시
    e.preventDefault();
  };

  // type에 email, pw1, pw2, agree가 들어와 각각 검사를 진행
  const checkAll = (type) => {
    if (type === "agree") {
      // checkbox onChange
      setAgreed(!agreed);
    }

    // 미림 이메일인지
    let flag = email.includes("@e-mirim.hs.kr");
    setIsMirimEmail(flag);

    // 알파벳, 특수문자, 숫자 포함 8자 이상
    const checkRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^~*+=-])(?=.*[0-9]).{8,}$/;

    // 정규식 테스트
    flag = checkRegex.test(password);
    setPwCheck(flag);

    // 비밀번호 같은지
    if (password !== password2) {
      setEqualPw(false);
    } else {
      setEqualPw(true);
    }
  };

  return (
    <div id="Container" className="RegisterContainer">
      {/* Card Container */}
      <main className="CardContainer">
        {/* Left Contents */}
        <div className="Description">
          <div className="TextContainer">
            {/* 굵은 글씨 */}
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
          {/* 퍼즐 이미지 */}
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

            {/* 이메일 필드 */}
            <label>
              이메일
              <div>
                <input
                  className="RegisterInput"
                  type="email"
                  placeholder="미림 계정으로만 가입 가능합니다."
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => checkAll("email")}
                />
                <div
                  className={
                    "WarningContainer" + (isMirimEmail ? "" : " ShowWarning")
                  }
                >
                  <img src="/images/warning.png" alt="warning" />
                  <span>미림 계정이 아닙니다.</span>
                </div>
              </div>
            </label>

            {/* 비밀번호 필드 */}
            <label>
              비밀번호
              <div>
                <input
                  className="RegisterInput"
                  type="password"
                  placeholder="8자 이상 영문, 숫자, 특수문자 포함"
                  name="password1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => checkAll("pw1")}
                />
                <div
                  className={
                    "WarningContainer" + (pwCheck ? "" : " ShowWarning")
                  }
                >
                  <img src="/images/warning.png" alt="warning" />
                  <span>8자 이상 영문, 숫자, 특수문자를 포함해주세요.</span>
                </div>
              </div>
            </label>

            {/* 비밀번호 확인 필드 */}
            <label>
              비밀번호 확인
              <div>
                <input
                  className="RegisterInput"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  onBlur={() => checkAll("pw2")}
                />
                <div
                  className={
                    "WarningContainer" + (equalPw ? "" : " ShowWarning")
                  }
                >
                  <img src="/images/warning.png" alt="warning" />
                  <span>비밀번호가 맞지 않습니다.</span>
                </div>
              </div>
            </label>

            {/* 개인정보 수집 동의 필드 */}
            <div className="AgreeContainer">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={agreed}
                onChange={() => checkAll("agree")}
              />
              <label htmlFor="agree"></label>
              <button className="AgreeLink">
                [필수] 개인정보 수집 및 이용 동의
              </button>
            </div>

            {/* JOIN 버튼 */}
            <input
              className="RegisterInput RegisterSubmit"
              type="submit"
              value="JOIN"
              disabled={!isAllPassed}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
