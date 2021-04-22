import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Certification from "./components/views/RegisterPage/Authentication/Certification";
import ConfirmRegister from "./components/views/RegisterPage/Authentication/ConfirmRegister";
import PostPage from "./components/views/PostPage/PostPage";
<<<<<<< HEAD
import MyPage from "./components/views/MyPage/MyPage";
=======
import PostWritingPage from "./components/views/PostWritingPage/PostWritingPage";
>>>>>>> 2ea4a8512e7ce60673c3e599b4f8a17ab9b9c999

import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        {/* 아무나 출입이 가능한 페이지 */}
        <Route exact path="/" component={Auth(LandingPage, null)} />
        {/* 로그인한 유저는 출입이 불가능한 페이지 */}
        <Route path="/login" component={Auth(LoginPage, false)} />
        {/* 로그인한 유저는 출입이 불가능한 페이지 */}
        <Route path="/register" component={Auth(RegisterPage, false)} />
        {/* 로그인한 유저는 출입이 불가능한 페이지 */}
        <Route
          path="/certificationEmail"
          component={Auth(Certification, false)}
        />
        {/* 로그인한 유저는 출입이 불가능한 페이지 */}
        <Route
          path="/confirmRegister/:id"
          component={Auth(ConfirmRegister, false)}
        />
        <Route path="/mezzle/post/:postId" component={Auth(PostPage, true)} />
<<<<<<< HEAD
        {/* 로그인한 유저만 출입 가능한 페이지 */}
        <Route path="/users/:email" component={Auth(MyPage, true)} />
=======

        {/* 로그인한 유저만 출입이 가능한 페이지 */}
        <Route
          path="/mezzle/write/new"
          component={Auth(PostWritingPage, true)}
        />
        <Route
          path="/wezzle/write/new"
          component={Auth(PostWritingPage, true)}
        />
>>>>>>> 2ea4a8512e7ce60673c3e599b4f8a17ab9b9c999
      </Switch>
    </Router>
  );
}

export default App;
