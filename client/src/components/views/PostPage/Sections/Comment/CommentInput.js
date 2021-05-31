import React, { useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

// CSS
import "./CommentInput.css";

function CommentInput({ postId, setComments, setPost }) {
  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // 댓글 쓰기 input value
  const [commentValue, setCommentValue] = useState("");

  // 댓글 전송
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // 서버에 전송할 body data
    const body = {
      text: commentValue,
    };

    onSubmitNewComment(body);
  };

  const onSubmitNewComment = (body) => {
    // 요청 보낼 url
    const url = `/api/post/${postId}/comment`;

    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        // 댓글 전송 성공 시 input 값 초기화
        setCommentValue("");
        // 댓글 가져오기
        setComments((comments) => [...comments, res.data.comment]);
        // post 댓글 갯수도 업데이트
        setPost((post) => {
          return {
            ...post,
            commentCount: post.commentCount + 1,
          };
        });

        // 알림 보내기
        const commentId = res.data.comment._id;
        axios.get(`/api/nofitication/${commentId}`);
      } else {
        // 댓글 작성 실패 시
        alert("댓글 작성에 실패하였습니다.");
      }
    });
  };

  return (
    <form
      className="CommentInputContainer"
      onSubmit={handleCommentSubmit}
      method="post"
    >
      <img src={user.profileImage} alt="currentUserProfileImage" />
      <input
        type="text"
        placeholder="지금 바로 친구들과 의견을 공유해보세요!"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />
      {/* 전송 버튼 */}
      <button type="submit">
        <img src="/images/postPage/comment_send.png" alt="submitIcon" />
      </button>
    </form>
  );
}

export default CommentInput;
