import React from "react";

import "../../../utils/Common.css";
import "./Sections/LoginPage.css";

function LoginPage() {
	return (
		<div id="Container">
			{/* Login Page Contents */}
			<main id="LoginPage">
				{/* 로그인 텍스트 부분 */}
				<article>
					<h2 className="LoginText">로그인</h2>
				</article>

				{/* input (이메일, 비밀번호, 제출버튼) */}
				<article className="InputContainer">
					{/* @e-mirim.hs.kr인 이메일 */}
					<div>
						<input
							className="InputEmail"
							type="email"
							placeholder="   e-mail"
							pattern=".+@e-mirim.hs.kr"
						/>
					</div>

					{/* 8자리 이상인 비밀번호 */}
					<div>
						<input
							className="InputPassword"
							type="password"
							placeholder="   PASSWORD"
							pattern=".{8,}"
						/>
					</div>

					{/* 제출 */}
					<div>
						<input className="InputSubmit" type="submit" value="LOGIN" />
					</div>
				</article>
			</main>
		</div>
	);
}

export default LoginPage;
