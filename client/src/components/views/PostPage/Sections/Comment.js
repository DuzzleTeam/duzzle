import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

// CSS
import "./Comment.css";

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
    if (user !== undefined) {
      // 접속한 유저가 댓글 작성자인지
      setIsAuth(user._id === comment.user);
      // 좋아요를 누른 댓글인지
      setCommentLiked(comment.like.includes(user.email));
    }

    // 로드 완료
    setStateLoaded(true);
  }, [user, comment]);

  // 댓글 삭제 버튼 클릭 시
  const handleDeleteComment = (e) => {
    e.preventDefault();

    // 댓글 삭제 확인
    if (!window.confirm("댓글을 삭제하시겠습니까?")) {
      // 취소 선택 시 댓글을 지우지 않음 (함수 종료)
      return;
    }

    // 현재 페이지가 위즐인지 미즐인지 가져옴
    const currentPageMenu = document.location.pathname.match(/wezzle|mezzle/);
    // 댓글 삭제 요청
    axios
      .delete(`/api/${currentPageMenu}/comment/${comment._id}`)
      .then((res) => {
        if (res.data.deleteCommentSuccess) {
          // 정상적으로 삭제가 되었다면
          // UI 업데이트 (댓글을 가져옴)
          props.getComments();
        }
      });
  };

  // 현재 댓글 수정 중인지
  const [updatingComment, setUpdatingComment] = useState(false);
  // 댓글 수정 input value
  const [updateCommentValue, setUpdateCommentValue] = useState("");
  // 댓글 수정 or 댓글 수정 전송 버튼 핸들
  const handleUpdateComment = (e) => {
    if (updatingComment) {
      // 수정 중이었다면

      // 수정하려는 텍스트 body data 설정
      const body = {
        text: updateCommentValue,
      };

      // 현재 페이지가 위즐인지 미즐인지 가져옴
      const currentPageMenu = document.location.pathname.match(/wezzle|mezzle/);
      // 현재 comment id를 보내며 patch 요청
      axios
        .patch(`/api/${currentPageMenu}/comment/${comment._id}`, body)
        .then((res) => {
          if (res.data.updateCommentSuccess) {
            setComment({
              ...comment,
              text: updateCommentValue,
            });
          } else {
            alert("댓글 수정에 실패했습니다.");
          }
        });

      // 수정 중인지 여부 초기화
      setUpdatingComment(false);
    } else {
      // 수정 중이 아니었다면

      // 수정하려고 하는 댓글의 원래 텍스트 가져와서 셋팅
      setUpdateCommentValue(comment.text);
      // 수정 중 true로 변경
      setUpdatingComment(true);
    }
  };

  const [commentLiked, setCommentLiked] = useState(false);
  const handleLikeComment = (e) => {
    // 현재 페이지가 위즐인지 미즐인지 가져옴
    const currentPageMenu = document.location.pathname.match(/wezzle|mezzle/);
    // 현재 comment id를 보내며 patch 요청
    axios.patch(`/api/${currentPageMenu}/like/${comment._id}`).then((res) => {
      if (res.data.updateCommentSuccess) {
        setComment(res.data.newComment);
      } else {
        alert("좋아요를 실패했습니다.");
      }
    });
  };

  return (
    stateLoaded && (
      // 댓글 하나의 컨테이너
      <div className="CommentContainer">
        {/* 댓글 유저, 댓글 게시 날짜, 내용 */}
        {/* 댓글 유저 프로필 사진 */}
        <img
          className="CommentUserProfileImage"
          src="/images/profile-image.jpg"
          alt="commentUserProfileImage"
        />

        {!updatingComment ? (
          <>
            <div className="CommentMainContents">
              <div>
                <Link
                  to={`/users/${comment.user.email}`}
                  className="CommentUser"
                >
                  {comment.user.name}
                </Link>
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
                  onClick={handleUpdateComment}
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
                    <img src="/images/comment_delete.png" alt="delete" />
                  </button>
                </form>
              </div>
            )}

            {/* 좋아요 버튼 */}
            <div className="CommentLikeContainer" onClick={handleLikeComment}>
              <span className="CommentLike">{comment.like.length}</span>
              <button>
                <img
                  src={
                    commentLiked
                      ? "/images/comment_like_sel.png"
                      : "/images/comment_like.png"
                  }
                  alt="like"
                />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 댓글 수정 Input */}
            <textarea
              className="UpdateCommentInput"
              rows={Math.floor(updateCommentValue.length / 50) + 1}
              value={updateCommentValue}
              onChange={(e) => setUpdateCommentValue(e.target.value)}
            />
            <div className="EditButton">
              <button
                onClick={handleUpdateComment}
                className="ConfirmEditCommentButton"
              >
                <img src="/images/comment_edit_confirm.png" alt="confirm" />
              </button>
              {/* 댓글 수정 취소 버튼 */}
              <button
                className="CancelEditCommentButton"
                onClick={() => setUpdatingComment(false)}
              >
                <img src="/images/comment_edit_cancel.png" alt="cancel" />
              </button>
            </div>
          </>
        )}
      </div>
    )
  );
}

export default Comment;
