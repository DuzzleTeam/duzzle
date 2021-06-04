import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../_actions/user_action";

import EditLayout from "./Sections/EditLayout.js";
import PostsNav from "../../Feed/PostsNav";
import MyPosts from "./Sections/MyPosts.js";

import "./Sections/MyPage.css";

function MyPage() {
  // 04.18 / 상단 배너 이미지 랜덤으로 띄우기
  const getRandomNumber = (end) => {
    const num = Math.floor(Math.random() * end) + 1;
    return num;
  };

  // 현재 페이지의 user
  const [user, setUser] = useState(null);

  // 현 페이지의 유저 email
  const email = document.location.pathname.replace("/users/", "");

  const dispatch = useDispatch();
  const setMypageUser = useCallback(async () => {
    // 현재 보고있는 마이페이지의 유저 정보 가져오기
    const res = await dispatch(getUser(email));
    if (res.payload.status === 200) {
      // 가져오기에 성공했다면 유저 셋팅
      setUser(res.payload.data.user);
    }
  }, [dispatch, email]);

  useEffect(() => {
    // 현재 페이지의 user 정보를 받아온다
    const fetchData = async () => {
      await setMypageUser();
    };
    fetchData();
  }, [setMypageUser]);

  // 지원 목록인지 내 게시물인지 현재 메뉴
  const [currentMenu, setCurrentMenu] = useState(null);

  // Redux에서 접속 User 정보 가져오기
  const connectUser = useSelector((state) => state.user.authPayload);

  // 현재 접속 유저가 마이페이지 유저인지
  const [isAuth, setIsAuth] = useState(false);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (connectUser && user) {
      // 접속 유저 정보가 있을 때 실행
      // 접속 유저와 마이페이지 유저가 같다면
      setIsAuth(connectUser.email === user.email);
      if (connectUser.email === user.email) {
        setCurrentMenu(0);
      } else {
        setCurrentMenu(1);
      }
      setLoaded(true);
    }
  }, [connectUser, user]);

  const onChangeCurrentMenu = (index) => {
    setCurrentMenu(index);
  };

  return (
    loaded && (
      <main className="MypageContainer">
        {/* 상단배너 */}
        <section className={"MypageBanner"}>
          <img src={`/images/myPage/${getRandomNumber(3)}.jpg`} alt="" />
        </section>

        <section className="MypageContents">
          {/* 왼쪽 프로필 */}
          <EditLayout user={user} setUser={setUser} />

          {/* 내 게시물 */}
          <article className={"MypageRightPosts"}>
            {/* 지원목록, 내 게시물 */}
            {/* 현재 접속 유저가 마이페이지의 유저일 때만 보이기 */}
            {isAuth && (
              <PostsNav
                menus={["지원 목록", "내 게시물"]}
                currentMenu={currentMenu}
                onChangeCurrentMenu={onChangeCurrentMenu}
              />
            )}
            {/* 게시물 */}
            <MyPosts isAuth={isAuth} currentMenu={currentMenu} email={email} />
          </article>
        </section>
      </main>
    )
  );
}

export default withRouter(MyPage);
