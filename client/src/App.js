import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/views/Navbar/Navbar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Certification from "./components/views/RegisterPage/Authentication/Certification";
import ConfirmRegister from "./components/views/RegisterPage/Authentication/ConfirmRegister";
import PostPage from "./components/views/PostPage/PostPage";
import MyPage from "./components/views/MyPage/MyPage";
import PostWritingPage from "./components/views/PostWritingPage/PostWritingPage";
import FeedPage from "./components/views/FeedPage/FeedPage";
import Auth from "./hoc/auth";
import "./utils/global.css";

function App() {
  return (
    <Router>
      <Navbar />

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

        {/* 로그인 한 유저만 출입 가능 (메인 피드) */}
        <Route
          exact
          path={["/mezzle", "/wezzle"]}
          component={Auth(FeedPage, true)}
        />

        {/* 로그인 한 유저만 출입 가능 */}
        <Route
          path={["/mezzle/post/:postId", "/wezzle/post/:postId"]}
          component={Auth(PostPage, true)}
        />

        {/* 로그인한 유저만 출입 가능한 페이지 */}
        <Route path="/users/:email" component={Auth(MyPage, true)} />

        {/* 로그인한 유저만 출입이 가능한 페이지 */}
        <Route path="/mezzle/write" component={Auth(PostWritingPage, true)} />
        <Route path="/wezzle/write" component={Auth(PostWritingPage, true)} />
      </Switch>
    </Router>
  );
}

export default App;
