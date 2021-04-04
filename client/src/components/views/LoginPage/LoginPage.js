import React, { useEffect, useState } from "react";

import "../../../utils/Common.css";
import "./Sections/LoginPage.css";

function LoginPage() {
	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});
	const [isActive, setIsActive] = useState(false);

	const { email, password } = inputs;

	const onChange = e => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value
		});
	};

	useEffect(() => {
		if (
			String(email).includes("@e-mirim.hs.kr") &&
			String(password).length >= 8
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [inputs]);

	// const onChange = e => {
	// 	const { value, name } = e.target;
	// 	console.log(
	// 		isActive,
	// 		String([email]).includes("@e-mirim.hs.kr"),
	// 		String([password]).length
	// 	);
	// 	if (
	// 		String([email]).includes("@e-mirim.hs.kr") &&
	// 		String([password]).length >= 8
	// 	) {
	// 		setInputs({
	// 			...inputs,
	// 			[name]: value,
	// 			isActive: true
	// 		});
	// 	} else {
	// 		setInputs({
	// 			...inputs,
	// 			[name]: value,
	// 			isActive: false
	// 		});
	// 	}
	// };

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
					<form>
						{/* @e-mirim.hs.kr인 이메일 */}
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

						{/* 8자리 이상인 비밀번호 */}
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

						{/* 제출 */}
						<div>
							<button
								className="InputSubmit"
								type="submit"
								disabled={Boolean(isActive) ? false : true}
							>
								LOGIN
							</button>
						</div>
					</form>
				</article>
			</main>
		</div>
	);
}

export default LoginPage;
