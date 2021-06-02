import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";

import "./NotificationDropdown.css";

function NotificationDropdown(props) {
  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

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

  // const fetchData = async () => {
  //   axios.get(`/api/notification/${user._id}`).then(({ data }) => {
  //     const noti = {
  //       provider: data.provider,
  //       post: {
  //         title: data.content,
  //         isWezzle: data.isWezzle,
  //       },
  //       isChecked: false,
  //       occurTime: data.occurTime.slice(0, 10).replace(/-/g, "."),
  //       menuType: "comment",
  //     };
  //     // notification 배열의 불변성을 유지하며 noti 추가
  //     setNotification([...notification], noti);
  //   });
  // };

  // 알림 가져오기
  // async function fetchData() {
  //   const noti = await axios.get(`/api/notification/${user._id}`);
  //   console.log(noti.data);
  //   setNotification({
  //     provider: noti.data.provider,
  //     post: {
  //       title: noti.data.content,
  //       isWezzle: noti.data.isWezzle,
  //     },
  //     isChecked: false,
  //     occurTime: noti.data.occurTime.slice(0, 10).replace(/-/g, "."),
  //     menuType: "comment",
  //   });
  // }

  // 현재 활성화 중인 메뉴 (기본적으로 댓글)
  const [activeNotiMenu, setActiveNotiMenu] = useState(0);

  useEffect(() => {
    // fetchData();
  }, [notification]);

  // 메뉴 리스트
  const menus = ["댓글", "좋아요", "협업해요"];

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
