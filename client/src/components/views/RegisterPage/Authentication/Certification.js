import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, withRouter } from "react-router";
import { registerUser } from "../../../../_actions/user_action";

import "./Certification.css";

function Certification() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { body } = location.state;
  useEffect(() => {
    dispatch(registerUser(body));
  });

  const handleResendEmail = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div id="Container" className="CertificationContainer">
      <main id="CertificationMain">
        <img src="/images/email.png" alt="email" />
        <div className="EmailSendDesc">
          <h1>인증 메일이 발송되었습니다.</h1>
          <span>
            입력하신 이메일<span className="TextEmail">({body.email})</span>{" "}
            인증 메일을 확인해주세요.
            <br />
            이메일의 인증 버튼을 선택하면 회원가입이 완료됩니다.
          </span>
        </div>
        <div className="CertificationWarnings">
          <h3>유의사항</h3>
          <span>
            인증 메일이 오지 않았을 경우,
            <br />
            하단의 인증 메일 재발송 버튼을 눌러주세요.
          </span>
          <button onClick={handleResendEmail}>인증 메일 재발송</button>
        </div>
      </main>
    </div>
  );
}

export default withRouter(Certification);
