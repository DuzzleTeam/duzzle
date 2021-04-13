import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Certification from "./components/views/RegisterPage/Authentication/Certification";
import ConfirmRegister from "./components/views/RegisterPage/Authentication/ConfirmRegister";
import Auth from "./hoc/auth";

function App() {
	return (
		<Router>
			<NavBar />

			<Switch>
				<Route exact path="/">
					{/* 아무나 출입이 가능한 페이지 */}
					{Auth(<LandingPage />, null)}
				</Route>

				<Route path="/login">
					{/* 로그인한 유저는 출입이 불가능한 페이지 */}
					{Auth(<LoginPage />, false)}
				</Route>

				<Route path="/register">
					{/* 로그인한 유저는 출입이 불가능한 페이지 */}
					{Auth(<RegisterPage />, false)}
				</Route>

				<Route path="/certificationEmail">
					{/* 로그인한 유저는 출입이 불가능한 페이지 */}
					{Auth(<Certification />, false)}
				</Route>

				<Route path="/confirmRegister/:id">
					{/* 로그인한 유저는 출입이 불가능한 페이지 */}
					{Auth(<ConfirmRegister />, false)}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
