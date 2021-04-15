import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function _(SpecificComponent, option, adminRoute = null) {
	function AuthenticationCheck(props) {
		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(auth()).then(response => {
				console.log("response", response);

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
		}, []);
		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
