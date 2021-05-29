import React, { useCallback, useEffect } from "react";
import axios from "axios";

import Comment from "./Comment";

// CSS
import "./Comments.css";

function Comments({ comments, setComments, setCommentsLength }) {
  // 현 포스트에 포함된 댓글들을 가져옴
  const getComments = useCallback(async () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    const res = await axios.get(`/api${url}/comments`);
    // 받아오기에 성공했다면
    if (res.status === 200) {
      // 댓글들 목록 셋팅
      setComments(res.data.comments);
      // 댓글 갯수
      setCommentsLength(res.data.comments.length);
    }
  }, [setComments, setCommentsLength]);

  // componentDidmount
  useEffect(() => {
    const fetchData = async () => {
      // 댓글들 가져오기
      await getComments();
    };
    fetchData();
  }, [getComments]);

  // 댓글 삭제할 경우 실행
  const onRemoveComment = (commentId) => {
    // 지운 comment 제외하고 comments 새로 설정
    const newComments = comments.filter((comment) => comment._id !== commentId);
    setComments(newComments);
  };

  return (
    comments && (
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
    )
  );
}

export default Comments;
