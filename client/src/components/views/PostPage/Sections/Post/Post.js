import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Post({ post, setPost, commentsLength }) {
  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // 현재 포스트 가져오기
  const getPost = useCallback(async () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    const res = await axios.get(`/api${url}`);
    // 받아오기에 성공했다면
    if (res.status === 200) {
      // 포스트 셋팅
      setPost(res.data.post);
    }
  }, [setPost]);

  // componentDidmount
  useEffect(() => {
    const fetchData = async () => {
      // 현 포스트 가져오기
      await getPost();
    };
    fetchData();
  }, [getPost]);

  // 게시글 공유
  const onSharePost = (e) => {
    // 현 게시글 url
    const url = window.location.href;
    // 클립보드에 복사
    navigator.clipboard.writeText(url);

    // 토스트 메시지 출력
    toast.success("🔗 링크가 클립보드에 복사되었습니다!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [isRemovedPost, setIsRemovedPost] = useState(false);
  // 게시글 삭제 버튼 클릭시
  const onRemovePost = async (e) => {
    // 게시글 삭제 확인
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      // 취소 선택 시 게시글을 지우지 않음 (함수 종료)
      return;
    }

    // 현재 페이지가 위즐인지 미즐인지
    const currentPageMenu = post.isWezzle ? "wezzle" : "mezzle";
    // 삭제 요청
    const res = await axios.delete(`/api/${currentPageMenu}/post/${post._id}`);

    // 삭제 성공 시
    if (res.data.deletePostSuccess) {
      window.alert("게시글이 삭제되었습니다.");
      setIsRemovedPost(true);
    }
  };

  const sharePostButtonRef = useRef();

  // 프로젝트 모집 기간, 프로젝트 예상 기간 템플릿
  const periodTemplate = (period) => {
    const [start, end] = period.split("-");
    const $start = <span>{dateTemplate(start)}</span>;
    const $end = <span>{dateTemplate(end)}</span>;

    return (
      <span className={"PostTextPeriod"}>
        {$start} - {$end}
      </span>
    );
  };
  // 날짜 템플릿 (yyyy년 mm월 dd일)
  const dateTemplate = (date) => {
    return `${date.substring(0, 4)}년 ${date.substring(
      4,
      6
    )}월 ${date.substring(6)}일`;
  };

  // 모집분야 템플릿 (배열을 span 하나씩)
  const fieldTemplate = (field) => {
    return field.map((str, index) => <span key={index}>{str}</span>);
  };
  return (
    post &&
    (isRemovedPost ? (
      <Redirect to={`/${post.isWezzle ? "wezzle" : "mezzle"}`} />
    ) : (
      <section className="PostContainer">
        {/* 상단 글쓴이 정보, 게시글 좋아요, 댓글 정보 */}
        <article className="PostTopContents">
          {/* 글쓴이 정보 */}
          <div className="PostUser">
            {/* 프로필 사진 */}
            <img src={user.profileImage} alt="profile" />
            {/* 이름, 게시날짜 */}
            <div className="PostUserText">
              <Link to={`/users/${post.user.email}`} className="PostUserName">
                {post.user.name}
              </Link>
              <span>{post.createdAt.slice(0, 10)}</span>
            </div>
          </div>

          {/* 좋아요, 댓글 */}
          <ul className="PostInfo">
            <li>
              좋아요
              <span className="PostInfoData">{post.likeCount}</span>
            </li>
            <li>
              댓글
              <span className="PostInfoData">{commentsLength}</span>
            </li>
          </ul>
        </article>

        {/* 실제 본문 내용 */}
        <article className="PostMainContents">
          <div className="PostTitleContainer">
            <span className="PostTitle">{post.title}</span>
            {/* 게시글 수정, 삭제 버튼 작성자여야 보이기 */}
            {user !== undefined && user._id === post.user._id && (
              <div className="PostControl">
                <button>수정하기</button>
                <button onClick={onRemovePost}>
                  <img src="/images/post_delete.png" alt="delete" />
                </button>
              </div>
            )}
          </div>

          {/* 위즐일 때 협업 관련 내용 */}
          {post.isWezzle && (
            <div className={"PostWezzleContainer"}>
              {/* period, field, peopleNum, projectPeriod */}
              <div>
                <span>{"모집기간"}</span>
                {periodTemplate(post.recruit.period)}
              </div>
              <div>
                <span>{"모집분야"}</span>
                {fieldTemplate(post.recruit.field)}
              </div>
              <div>
                <span>{"모집인원"}</span>
                {post.recruit.peopleNum + "명"}
              </div>
              <div>
                <span>{"프로젝트 예상 기간"}</span>
                {periodTemplate(post.projectPeriod)}
              </div>
            </div>
          )}

          <span className="PostMainText">{post.contents.text}</span>

          {post.contents.images.length !== 0 && (
            <img
              className="PostContentsImage"
              src="/images/profile-image.jpg"
              alt="postimage"
            />
          )}

          <div className="PostLikeShareContainer">
            <button>
              {post.isWezzle ? (
                <>
                  <img src="/images/post_together.png" alt="likebutton" />
                  협업해요
                </>
              ) : (
                <>
                  <img src="/images/post_like.png" alt="likebutton" />
                  좋아요
                </>
              )}
            </button>
            <button
              className={"ButtonSharePost"}
              onClick={onSharePost}
              onMouseOver={() =>
                (sharePostButtonRef.current.src =
                  "/images/post_share_hover.png")
              }
              onMouseOut={() =>
                (sharePostButtonRef.current.src = "/images/post_share.png")
              }
            >
              <img
                ref={sharePostButtonRef}
                src="/images/post_share.png"
                alt="sharebutton"
              />
              공유하기
            </button>
          </div>
        </article>
      </section>
    ))
  );
}

export default Post;
