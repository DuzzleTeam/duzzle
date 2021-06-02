import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../../_actions/user_action";

import MyPost from "./Sections/MyPost.js";
import EditLayout from "./Sections/EditLayout.js";

import "./Sections/MyPage.css";

function MyPage() {
  // 04.18 / 상단 배너 이미지 랜덤으로 띄우기
  const getRandomNumber = (end) => {
    const num = Math.floor(Math.random() * end) + 1;
    return num;
  };

  // 현재 페이지의 user
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const setMypageUser = useCallback(async () => {
    // 현 페이지의 유저 email
    const email = document.location.pathname.replace("/users/", "");

    // 현재 보고있는 마이페이지의 유저 정보 가져오기
    const res = await dispatch(getUser(email));
    if (res.payload.status === 200) {
      // 가져오기에 성공했다면 유저 셋팅
      setUser(res.payload.data.user);
    }
  }, [dispatch]);

  useEffect(() => {
    // 현재 페이지의 user 정보를 받아온다
    const fetchData = async () => {
      await setMypageUser();
    };
    fetchData();
  }, [setMypageUser]);

  return (
    user && (
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
            <MyPost isPost={false} />
          </article>
        </section>
      </main>
    )
  );
}

export default withRouter(MyPage);
