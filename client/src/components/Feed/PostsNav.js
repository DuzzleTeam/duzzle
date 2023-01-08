import React from "react";

import "./PostsNav.css";

// menus
// - mypage: ["지원 목록", "내 게시물"]
// - mainfeed: ["개발", "디자인"]
function PostsNav({ menus, currentMenu, onChangeCurrentMenu }) {
  return (
    <nav className={"PostsNav"}>
      {menus.map((menu, index) => (
        <button
          key={index}
          className={"ButtonPostsNav " + (currentMenu === index ? "ActiveButtonPostsNav" : "UnactiveButtonPostsNav")}
          disabled={currentMenu === index}
          onClick={() => onChangeCurrentMenu(index)}
        >
          <span>{menu}</span>
        </button>
      ))}
    </nav>
  );
}

export default PostsNav;
