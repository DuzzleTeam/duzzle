import React from "react";

import { text } from "./MainText";

import "./Popup.css";

function Popup(props) {
  const handleExit = () => {
    props.setIsPopupShowing(false);
  };
  return (
    <div id="PopupContainer" className={props.visible ? "" : "Deactive"}>
      <main className="PopupCard">
        <div className="TopContents">
          <h3>[필수] 개인정보 수집 및 이용 동의</h3>
          <button className="ExitButton" onClick={handleExit}>
            <img src="/images/exit.png" alt="exit" />
          </button>
        </div>

        <span>
          더즐은 아래의 목적으로 개인정보를 수집 및 이용하며, 회원의 개인정보를
          안전하게 취급하는데 <br />
          최선을 다합니다. 동의 거부 시에는 서비스 이용이 제한될 수 있습니다.
        </span>

        <div className="AgreeTextContainer">
          <span className="AgreeText">{text}</span>
        </div>
      </main>
    </div>
  );
}

export default Popup;
