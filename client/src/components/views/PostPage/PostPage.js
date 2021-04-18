import React, { useState, useEffect } from "react";
import axios from "axios";

function PostPage() {
  // 현 포스트에 포함된 댓글들 목록
  const [comments, setComments] = useState([]);

  // 현 포스트에 포함된 댓글들을 가져옴
  const getComments = () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    axios.get(`/api${url}`).then((res) => {
      console.log(res.data);
      // 받아오기에 성공했다면
      if (res.data.gettingCommentSuccess) {
        // 댓글들 목록 셋팅
        setComments(res.data.comments);
      }
    });
  };

  // componentDidmount
  useEffect(() => {
    // 댓글들 가져오기
    getComments();
  }, []);

  // 댓글 삭제 버튼 클릭 시
  const handleDeleteComment = (e) => {
    e.preventDefault();

    const commentId = e.target.childNodes[0].id;
  };

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
        getComments();
      } else {
        // 댓글 작성 실패 시
        alert("댓글 작성에 실패하였습니다.");
      }
    });
  };
  return (
    <div>
      {/* 댓글 쓰기 입력 폼 */}
      <form onSubmit={handleCommentSubmit} method="post">
        <input
          type="text"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        {/* 전송 버튼 */}
        <input type="submit" value="submit" />
      </form>

      {/* 댓글 보기 */}
      {/* 전체 댓글들 컨테이너 */}
      <div className="CommentsContainer">
        {/* 댓글들 갯수만큼 반복하며 댓글을 하나씩 가져옴 */}
        {comments.map((comment, i) => (
          // 댓글 하나의 컨테이너
          <div className="CommentContainer" key={i}>
            {/* 댓글 내용 */}
            <span className="CommentText">{comment.text}</span>
            {/* 댓글 수정 버튼 */}
            <button className="EditCommentButton">Edit</button>
            {/* 댓글 삭제 폼 */}
            <form onSubmit={handleDeleteComment} method="post">
              {/* 댓글 삭제 버튼 */}
              <input id={comment._id} type="submit" value="Delete" />
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
