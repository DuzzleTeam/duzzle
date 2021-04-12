import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Certification from "./components/views/RegisterPage/Authentication/Certification";
import ConfirmRegister from "./components/views/RegisterPage/Authentication/ConfirmRegister";

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/register">
          <RegisterPage />
        </Route>

        <Route path="/certificationEmail">
          <Certification />
        </Route>

        <Route path="/confirmRegister/:id">
          <ConfirmRegister />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
