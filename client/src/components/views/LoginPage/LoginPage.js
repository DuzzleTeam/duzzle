import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../utils/Common.css";
import "./Sections/LoginPage.css";

function LoginPage() {
	//email과 password를 확인하기 위함
	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});
	//login submit 버튼의 활성화 및 비활성화 상태
	const [isActive, setIsActive] = useState(false);
	//input에서 추출
	const { email, password } = inputs;

	//input에서 입력이 이루어질 때 setInputs
	const onChange = e => {
		const { value, name } = e.target;
		setInputs({
			//이전 것은 복제하고 name과 value 해당되는 값만 변경
			...inputs,
			[name]: value
		});
	};

	//inputs(email, password) state가 변경될 때마다 작동
	useEffect(() => {
		if (
			//email에 @e-mirim.hs.kr이 있고, password가 8자 이상일 때
			String(email).includes("@e-mirim.hs.kr") &&
			String(password).length >= 8
		) {
			//isActive가 true -> 버튼 활성화
			setIsActive(true);
		} else {
			//input에서 입력 값 삭제 시 다시 비활성화가 되어야하기 때문에 필요
			//isActive가 false -> 버튼 비활성화
			setIsActive(false);
		}
	}, [inputs]);

	//Login 버튼 클릭 시 작동
	const onSubmitHandler = event => {
		event.preventDefault();
		/*
		let body = {
			email: email,
			password: password
		};

		Axios.post('/api/user/login',body).then(resposen)
		*/
	};

	return (
		<div id="Container">
			{/* Login Page Contents */}
			<main id="LoginPage">
				{/* 로그인 텍스트 부분 */}
				<article>
					<h2 className="LoginText">로그인</h2>
				</article>

				{/* input (이메일, 비밀번호, 제출버튼) */}
				<article className="LoginContainer">
					{/* Login from */}
					<form onSubmit={onSubmitHandler}>
						{/* email */}
						<div>
							<input
								className="InputEmail"
								type="email"
								placeholder="e-mail"
								name="email"
								value={email}
								onChange={onChange}
							/>
						</div>

						{/* password */}
						<div>
							<input
								className="InputPassword"
								type="password"
								placeholder="PASSWORD"
								name="password"
								value={password}
								onChange={onChange}
							/>
						</div>

						{/* submit */}
						<div>
							{/* isActive가 false일 때 버튼 비활성화(disabled=true), true일 때 활성화(disabled=false)*/}
							<button
								className="InputSubmit"
								type="submit"
								disabled={isActive ? false : true}
							>
								LOGIN
							</button>
						</div>
					</form>
				</article>

				{/* 회원가입, 비밀번호 찾기 */}
				<article className="HelpContainer">
					<div className="Join">
						<Link to="/register">회원가입</Link>
					</div>
					<div className="DividingLine">|</div>
					<div className="FindPassword">
						<Link to="/account/password_reset">비밀번호 찾기</Link>
					</div>
				</article>
			</main>
		</div>
	);
}

export default LoginPage;
