import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import pagination from "../../../Pagination/functions";

import Pagination from "../../../Pagination/Pagination";
import Post from "../../../Feed/Post";
import NonePosts from "./NonePosts";

// CSS
import "./Posts.css";

// cache
let wezzle = [];

function Posts() {
  // 전체 포스트들
  const [posts, setPosts] = useState([]);

  // wezzle 혹은 mezzle
  const postType = document.location.pathname.match(/wezzle|mezzle/)[0];

  // 전체 게시글 가져오기
  const getPosts = useCallback(async () => {
    // 페이지 초기화
    setCurrentPage(1);

    // 요청 url
    const url = `/api/${postType}`;

    // get 방식으로 요청
    const res = await axios.get(url);

    if (res.status === 200) {
      if (postType === "wezzle") {
        // 위즐이면 캐싱
        wezzle = res.data.posts;

        // 개발 모집 글만 필터
        const developPosts = wezzle.filter((post) =>
          post.recruit.field.includes("개발")
        );

        // 개발 게시글로 설정
        setCurrentField(0);
        setPosts(developPosts);
      } else {
        // 미즐
        // 가져오기에 성공했을 경우 전체 게시글 셋팅
        setPosts(res.data.posts);
      }
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

    // 개발 혹은 디자인 관련 글로만 필터
    const filteredPosts = wezzle.filter((post) =>
      post.recruit.field.includes(field)
    );
    // state 업데이트
    setPosts(filteredPosts);
  };

  // 현재 페이지 (페이지네이션에서)
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지에 표시할 게시글 갯수
  const postsPerPage = 12;

  // 게시글 모음 컨테이너
  const scrollTargetRef = useRef();
  // location: state, pathname, hash ...
  const location = useLocation();

  useEffect(() => {
    // 자동 스크롤 (첫 게시글 위치로)
    pagination.autoScroll(location, scrollTargetRef);
    // 페이지 전환을 한 적이 있다면
    pagination.saveCurrentPage(location, setCurrentPage);
  }, [location]);

  const history = useHistory();
  // 글쓰기 버튼 클릭
  const onWriteButtonClick = (e) => {
    history.push(`/${postType}/write`);
  };

  return (
    // 글 전체 목록 컨테이너
    <section ref={scrollTargetRef} className={"FeedPostsContainer"}>
      {/* 상단 버튼들 (개발/디자인, 글 작성) */}
      <div className="FeedButtons">
        {/* 개발, 디자인 버튼 */}
        <div className="PostsCategory">
          {/* 위즐일 때만 버튼 표시 */}
          {postType === "wezzle" &&
            fields.map((field, index) => (
              <button
                key={index}
                // 현재 카테고리면 class 추가
                className={index === currentField ? "ActivePostsCategory" : ""}
                // 클릭 시 현재 클릭 분야로 설정하는 핸들러
                onClick={() => onButtonFieldClick(field)}
              >
                {field}
              </button>
            ))}
        </div>

        {/* 글 작성 버튼 */}
        <button className="ButtonWritePost" onClick={onWriteButtonClick}>
          <img src="/images/feedPage/post_write.png" alt="write" />
          {"글 작성"}
        </button>
      </div>

      {posts.length !== 0 ? (
        <div>
          {/* 포스트 컴포넌트들 (실제 피드) */}
          <div className="PostsPostContainer">
            {pagination
              .getCurrentPosts(currentPage, postsPerPage, posts)
              .reverse()
              .map((post, index) => (
                <Post key={index} post={post} />
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
        </div>
      ) : (
        // 글이 없음
        <NonePosts postType={postType} />
      )}
    </section>
  );
}

export default Posts;
