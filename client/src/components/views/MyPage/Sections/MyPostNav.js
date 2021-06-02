import React from "react";

// CSS
import "./MyPostNav.css";

const MENUS = ["지원 목록", "내 게시물"];

function MyPostNav({ currentMenu, setCurrentMenu }) {
  return (
    <div className={"MyPostNav"}>
      {/* 지원목록, 내 게시물 */}
      {MENUS.map((menu, index) => (
        <button
          key={index}
          // 현재 메뉴가 index와 같다면 (현재 선택된 메뉴라면)
          // class명에 Active 추가
          className={
            currentMenu === index
              ? "ButtonMyPost ActiveButtonMyPost"
              : "ButtonMyPost UnactiveButtonMyPost"
          }
          // 현재 메뉴라면 클릭되지 않도록
          disabled={currentMenu === index}
          // 버튼 클릭 시 현재 메뉴 변경 (0 or 1)
          onClick={() => setCurrentMenu(index)}
        >
          <span>{menu}</span>
        </button>
      ))}
    </div>
  );
}

export default MyPostNav;
