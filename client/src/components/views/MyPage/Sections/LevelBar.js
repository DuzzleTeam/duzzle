import React from "react";

import "./LevelBar.css";

function LevelBar({ percentage }) {
  return (
    <div className="ProfileLevelBar">
      <div
        className="ProfileFillLevelBar"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default LevelBar;
