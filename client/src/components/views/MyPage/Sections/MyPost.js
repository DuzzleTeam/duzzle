import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

// CSS
import "./MyPost.css";

function MyPost({ currentMenu, email }) {
  // 보고있는 마이페이지 유저의 포스트 정보
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // 유저의 포스트 정보 가져오기 요청
      const res = await axios.get(`/api/posts/${email}`);

      // 가져오기에 성공했다면
      if (res.status === 200) {
        // posts 셋팅
        setPosts(res.data.posts);
      }
    };
    fetchData();
  }, [email]);

  return <div></div>;
}

export default withRouter(MyPost);
