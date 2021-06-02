import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";

import Pagination from "../../../Pagination/Pagination";
import Post from "../../../Feed/Post";

// CSS
import "./MyPosts.css";

// cache
const cache = {};

function MyPosts({ currentMenu, email }) {
  // 보고있는 마이페이지 유저의 포스트 정보
  const [posts, setPosts] = useState(null);

  // 전체 게시글 가져오기
  const getPosts = useCallback(async () => {
    // 페이지 초기화
    setCurrentPage(1);

    if (currentMenu) {
      // currentMenu가 1이면 user가 작성한 모든 게시글을 가져옴
      // 요청 url
      const url = `/api/posts/${email}`;

      // 유저의 포스트 정보 가져오기 요청
      const res = await axios.get(url);

      // 가져오기에 성공했다면
      if (res.status === 200) {
        const { posts } = res.data;
        // 캐싱
        cache.myPosts = posts;
        // posts 셋팅
        setPosts(posts);
      }
    } else {
      // currentMenu가 0이면 user 관련 wezzle like만 가져옴
      setPosts(null);
    }
  }, [currentMenu, email]);

  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
    };
    fetchData();
  }, [getPosts]);

  // 현재 페이지 (페이지네이션에서)
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지에 표시할 게시글 갯수
  const postsPerPage = 6;

  // 현재 화면에 표시할 게시물 구하기
  const getCurrentPosts = () => {
    const endIndex = currentPage * postsPerPage;
    const startIndex = endIndex - postsPerPage;
    const currentPosts = posts.slice(startIndex, endIndex);
    return currentPosts;
  };

  // 게시글 모음 컨테이너
  const scrollTargetRef = useRef();
  // location: state, pathname, hash ...
  const location = useLocation();
  // location state가 있고 ref가 있다면
  if (location.state && scrollTargetRef.current) {
    // state에서 scroll을 가져옴
    const { scroll } = location.state;
    // scroll이 true이면 pagination에서 페이지 전환한 것
    if (scroll) {
      // 게시글 상단으로 자동 스크롤 (사용자 편의)
      scrollTargetRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    // 페이지 전환을 한 적이 있다면
    if (location.hash !== "") {
      // 새로고침해도 현재 페이지이도록 설정
      const hashPage = location.hash.substring(1);
      setCurrentPage(Number(hashPage));
    }
  }, [location.hash]);

  return (
    posts && (
      // 글 전체 목록 컨테이너
      <section ref={scrollTargetRef} className={"MyPostsContainer"}>
        {posts.length !== 0 ? (
          <>
            {/* 포스트 컴포넌트들 (실제 피드) */}
            <div className="MypagePostsPostContainer">
              {getCurrentPosts().map((post, index) => (
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
          </>
        ) : (
          // 글이 없음
          <></>
        )}
      </section>
    )
  );
}

export default MyPosts;
