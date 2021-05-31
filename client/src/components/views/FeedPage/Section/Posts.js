import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import Pagination from "./Pagination";
import Post from "./Post";

// CSS
import "./Posts.css";

function Posts() {
  // 전체 포스트들
  const [posts, setPosts] = useState([]);

  // wezzle 혹은 mezzle
  const postType = document.location.pathname.match(/wezzle|mezzle/)[0];

  // 전체 게시글 가져오기
  const getPosts = useCallback(async () => {
    // 요청 url
    const url = `/api/${postType}`;

    // get 방식으로 요청
    const res = await axios.get(url);

    if (res.status === 200) {
      // 가져오기에 성공했을 경우 전체 게시글 셋팅
      setPosts(res.data.posts);
    }
  }, [postType]);

  useEffect(() => {
    const fetchData = async () => {
      // 전체 게시글 가져오기
      await getPosts();
    };
    fetchData();
  }, [getPosts]);

  // 현재 메뉴가 개발(0)인지 디자인(1)인지
  const [currentField, setCurrentField] = useState(0);
  // 메뉴 배열 (개발, 디자인)
  const fields = ["개발", "디자인"];

  const onButtonFieldClick = (field) => {
    // 현재 선택된 메뉴를 또 선택한다면 아무 이벤트 없이 리턴
    if (field === fields[currentField]) {
      return;
    }

    if (field === "개발") {
      // 개발로 설정
      setCurrentField(0);
    } else {
      // 디자인으로 설정
      setCurrentField(1);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const getCurrentPosts = () => {
    const endIndex = currentPage * postsPerPage;
    const startIndex = endIndex - postsPerPage;
    const currentPosts = posts.slice(startIndex, endIndex);
    return currentPosts;
  };

  return (
    // 글 전체 목록 컨테이너
    <section className={"FeedPostsContainer"}>
      {/* 상단 버튼들 (개발/디자인, 글 작성) */}
      <div className="FeedButtons">
        {/* 개발, 디자인 버튼 */}
        <div className="PostsCategory">
          {fields.map((field, index) => (
            <button
              key={index}
              className={index === currentField ? "ActivePostsCategory" : ""}
              onClick={() => onButtonFieldClick(field)}
            >
              {field}
            </button>
          ))}
        </div>

        {/* 글 작성 버튼 */}
        <button className="ButtonWritePost">
          <img src="/images/feedPage/post_write.png" alt="write" />
          {"글 작성"}
        </button>
      </div>

      {/* 포스트 컴포넌트들 (실제 피드) */}
      <div className="PostsPostContainer">
        {getCurrentPosts().map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>

      {/* 숫자 목록 */}
      {/* 전체 페이지 번호 수, 현재 페이지 번호, 현재 페이지 번호 Setter */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}

export default Posts;
