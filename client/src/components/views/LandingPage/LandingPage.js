import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
// hooks
import useScroll from "../../../hooks/useScroll";

import Duzzle from "./Sections/Duzzle";
import Wezzle from "./Sections/Wezzle";
import Mezzle from "./Sections/Mezzle";
import Footer from "../Footer/Footer";

import "../../../utils/Common.css";
import "./Sections/LandingPage.css";

// preload value
const OFFSET_PRE = 500;

// 처음 웹페이지 접속시 보이는 화면
// (chohadam, 2021-03-30)
function LandingPage() {
  // scroll
  const { y } = useScroll();

  const [wezzleStartAnimation, setWezzleStartAnimation] = useState(false);
  const [mezzleStartAnimation, setMezzleStartAnimation] = useState(false);
  useEffect(() => {
    // screen height
    const { innerHeight } = window;

    if (innerHeight - OFFSET_PRE <= y && y < innerHeight * 2) {
      // wezzle
      setWezzleStartAnimation(true);
    } else {
      setWezzleStartAnimation(false);
    }
    if (innerHeight * 2 - OFFSET_PRE <= y) {
      // mezzle & footer
      setMezzleStartAnimation(true);
    } else {
      setMezzleStartAnimation(false);
    }
  }, [y]);

  return (
    <main className={"LandingPageContainer"}>
      {/* Duzzle Contents */}
      <Duzzle />

      {/* Wezzle */}
      <Wezzle startAnimation={wezzleStartAnimation} />

      {/* Mezzle */}
      <Mezzle startAnimation={mezzleStartAnimation} />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default withRouter(LandingPage);
