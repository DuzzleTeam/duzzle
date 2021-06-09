import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import "./NotificationDropdown.css";

function NotificationDropdown(props) {
  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // 알람 쌓이는 배열(state)
  const [notification, setNotification] = useState([
    {
      provider: "조하닮",
      post: {
        title: "테이블에 문제가 있는 것 같아요!",
        isWezzle: false,
      },
      isChecked: false,
      occurTime: "2021.06.06",
      menuType: "comment",
    },
  ]);

  // 알림 가져오기
  const loadNoti = async () => {
    const notificationList = await axios
      .get(`/api/notification/${user._id}`)
      .then(({ data }) => {
        const notificationList = {
          provider: data.provider,
          post: {
            title: data.content,
            isWezzle: data.isWezzle,
          },
          isChecked: false,
          occurTime: data.occurTime.slice(0, 10).replace(/-/g, "."),
          menuType: data.menuType,
        };
        return notificationList;
      });
    return notificationList;
  };

  // 메뉴 리스트
  const menus = ["댓글", "좋아요", "협업해요"];

  // 현재 활성화 중인 메뉴 (기본적으로 댓글)
  const [activeNotiMenu, setActiveNotiMenu] = useState(0);

  useEffect(() => {
    // async function fetchData() {
    //   notificationList = await loadNoti();
    //   const setnoti = async () => {
    //     await setNotification([...notification, notificationList]);
    //   };
    //   await setnoti();
    // }
    // fetchData();
    async function fetchData() {
      await loadNoti().then((notificationList) =>
        setNotification(notificationList)
      );
    }
    fetchData().then(() => {
      console.log(notification);
    });
  }, [notification]);

  function test() {
    console.log(notification);
  }

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
            // onClick={() => setActiveNotiMenu(i)}
            onClick={() => test()}
          >
            {menu}
          </li>
        ))}
      </ul>
      {/* 하나 하나의 알림들 */}
      <ul className="NotiContentsContainer">
        <Notification notification={notification[0]} />
      </ul>
    </div>
  );
}

export default NotificationDropdown;
