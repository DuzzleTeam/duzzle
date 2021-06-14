import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

// CSS
import "./Comment.css";
import UpdateComment from "./UpdateComment";

// 댓글 하나 하나의 컴포넌트 (chohadam)
function Comment(props) {
  // 현재 댓글
  const [comment, setComment] = useState(props.comment);

  // 현재 유저가 댓글을 쓴 사람인지
  const [isAuth, setIsAuth] = useState(false);
  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // state 셋팅 완료 여부
  const [stateLoaded, setStateLoaded] = useState(false);

  // componentDidMount
  useEffect(() => {
    // comment 셋팅
    if (props.comment._id !== comment._id) {
      setComment(props.comment);
    }

    if (user !== undefined) {
      // 접속한 유저가 댓글 작성자인지
      setIsAuth(user._id === comment.user._id);
      // 좋아요를 누른 댓글인지
      setCommentLiked(comment.like.includes(user.email));
    }

    // 로드 완료
    setStateLoaded(true);
  }, [props.comment, user, comment]);

  // 댓글 삭제 버튼 클릭 시
  const handleDeleteComment = (e) => {
    e.preventDefault();

    // 댓글 삭제 확인
    if (!window.confirm("댓글을 삭제하시겠습니까?")) {
      // 취소 선택 시 댓글을 지우지 않음 (함수 종료)
      return;
    }

    // 댓글 삭제 요청
    axios.delete(`/api/comment/${comment._id}`).then((res) => {
      if (res.status === 200) {
        // 정상적으로 삭제가 되었다면
        // UI 업데이트
        props.onRemoveComment(comment._id);
      }
    });
  };

  // 현재 댓글 수정 중인지
  const [updatingComment, setUpdatingComment] = useState(false);

  // 현재 댓글에 좋아요를 눌렀는지
  const [commentLiked, setCommentLiked] = useState(false);
  // 좋아요 요청 혹은 해제
  const handleLikeComment = (e) => {
    // 프론트 먼저 업데이트
    if (comment.like.includes(user.email)) {
      // 좋아요 누른 적이 있다면
      // 좋아요 취소
      const like = comment.like.slice();
      like.splice(comment.like.indexOf(user.email), 1);
      setComment({
        ...comment,
        like,
      });
    } else {
      // 좋아요 등록
      setComment({
        ...comment,
        like: [...comment.like, user.email],
      });
    }

    // 현재 comment id를 보내며 patch 요청
    axios.patch(`/api/like/${comment._id}`).then((res) => {
      if (!res.data.updateCommentSuccess) {
        // 좋아요 실패 시
        alert("좋아요를 실패했습니다.");
        // 좋아요 취소
        const failLike = comment.like.splice(comment.like.length - 1, 1);
        setComment({
          ...comment,
          like: failLike,
        });

        // setComment({
        //   ...comment,
        //   like: res.data.like,
        // });
      }
    });
  };

  return (
    stateLoaded && (
      // 댓글 하나의 컨테이너
      <div className="CommentContainer">
        {/* 댓글 유저, 댓글 게시 날짜, 내용 */}
        {/* 댓글 유저 프로필 사진 (없다면 탈퇴 사용자) */}
        {comment.user._id ? (
          <img
            className="CommentUserProfileImage"
            src={comment.user.profileImage}
            alt="commentUserProfileImage"
          />
        ) : (
          // 탈퇴한 사용자라면 기본 이미지 표시
          <img
            className="CommentUserProfileImage"
            src="/images/default/profile/1.png"
            alt="profile"
          />
        )}

        {!updatingComment ? (
          <>
            <div className="CommentMainContents">
              <div>
                {comment.user._id ? (
                  <Link
                    to={`/users/${comment.user.email}`}
                    className="CommentUser"
                  >
                    {comment.user.name}
                  </Link>
                ) : (
                  // 탈퇴한 사용자 처리
                  <Link className="CommentUser">{comment.user.name}</Link>
                )}
                <span className="CommentDate">
                  {comment.createdAt.slice(0, 10)}
                </span>
              </div>
              {/* 댓글 내용 */}
              <span className="CommentText">{comment.text}</span>
            </div>

            {isAuth && (
              <div className="CommentAuthContainer">
                {/* 댓글 수정 버튼 */}
                <button
                  onClick={() => setUpdatingComment(true)}
                  className="EditCommentButton"
                >
                  {"수정"}
                </button>

                {/* 댓글 삭제 폼 */}
                <form onSubmit={handleDeleteComment} method="post">
                  {/* 댓글 삭제 버튼 */}
                  <button
                    className="DeleteCommentButton"
                    id={comment._id}
                    type="submit"
                  >
                    <img
                      src="/images/postPage/comment_delete.png"
                      alt="delete"
                    />
                  </button>
                </form>
              </div>
            )}

            {/* 좋아요 버튼 */}
            <div className="CommentLikeContainer" onClick={handleLikeComment}>
              {/* 좋아요 갯수 */}
              <span className="CommentLike">{comment.like.length}</span>
              <img
                src={
                  commentLiked
                    ? "/images/postPage/comment_like_sel.png"
                    : "/images/postPage/comment_like.png"
                }
                alt="like"
              />
            </div>
          </>
        ) : (
          <UpdateComment
            setUpdatingComment={setUpdatingComment}
            comment={comment}
            setComment={setComment}
          />
        )}
      </div>
    )
  );
}

export default Comment;
