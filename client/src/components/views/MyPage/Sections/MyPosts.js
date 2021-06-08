import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import pagination from "../../../Pagination/functions";

import Pagination from "../../../Pagination/Pagination";
import Post from "../../../Feed/Post";
import Loading from "../../../Loading/Loading";
import NonePosts from "../../../Feed/NonePosts";

// CSS
import "./MyPosts.css";

function MyPosts({ currentMenu, isAuth, email }) {
  // 보고있는 마이페이지 유저의 포스트 정보
  const [posts, setPosts] = useState(null);

  // cache
  const [cache, setCache] = useState([null, null]);
  // cache reset
  useEffect(() => {
    setCache([null, null]);
  }, [email]);

  // 포스트 가져오는 중인지
  const [isLoading, setIsLoading] = useState(false);

  // react-router
  const history = useHistory();

  // 전체 게시글 가져오기
  // 이메일이 바뀌면 실행
  const getPosts = useCallback(
    async (currentMenu) => {
      // 페이지 초기화
      setCurrentPage(1);

      // 해시 초기화
      // anchor
      history.replace({
        hash: "",
      });

      // 요청 url
      // currentMenu가 1이거나 다른 사람의 마이페이지를 보고있다면
      // user가 작성한 모든 게시글을 가져옴
      // currentMenu가 0이면 user 관련 wezzle like만 가져옴
      const url = `/api/${currentMenu ? "posts" : "likes"}/${email}`;

      // 서버 통신 로딩 중
      setIsLoading(true);

      // 유저의 포스트 정보 가져오기 요청
      const res = await axios.get(url);

      // 가져오기에 성공했다면
      if (res.status === 200 && res.data.posts) {
        const { posts } = res.data;

        // 캐싱
        // 1이면 likes, 0이면 posts
        setCache((cache) =>
          currentMenu ? [cache[0], posts] : [posts, cache[1]]
        );

        // posts 셋팅
        setPosts(posts);
      } else {
        setPosts(null);
      }

      // 로딩 완료
      setIsLoading(false);
    },
    [history, email]
  );

  // 메뉴가 바뀌었을 때 실행
  useEffect(() => {
    // 캐싱 되어있다면
    if (cache[currentMenu]) {
      // 캐시 데이터 반환
      return setPosts(cache[currentMenu]);
    } else {
      // 캐시 데이터가 없다면 새로 가져오기
      const fetchData = async () => {
        await getPosts(currentMenu);
      };
      fetchData();
    }
  }, [cache, currentMenu, getPosts]);

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
      {/* 로딩 중일 경우 모달 띄우기 */}
      {isLoading && <Loading />}

      {/* 타인의 프로필을 보고 있을 경우 마진 */}
      <div className="MyPostsMargin"></div>

      {posts
        ? posts.length !== 0 && (
            <>
              {/* 포스트 컴포넌트들 (실제 피드) */}
              <div className="MypagePostsPostContainer">
                {/* 현재 화면에 표시할 게시물 구하기 */}
                {pagination
                  .getCurrentPosts(currentPage, postsPerPage, posts)
                  .map((post, index) => (
                    <Post
                      key={index}
                      post={post}
                      // 내 게시물일 때만 삭제 버튼 표시
                      isMypage={currentMenu === 1}
                    />
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
          )
        : isAuth &&
          // 글이 없음
          (currentMenu === 0 ? (
            <NonePosts
              link={"/wezzle"}
              type={"지원한"}
              description={"협업을 지원하러 가볼까요?"}
              go={"협업 지원"}
            />
          ) : (
            <NonePosts
              link={"/wezzle"}
              type={"작성한"}
              description={"글을 작성하러 가볼까요?"}
              go={"글 작성"}
            />
          ))}
    </section>
  );
}

export default MyPosts;
