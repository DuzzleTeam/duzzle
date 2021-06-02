import React from "react";

// CSS
import "./PostsNav.css";

// menus
// - mypage: ["지원 목록", "내 게시물"]
// - mainfeed: ["개발", "디자인"]
function PostsNav({ menus, currentMenu, onChangeCurrentMenu }) {
  return (
    <nav className={"PostsNav"}>
      {/* 지원목록, 내 게시물 */}
      {menus.map((menu, index) => (
        <button
          key={index}
          // 현재 메뉴가 index와 같다면 (현재 선택된 메뉴라면)
          // class명에 Active 추가
          className={
            currentMenu === index
              ? "ButtonPostsNav ActiveButtonPostsNav"
              : "ButtonPostsNav UnactiveButtonPostsNav"
          }
          // 현재 메뉴라면 클릭되지 않도록
          disabled={currentMenu === index}
          // 버튼 클릭 시 현재 메뉴 변경 (0 or 1)
          onClick={() => onChangeCurrentMenu(index)}
        >
          <span>{menu}</span>
        </button>
      ))}
    </nav>
  );
}

export default PostsNav;
