import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { confirmRegister } from "../../../../_actions/user_action";

function ConfirmRegister() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(confirmRegister(id)).then((res) => {
      console.log(res);
    });
  });
  return <div>인증되었습니다.</div>;
}

export default ConfirmRegister;
