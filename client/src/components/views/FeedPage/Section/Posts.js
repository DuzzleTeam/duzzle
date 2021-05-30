import React, { useState } from "react";
import Pagination from "./Pagination";
import Post from "./Post";

// CSS
import "./Posts.css";

function Posts() {
  // 전체 포스트들
  const [posts, setPosts] = useState([]);

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
        <Post post={post} />
      ))}

      {/* 숫자 목록 */}
      {/* 전체 페이지 번호 수, 현재 페이지 번호, 현재 페이지 번호 Setter */}
      <Pagination totalIndex={10} currentPage={2} setCurrentPage={() => {}} />
    </section>
  );
}

export default Posts;
