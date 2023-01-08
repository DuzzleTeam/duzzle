import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/views/NavBar/NavBar";
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
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
        <Route path="/certificationEmail" component={Auth(Certification, false)} />
        <Route path="/confirmRegister/:id" component={Auth(ConfirmRegister, false)} />

        <Route exact path={["/mezzle", "/wezzle"]} component={Auth(FeedPage, true)} />

        <Route path={["/mezzle/post/:postId", "/wezzle/post/:postId"]} component={Auth(PostPage, true)} />

        <Route path="/users/:email" component={Auth(MyPage, true)} />

        <Route path="/mezzle/write" component={Auth(PostWritingPage, true)} />
        <Route path="/wezzle/write" component={Auth(PostWritingPage, true)} />
      </Switch>
    </Router>
  );
}

export default App;
