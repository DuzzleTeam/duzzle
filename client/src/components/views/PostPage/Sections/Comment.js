import React, { useState, useEffect } from "react";
import axios from "axios";

// CSS
import "./Comment.css";

// 댓글 하나 하나의 컴포넌트 (chohadam)
function Comment(props) {
  // 현재 댓글
  const [comment, setComment] = useState({});

  // componentDidmount
  useEffect(() => {
    // 현재 댓글 셋팅
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
            // 댓글 수정 성공 시 UI 업데이트 (댓글 목록 다시 가져오기)
            props.getComments();
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

  return (
    // 댓글 하나의 컨테이너
    <div className="CommentContainer">
      {/* 댓글 수정할 때는 안 보임 */}
      {updatingComment ? (
        <></>
      ) : (
        // 댓글 내용
        <span className="CommentText">{comment.text}</span>
      )}

      {/* 댓글 수정 시에만 보임 */}
      {updatingComment ? (
        <>
          {/* 댓글 수정 input */}
          <input
            type="text"
            className="UpdateCommentInput"
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
        </>
      ) : (
        <></>
      )}

      {/* 댓글 수정 버튼 */}
      <button onClick={handleUpdateComment} className="EditCommentButton">
        {updatingComment ? "Submit" : "Edit"}
      </button>

      {/* 댓글 수정할 때는 안 보임 */}
      {updatingComment ? (
        <></>
      ) : (
        // 댓글 삭제 폼
        <form onSubmit={handleDeleteComment} method="post">
          {/* 댓글 삭제 버튼 */}
          <input id={comment._id} type="submit" value="Delete" />
        </form>
      )}
    </div>
  );
}

export default Comment;
