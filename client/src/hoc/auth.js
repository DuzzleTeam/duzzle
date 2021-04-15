import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

//dayeon-choi(2021-4-12)
export default function _(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          //로그인 하지 않은 상태
          if (option) {
            props.history.push("/login");
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
