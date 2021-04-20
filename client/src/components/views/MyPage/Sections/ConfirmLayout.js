import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import EditLayout from "./EditLayout";

function ConfirmLayout() {
  const [Edit, setEdit] = useState(<ConfirmLayout />);

  const onEditHandler = (event) => {
    event.preventDefault();
    setEdit(<EditLayout />);
  };

  return (
    <div>
      <strong>소속</strong> <div className="font">DST </div>
      <p />
      <strong>메일</strong> <div className="font">2019d12@e-mirim.hs.kr </div>
      <p />
      <strong>오픈채팅</strong> <div className="font">asdfeljsfd.com </div>
      <p />
    </div>
  );
}

export default withRouter(ConfirmLayout);
