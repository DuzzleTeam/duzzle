import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationDropdown from "./NotificationDropdown";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import styles from "./user-menu.module.css";

function UserMenu() {
  // 드롭다운 열려있는지
  const [openingDropdown, setOpeningDropdown] = useState(false);
  // 프로필 사진 눌리면
  const profileDropdownHandler = (e) => {
    // 열림 여부 반전
    setOpeningDropdown(!openingDropdown);
  };

  // 알림창 열려있는지
  const [openingNoti, setOpeningNoti] = useState(false);
  // 알림 아이콘 눌리면
  const notiDropdownHandler = (e) => {
    // 열림 여부 반전
    setOpeningNoti(!openingNoti);
  };

  // ProfileContainer 참조
  const profileContainer = useRef();
  // 메뉴 밖 클릭 시 드롭다운 접기
  useOutsideClick(profileContainer, () => {
    setOpeningDropdown(false);
  });

  // NoticiationContaier 참조
  const noticiationContaier = useRef();
  // 메뉴 밖 클릭 시 알림 드롭다운 접기
  useOutsideClick(noticiationContaier, () => {
    setOpeningNoti(false);
  });

  // user info
  const [user, setUser] = useState({});
  const reduxUser = useSelector((state) => state.user.authPayload);
  useEffect(() => {
    if (reduxUser !== undefined) {
      setUser(reduxUser);
    }
  }, [reduxUser]);
  console.log(reduxUser);

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

  // editUser 정보 가져오기 (수정 시 업데이트 위해서)
  const editUser = useSelector((state) => state.user.editPayload);
  useEffect(() => {
    // editUser가 있으면 수정을 했다는 뜻
    if (editUser) {
      // 수정이 성공했는지
      if (editUser.editSuccess) {
        // 새로운 프로필 이미지로 수정
        setUser((prevUser) => {
          return {
            ...prevUser,
            profileImage: editUser.profileImage,
          };
        });
      }
    }
  }, [editUser]);

  return (
    <div className={styles.userMenu}>
      <div className={styles.notification} ref={noticiationContaier}>
        <button onClick={notiDropdownHandler}>
          <img src="/images/notification.png" alt="notification" />
        </button>

        <NotificationDropdown openingNoti={openingNoti} />
      </div>

      {/* Profile */}
      <div className={styles.profile} ref={profileContainer}>
        {/* Circle Profile Image */}
        <button onClick={profileDropdownHandler}>
          <img src={user.profileImage} alt="profileImage" />
        </button>
        <ul
          className={openingDropdown && styles.opening}
          // 페이지 이동 시 드롭다운 접기
          onClick={() => {
            setOpeningDropdown(false);
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
}

export default UserMenu;
