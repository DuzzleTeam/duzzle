import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Comment from "./Sections/Comment";

// CSS
import "./Sections/PostPage.css";
import "../../../utils/Common.css";

// 글 보기 페이지 (chohadam)
function PostPage() {
  // 현 포스트
  const [post, setPost] = useState(null);

  // 게시글 작성자 정보 셋팅
  const setPostUser = async (post) => {
    // 게시글 작성자 id
    const userId = post.user;
    // 정보 가져오기 (이름, 메일, 프로필 사진)
    const res = await axios(`/api/users/${userId}`);
    // 정상적으로 가져왔다면
    if (res.status === 200) {
      // user data
      const { user } = res.data;
      // 셋팅
      post.user = user;
    }
    return post;
  };

  const getPost = useCallback(async () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    const res = await axios.get(`/api${url}`);
    // 받아오기에 성공했다면
    if (res.data.gettingPostSuccess) {
      // 포스트 유저 정보 셋팅하기
      const newPost = await setPostUser(res.data.post);
      // 포스트 셋팅
      setPost(newPost);
    }
  }, []);

  // 현 포스트에 포함된 댓글들 목록
  const [comments, setComments] = useState(null);

  // 현 포스트에 포함된 댓글들을 가져옴
  const getComments = useCallback(async () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    const res = await axios.get(`/api${url}`);
    // 받아오기에 성공했다면
    if (res.data.gettingPostSuccess) {
      const newComments = await setCommentsUser(res.data.comments);
      // 댓글들 목록 셋팅
      setComments(newComments);
    }
  }, []);

  // 현 포스트에 포함된 댓글들의 작성자 정보 셋팅하기
  const setCommentsUser = async (comments) => {
    // 루프를 돌면서 모든 댓글들을 설정해줌
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      // 댓글의 유저 아이디
      const userId = comment.user._id ?? comment.user;
      // 유저 정보 요청
      const res = await axios.get(`/api/users/${userId}`);
      // 받아오기 성공하면
      if (res.status === 200) {
        // user 정보 셋팅
        const { user } = res.data;
        comment.user = user;
      }
    }
    return comments;
  };

  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // 모든 state가 로드 되었는지
  const [stateLoaded, setStateLoaded] = useState(false);
  // componentDidmount
  useEffect(() => {
    const fetchData = async () => {
      // 현 포스트 가져오기
      await getPost();
      // 댓글들 가져오기
      await getComments();

      // state 값 다 셋팅 완료
      setStateLoaded(true);
    };
    fetchData();
  }, [getPost, getComments, user]);

  // 댓글 쓰기 input value
  const [commentValue, setCommentValue] = useState("");

  // 댓글 전송
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // 서버에 전송할 body data
    const body = {
      text: commentValue,
    };

    // 현재 주소 (postId값을 얻기 위해)
    const url = document.location.pathname;
    // post 방식으로 요청
    axios.post(`/api${url}`, body).then((res) => {
      if (res.data.createCommentSuccess) {
        // 댓글 전송 성공 시 input 값 초기화
        setCommentValue("");
        // 댓글 가져오기
        setComments([...comments, res.data.comment]);
      } else {
        // 댓글 작성 실패 시
        alert("댓글 작성에 실패하였습니다.");
      }
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

  // 댓글 삭제할 경우 실행
  const onRemoveComment = (commentId) => {
    // 지운 comment 제외하고 comments 새로 설정
    const newComments = comments.filter((comment) => comment._id !== commentId);
    setComments(newComments);
  };

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
    stateLoaded &&
    (isRemovedPost ? (
      <Redirect to={`/${post.isWezzle ? "wezzle" : "mezzle"}`} />
    ) : (
      <div id="Container" className="PostPageContainer">
        {/* 글 컨테이너 */}
        <section className="PostContainer">
          {/* 상단 글쓴이 정보, 게시글 좋아요, 댓글 정보 */}
          <article className="PostTopContents">
            {/* 글쓴이 정보 */}
            <div className="PostUser">
              {/* 프로필 사진 */}
              <img src="/images/profile-image.jpg" alt="profile" />
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
                <span className="PostInfoData">{comments.length}</span>
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

        {/* 댓글 보기 */}
        {/* 전체 댓글들 컨테이너 */}
        <section className="CommentsContainer">
          {/* 댓글들 갯수만큼 반복하며 댓글을 하나씩 가져옴 */}
          {comments.map((comment, i) => (
            <Comment
              key={i}
              comment={comment}
              onRemoveComment={onRemoveComment}
            />
          ))}
        </section>

        {/* 댓글 쓰기 입력 폼 */}
        <form
          className="CommentInputContainer"
          onSubmit={handleCommentSubmit}
          method="post"
        >
          <img src="/images/profile-image.jpg" alt="currentUserProfileImage" />
          <input
            type="text"
            placeholder="지금 바로 친구들과 의견을 공유해보세요!"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          {/* 전송 버튼 */}
          <button type="submit">
            <img src="/images/comment_send.png" alt="submitIcon" />
          </button>
        </form>

        {/* 토스트 메시지 컨테이너 */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    ))
  );
}

export default PostPage;
