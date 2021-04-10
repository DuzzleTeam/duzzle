import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useHistory } from "react-router-dom";

import Popup from "./Sections/Popup";

import "../../../utils/Common.css";
import "./Sections/RegisterPage.css";

// 회원가입 페이지 (chohadam, 2021-04-05)
function RegisterPage(props) {
  // 이메일
  const [email, setEmail] = useState("");
  // 비밀번호
  const [password, setPassword] = useState("");
  // 비밀번호 확인
  const [password2, setPassword2] = useState("");

  // 미림 이메일인지
  const [isMirimEmail, setIsMirimEmail] = useState(true);
  // 비밀번호 요구 조건 충족하는지
  const [isCheckingPw, setIsCheckingPw] = useState(true);
  // 비밀번호와 확인이 일치한지
  const [isEqualPw, setIsEqualPw] = useState(true);
  // 개인정보 수집에 동의했는지
  const [agreed, setAgreed] = useState(false);

  // 모든 유효성 검사를 통과했는지
  const [isAllPassed, setIsAllPassed] = useState(false);
  // 각각의 유효성 검사 결과가 바뀔 때마다 실행됨
  useEffect(() => {
    // 모두 통과했는지 (all true -> true)
    setIsAllPassed(isMirimEmail && isCheckingPw && isEqualPw && agreed);
  }, [isMirimEmail, isCheckingPw, isEqualPw, agreed]);

  // email, password1, password2, agree 검사 함수들
  const checkAgree = () => {
    // checkbox onChange
    setAgreed(!agreed);
    checkEmail();
    checkPwRequirement(password);
    checkEqualPw(password, password2);
  };
  const checkEmail = () => {
    // 미림 이메일인지
    setIsMirimEmail(email.includes("@e-mirim.hs.kr"));
  };
  const checkPwRequirement = (pw) => {
    // 알파벳, 특수문자, 숫자 포함 8자 이상
    const checkRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^~*+=-])(?=.*[0-9]).{8,}$/;

    // 정규식 테스트
    setIsCheckingPw(checkRegex.test(pw));

    checkEqualPw(pw, password2);
  };
  const checkEqualPw = (password1, pw) => {
    // 비밀번호 같은지
    if (password1 !== pw) {
      setIsEqualPw(false);
    } else {
      setIsEqualPw(true);
    }
  };

  // 개인정보수집동의 팝업창
  const [isPopupShowing, setIsPopupShowing] = useState(false);
  const handlePopup = (e) => {
    e.preventDefault();
    setIsPopupShowing(true);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    // 회원가입 버튼 클릭 시
    e.preventDefault();

    let body = {
      email,
      name: email,
      password,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        history.push(`/users/${email}`);
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
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
                  onBlur={() => checkEmail("email")}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPwRequirement(e.target.value);
                  }}
                />
                <div
                  className={
                    "WarningContainer" + (isCheckingPw ? "" : " ShowWarning")
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
                  onChange={(e) => {
                    setPassword2(e.target.value);
                    checkEqualPw(password, e.target.value);
                  }}
                />
                <div
                  className={
                    "WarningContainer" + (isEqualPw ? "" : " ShowWarning")
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
                onChange={() => checkAgree("agree")}
              />
              <label htmlFor="agree"></label>
              <button className="AgreeLink" onClick={handlePopup}>
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

      <Popup visible={isPopupShowing} setIsPopupShowing={setIsPopupShowing} />
    </div>
  );
}

export default RegisterPage;
