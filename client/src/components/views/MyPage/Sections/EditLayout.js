import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Profile from "./Profile";
import EditProfile from "./EditProfile";

// CSS
// import "./EditLayout.css";

function EditLayout({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    // 수정 중이라면
    <EditProfile user={user} setUser={setUser} setIsEditing={setIsEditing} />
  ) : (
    // 수정 중이 아니라면
    <Profile user={user} setIsEditing={setIsEditing} />
  );
}

export default withRouter(EditLayout);
