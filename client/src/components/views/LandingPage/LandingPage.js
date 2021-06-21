import React from "react";
import { withRouter } from "react-router";

import Duzzle from "./Sections/Duzzle";
import Wezzle from "./Sections/Wezzle";
import Mezzle from "./Sections/Mezzle";
import Footer from "../Footer/Footer";

import "../../../utils/Common.css";
import "./Sections/LandingPage.css";

// hooks
import useScroll from "../../../hooks/useScroll";

// 처음 웹페이지 접속시 보이는 화면
// (chohadam, 2021-03-30)
function LandingPage() {
  const { y } = useScroll();

  return (
    <main className={"LandingPageContainer"}>
      {/* Duzzle Contents */}
      <Duzzle />

      {/* Wezzle */}
      <Wezzle />

      {/* Mezzle */}
      <Mezzle />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default withRouter(LandingPage);
