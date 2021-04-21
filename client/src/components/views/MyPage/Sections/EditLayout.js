import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "../Sections/MyPage.css";

function EditLayout(props) {
  const [Group, setGroup] = useState("");
  const [Email, setEmail] = useState("");
  const [OpenChating, setOpenChating] = useState("");

  const onGroupHandler = (event) => {
    setGroup(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onOpenChatingHandler = (event) => {
    setOpenChating(event.currentTarget.value);
  };

  return (
    <div>
      {props.isEdit ? (
        <div>
          <strong>소속</strong>
          <input type="text" value={Group} onChange={onGroupHandler} />
          <p />
          <strong>메일</strong>
          <input type="text" value={Email} onChange={onEmailHandler} />
          <p />
          <strong>오픈채팅</strong>
          <input
            type="text"
            value={OpenChating}
            onChange={onOpenChatingHandler}
          />
          <p />
        </div>
      ) : (
        <div>
          <strong>소속</strong> <div className="font">DST </div>
          <p />
          <strong>메일</strong>
          <div className="font">2019d12@e-mirim.hs.kr </div>
          <p />
          <strong>오픈채팅</strong> <div className="font">asdfeljsfd.com </div>
          <p />
        </div>
      )}
    </div>
  );
}

export default withRouter(EditLayout);
