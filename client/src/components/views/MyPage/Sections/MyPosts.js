import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import pagination from "../../../Pagination/functions";

import Pagination from "../../../Pagination/Pagination";
import Post from "../../../Feed/Post";

// CSS
import "./MyPosts.css";

// cache
const cache = {};

function MyPosts({ currentMenu, email }) {
  // 보고있는 마이페이지 유저의 포스트 정보
  const [posts, setPosts] = useState(null);

  // react-router
  const history = useHistory();

  // 전체 게시글 가져오기
  const getPosts = useCallback(async () => {
    // 페이지 초기화
    setCurrentPage(1);

    // 해시 초기화
    // anchor
    history.replace({
      hash: "",
    });

    // 요청 url
    let url = "";
    if (currentMenu) {
      // currentMenu가 1이면 user가 작성한 모든 게시글을 가져옴
      // 캐싱 되어있다면
      if (cache.myPosts) {
        return setPosts(cache.myPosts);
      }
      // 요청 url
      url = `/api/posts/${email}`;
    } else {
      // currentMenu가 0이면 user 관련 wezzle like만 가져옴
      // 캐싱 되어있다면
      if (cache.myLikes) {
        return setPosts(cache.myLikes);
      }
      // 요청 url
      url = `/api/likes/${email}`;
    }
    // 유저의 포스트 정보 가져오기 요청
    const res = await axios.get(url);

    // 가져오기에 성공했다면
    if (res.status === 200) {
      const { posts } = res.data;
      // 캐싱
      currentMenu ? (cache.myPosts = posts) : (cache.myLikes = posts);
      // posts 셋팅
      setPosts(posts);
    } else {
      setPosts(null);
    }
  }, [history, currentMenu, email]);

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

  return (
    // 글 전체 목록 컨테이너
    <section ref={scrollTargetRef} className={"MyPostsContainer"}>
      {posts ? (
        <>
          {/* 포스트 컴포넌트들 (실제 피드) */}
          <div className="MypagePostsPostContainer">
            {/* 현재 화면에 표시할 게시물 구하기 */}
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
        </>
      ) : (
        // 글이 없음
        <></>
      )}
    </section>
  );
}

export default MyPosts;
