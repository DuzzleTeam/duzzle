import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import MyPost from "./Sections/MyPost.js";
import Profile from "./Sections/Profile";

import "./Sections/MyPage.css";
import axios from "axios";

function MyPage() {
  // 04.18 / 상단 배너 이미지 랜덤으로 띄우기
  const getRandomNumber = (end) => {
    const num = Math.floor(Math.random() * end) + 1;
    return num;
  };

  // 현재 페이지의 user
  const [user, setUser] = useState(null);

  const getUser = async () => {
    // 현 페이지의 유저 email
    const email = document.location.pathname.replace("/users/", "");
    // get 방식으로 요청
    const res = await axios.get(`/api/users/${email}`);

    if (res.status === 200) {
      // 가져오기에 성공했다면 유저 셋팅
      setUser(res.data.user);
    } else {
      alert("회원 정보를 가져오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    // 현재 페이지의 user 정보를 받아온다
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, []);

  return (
    user && (
      <main className="MypageContainer">
        {/* 상단배너 */}
        <section className={"MypageBanner"}>
          <img src={`/images/myPage/${getRandomNumber(3)}.jpg`} alt="" />
        </section>

        <section className="MypageContents">
          {/* 왼쪽 프로필 */}
          {/* <article className={"MypageLeftProfile"}>
          <EditLayout />
        </article> */}
          <Profile user={user} />

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
