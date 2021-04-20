import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./EditLayout.css";

function EditLayout() {
  const [Edit, setEdit] = useState(<EditLayout />);

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

  const onEditHandler = (event) => {
    event.preventDefault();
    setEdit(<EditLayout />);
  };

  return (
    <div>
      <strong>소속</strong>
      <input type="text" value={Group} onChange={onGroupHandler} />
      <p />
      <strong>메일</strong>
      <input type="text" value={Email} onChange={onEmailHandler} />
      <p />
      <strong>오픈채팅</strong>
      <input type="text" value={OpenChating} onChange={onOpenChatingHandler} />
      <p />
    </div>
  );
}

export default withRouter(EditLayout);
