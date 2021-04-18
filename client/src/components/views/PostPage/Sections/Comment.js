import React, { useState, useEffect } from "react";
import axios from "axios";

function Comment(props) {
  const [comment, setComment] = useState({});
  useEffect(() => {
    setComment(props.comment);
  }, [props.comment]);

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
    // 지우려는 댓글의 아이디를 가져옴
    const commentId = e.target.childNodes[0].id;
    // 댓글 삭제 요청
    axios.delete(`/api/${currentPageMenu}/comment/${commentId}`).then((res) => {
      if (res.data.deleteCommentSuccess) {
        // 정상적으로 삭제가 되었다면
        // UI 업데이트 (댓글을 가져옴)
        props.getComments();
      }
    });
  };

  const [updatingComment, setUpdatingComment] = useState(false);
  const [updateCommentValue, setUpdateCommentValue] = useState(comment.text);
  const handleUpdateComment = (e) => {
    if (updatingComment) {
      setUpdatingComment(false);
    } else {
      setUpdatingComment(true);
    }
  };

  return (
    // 댓글 하나의 컨테이너
    <div className="CommentContainer" key>
      {/* 댓글 내용 */}
      <span className="CommentText">{comment.text}</span>
      <input
        type="text"
        className={
          updatingComment
            ? "UpdatingComment UpdateCommentInput"
            : "UpdateCommentInput"
        }
        value={updateCommentValue}
        onChange={(e) => setUpdateCommentValue(e.target.value)}
      />
      {/* 댓글 수정 취소 버튼 */}
      <button
        className="CancelEditCommentButton"
        onClick={() => setUpdatingComment(false)}
      >
        Cancel
      </button>
      {/* 댓글 수정 버튼 */}
      <button onClick={handleUpdateComment} className="EditCommentButton">
        {updatingComment ? "Submit" : "Edit"}
      </button>
      {/* 댓글 삭제 폼 */}
      <form onSubmit={handleDeleteComment} method="post">
        {/* 댓글 삭제 버튼 */}
        <input id={comment._id} type="submit" value="Delete" />
      </form>
    </div>
  );
}

export default Comment;
