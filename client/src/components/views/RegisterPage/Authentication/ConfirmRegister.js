import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { confirmRegister } from "../../../../_actions/user_action";

import "./ConfirmRegister.css";

function ConfirmRegister() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(confirmRegister(id)).then((res) => {
      if (!res.payload.registerSuccess) {
        alert(res.message);
      }
    });
  });

  return (
    <div id="Container" className="ConfirmContainer">
      <img src="/images/confirm.png" alt="confirm" />
      <h1>더즐의 회원가입이 완료되었습니다.</h1>
      <span>
        더즐의 회원이 되신 것을 축하드립니다!
        <br />
        개발자, 디자이너와의 활동이 가능합니다.
      </span>
      <Link to={"/login"}>로그인 페이지로 이동</Link>
    </div>
  );
}

export default withRouter(ConfirmRegister);
