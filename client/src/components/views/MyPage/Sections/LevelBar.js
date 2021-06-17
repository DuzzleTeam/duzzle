import React from "react";

import "./LevelBar.css";

// level comment
const levels = [
  "수성",
  "금성",
  "지구",
  "화성",
  "목성",
  "토성",
  "천왕성",
  "해왕성",
];

function LevelBar({ level }) {
  return (
    <>
      <span className="ProfileLevel">{`Lv.${Math.floor(level)} ${
        levels[Math.floor(level) - 1]
      }`}</span>
      <div className="ProfileLevelBar">
        <div
          className="ProfileFillLevelBar"
          style={{ width: `${(level % 1) * 100}%` }}
        ></div>
      </div>
    </>
  );
}

export default LevelBar;
