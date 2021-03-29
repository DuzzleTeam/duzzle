import React from "react";

import "../../../utils/Common.css";
import "./Sections/LandingPage.css";

function LandingPage() {
  return (
    <div id="Container">
      <main>
        <article>
          <h1 className="MainText">
            <span className="text1">더 즐겁게,</span>
            <span className="text2">DEVELOP 하라</span>
          </h1>
        </article>

        <article className="SNSContainer">
          <div className="Instagram">
            <span className="InstaText">instagram</span>
            <img src="/images/arrow.png" alt="instagram" />
          </div>
          <div className="Facebook">
            <span className="FacebookText">facebook</span>
            <img src="/images/arrow.png" alt="facebook" />
          </div>
        </article>
      </main>
    </div>
  );
}

export default LandingPage;
