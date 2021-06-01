import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";

import "./NotificationDropdown.css";

function NotificationDropdown(props) {
  // 현재 접속 유저 정보
  // const user = useSelector((state) => state.user.authPayload);
  // async function fetchData() {
  //   const noti = await axios.get(`/api/notification/${user._id}`);
  //   console.log(noti);
  // }
  // fetchData();
  const [notification, setNotification] = useState({
    provider: "조하닮",
    post: {
      title: "테이블이 좀 이상하고 뭐시기 뭐시기",
      isWezzle: false,
    },
    isChecked: false,
    occurTime: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    menuType: "comment",
  });

  // 메뉴 리스트
  const menus = ["댓글", "좋아요", "협업해요"];

  // 현재 활성화 중인 메뉴 (기본적으로 댓글)
  const [activeNotiMenu, setActiveNotiMenu] = useState(0);
  useEffect(() => {}, [notification]);
  return (
    // 알림창 전체 컨테이너
    <div
      className={
        props.openingNoti
          ? "NotiDropContainer OpeningDropdown"
          : "NotiDropContainer"
      }
    >
      {/* Title */}
      <h3>알림</h3>
      {/* 댓글, 좋아요, 협업해요 */}
      <ul className="NotiMenu">
        {/* 배열에 있는 메뉴들을 가지고 li 생성 */}
        {menus.map((menu, i) => (
          // 현재 Active 메뉴 인덱스와 인덱스가 같다면 ActiveMenu
          <li
            key={i}
            className={activeNotiMenu === i ? "ActiveNotiMenu" : ""}
            onClick={() => setActiveNotiMenu(i)}
          >
            {menu}
          </li>
        ))}
      </ul>
      {/* 하나 하나의 알림들 */}
      <ul className="NotiContentsContainer">
        <Notification notification={notification} />
        <Notification notification={notification} />
      </ul>
    </div>
  );
}

export default NotificationDropdown;
