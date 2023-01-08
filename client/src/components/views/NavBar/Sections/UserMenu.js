import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationDropdown from "./NotificationDropdown";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import styles from "./user-menu.module.css";

const UserMenu = () => {
  const user = useSelector((state) => state.user.authPayload);

  const [isOpeningDropdown, setIsOpeningDropdown] = useState(false);
  const [isOpeningNoti, setIsOpeningNoti] = useState(false);

  const profileContainer = useRef();
  const noticiationContaier = useRef();

  useOutsideClick(profileContainer, () => {
    setIsOpeningDropdown(false);
  });
  useOutsideClick(noticiationContaier, () => {
    setIsOpeningNoti(false);
  });

  const onToggleProfileDropdown = (e) => {
    setIsOpeningDropdown(!isOpeningDropdown);
  };
  const onToggleNotiDropdown = (e) => {
    setIsOpeningNoti(!isOpeningNoti);
  };

  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    axios.get(`/api/logout`).then((res) => {
      if (!res.data.isAuth) {
        history.push("/login");
      } else {
        alert("로그아웃을 하는데 실패했습니다.");
      }
    });
  };

  return (
    <div className={styles.userMenu}>
      <div className={styles.notification} ref={noticiationContaier}>
        <button onClick={onToggleNotiDropdown}>
          <img src="/images/notification.png" alt="notification" />
        </button>

        <NotificationDropdown openingNoti={isOpeningNoti} />
      </div>

      <div className={styles.profile} ref={profileContainer}>
        <button onClick={onToggleProfileDropdown}>
          <img src={user ? user.profileImage : "/images/default/profile/1.png"} alt="profileImage" />
        </button>
        <ul
          className={isOpeningDropdown && styles.opening}
          onClick={() => {
            setIsOpeningDropdown(false);
          }}
        >
          <li>
            <Link to={`/users/${user.email}`}>마이페이지</Link>
          </li>
          <div className={styles.divider}></div>
          <li>
            <button onClick={handleLogout}>로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
