import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import "./NotificationDropdown.css";

function NotificationDropdown(props) {
  // 알림 없음 확인
  let chk = [false, false, false];

  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // 알람 쌓이는 배열(state)
  const [notification, setNotification] = useState();

  // 알림 가져오기
  const loadNoti = useCallback(async () => {
    const res = await axios.get(`/api/notification/${user._id}`);
    if (res.status === 200) {
      setNotification(res.data);
    }
  }, [user]);

  // 메뉴 리스트
  const menus = ["댓글", "좋아요", "협업해요"];

  // 현재 활성화 중인 메뉴 (기본적으로 댓글)
  const [activeNotiMenu, setActiveNotiMenu] = useState(0);

  // 알림 없는 메뉴 확인
  const notiCh = () => {
    for (let i = 0; i < notification.length; i++) {
      if (notification[i].menuType === "comment") {
        chk[0] = true;
      } else if (notification[i].menuType === "like") {
        chk[1] = true;
      } else if (notification[i].menuType === "wezzle") {
        chk[2] = true;
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      await loadNoti();
    }
    fetchData();
  }, [loadNoti]);

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
        {/* 알림이 없는 메뉴 확인 */}
        {/* notification이 있으면 Notification 렌더링 */}
        {notification && notification[0] ? (
          notification.map((noti, i) => {
            notiCh();
            if (activeNotiMenu === 0) {
              if (noti.menuType === "comment") {
                return <Notification key={i} notification={notification[i]} />;
              } else if (chk[0] === false) {
                chk[0] = true;
                return (
                  <font style={{ color: "gray" }}>댓글 알림이 없습니다</font>
                );
              }
            } else if (activeNotiMenu === 1) {
              if (noti.menuType === "like") {
                return <Notification key={i} notification={notification[i]} />;
              } else if (chk[1] === false) {
                chk[1] = true;
                return (
                  <font style={{ color: "gray" }}>좋아요 알림이 없습니다</font>
                );
              }
            } else {
              if (noti.menuType === "wezzle") {
                return <Notification key={i} notification={notification[i]} />;
              } else if (chk[2] === false) {
                chk[2] = true;
                return (
                  <font style={{ color: "gray" }}>협업 알림이 없습니다</font>
                );
              }
            }
          })
        ) : (
          <font style={{ color: "gray" }}>알림이 없습니다</font>
        )}
      </ul>
    </div>
  );
}

export default NotificationDropdown;
