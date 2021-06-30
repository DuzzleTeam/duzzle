import React from "react";
import { Popover, OverlayTrigger, Image } from "react-bootstrap";

import "./LevelBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
  // popover 메시지
  const popover = (
    <Popover className="popover">
      <Popover.Content>
        <div className="popover-container">
          <strong>Level을 올리려면?</strong>
          <span>글 작성 시 20% 상승</span>
          <span>댓글 작성 시 5% 상승</span>
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <span className="ProfileLevel">
        {`Lv.${Math.floor(level)} ${levels[Math.floor(level) - 1]}`}
        <OverlayTrigger
          trigger={["hover", "hover"]}
          placement="top"
          overlay={popover}
        >
          <Image
            className="QuestionPopover"
            src="/images/tooltip.png"
            alt="question"
          />
        </OverlayTrigger>
      </span>
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
