import React, { useState } from "react";
import axios from "axios";

function PostPage() {
  const [commentValue, setCommentValue] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const body = {
      text: commentValue,
    };

    const url = document.location.pathname;
    axios.post(`/api${url}`, body).then((res) => {
      if (res.data.createCommentSuccess) {
        document.location.reload();
      } else {
        alert("댓글 작성에 실패하였습니다.");
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleCommentSubmit} method="post">
        <input
          type="text"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default PostPage;
