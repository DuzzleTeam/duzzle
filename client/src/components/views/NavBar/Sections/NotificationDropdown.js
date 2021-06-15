import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import "./NotificationDropdown.css";

function NotificationDropdown(props) {
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
        {/* notification이 있으면 Notification 렌더링 */}
        {notification ? (
          notification.map((noti, i) => {
            if (activeNotiMenu === 0) {
              if (noti.menuType === "comment") {
                return <Notification notification={notification[i]} key={i} />;
              }
            } else if (activeNotiMenu === 1) {
              if (noti.menuType === "like") {
                return <Notification notification={notification[i]} key={i} />;
              }
            } else {
              if (noti.menuType === "wezzle") {
                return <Notification notification={notification[i]} key={i} />;
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
