import React, { useState } from "react";
import axios from "axios";

function UpdateComment({ setUpdatingComment, comment, setComment }) {
  // 댓글 수정 input value
  const [updateCommentValue, setUpdateCommentValue] = useState(comment.text);

  // 댓글 수정 or 댓글 수정 전송 버튼 핸들
  const onSubmitUpdateComment = (e) => {
    // 수정하려는 텍스트 body data 설정
    const body = {
      text: updateCommentValue,
    };

    // 현재 comment id를 보내며 patch 요청
    axios.patch(`/api/comment/${comment._id}`, body).then((res) => {
      if (res.status === 200) {
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
  };
  return (
    <>
      {/* 댓글 수정 Input */}
      <textarea
        className="UpdateCommentInput"
        rows={Math.floor(updateCommentValue.length / 50) + 1}
        value={updateCommentValue}
        onChange={(e) => setUpdateCommentValue(e.target.value)}
      />

      <div className="EditButton">
        {/* 댓글 수정 확인 버튼 */}
        <button
          onClick={onSubmitUpdateComment}
          className="ConfirmEditCommentButton"
        >
          <img src="/images/postPage/comment_edit_confirm.png" alt="confirm" />
        </button>

        {/* 댓글 수정 취소 버튼 */}
        <button
          className="CancelEditCommentButton"
          onClick={() => setUpdatingComment(false)}
        >
          <img src="/images/postPage/comment_edit_cancel.png" alt="cancel" />
        </button>
      </div>
    </>
  );
}

export default UpdateComment;
