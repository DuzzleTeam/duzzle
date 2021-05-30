import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import Pagination from "./Pagination";
import Post from "./Post";

// CSS
import "./Posts.css";

function Posts() {
  // 전체 포스트들
  const [posts, setPosts] = useState([]);

  // 전체 게시글 가져오기
  const getPosts = useCallback(async () => {
    // wezzle 혹은 mezzle
    const postType = document.location.pathname.match(/wezzle|mezzle/);
    // 요청 url
    const url = `/api/${postType}`;

    // get 방식으로 요청
    const res = await axios.get(url);

    if (res.status === 200) {
      // 가져오기에 성공했을 경우 전체 게시글 셋팅
      setPosts(res.data.posts);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // 전체 게시글 가져오기
      await getPosts();
    };
    fetchData();
  }, [getPosts]);

  return (
    // 글 전체 목록 컨테이너
    <section className={"FeedPostsContainer"}>
      {/* 상단 버튼들 (개발/디자인, 글 작성) */}
      <div className="FeedButtons">
        {/* 개발, 디자인 버튼 */}
        <div className="PostsCategory">
          <button>개발</button>
          <button>디자인</button>
        </div>

        {/* 글 작성 버튼 */}
        <button className="ButtonWritePost">
          <img src="/images/feedPage/post_write.png" alt="write" />
          {"글 작성"}
        </button>
      </div>

      {/* 포스트 컴포넌트들 (실제 피드) */}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}

      {/* 숫자 목록 */}
      {/* 전체 페이지 번호 수, 현재 페이지 번호, 현재 페이지 번호 Setter */}
      <Pagination totalIndex={10} currentPage={2} setCurrentPage={() => {}} />
    </section>
  );
}

export default Posts;
