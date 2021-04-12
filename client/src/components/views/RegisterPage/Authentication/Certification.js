import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { registerUser } from "../../../../_actions/user_action";

function Certification() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const { body } = location.state;
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.registerSuccess) {
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
  });
  return <div>인증 메일이 발송되었습니다.</div>;
}

export default Certification;
