import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Post from "./Sections/Post/Post";
import Comments from "./Sections/Comment/Comments";
import CommentInput from "./Sections/Comment/CommentInput";

// CSS
import "./Sections/PostPage.css";
import "../../../utils/Common.css";

// 글 보기 페이지 (chohadam)
function PostPage() {
  // 현 포스트
  const [post, setPost] = useState(null);
  // 현 포스트 댓글 갯수
  const [commentsLength, setCommentsLength] = useState(0);

  // 현 포스트에 포함된 댓글들 목록
  const [comments, setComments] = useState(null);

  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // redux 셋팅 완료 되었는지
  const [loaded, setLoaded] = useState(false);
  // componentDidMount
  useEffect(() => {
    // Redux User가 있으면
    if (user) {
      // 렌더링
      setLoaded(true);
    }
  }, [user, post, comments]);

  return (
    loaded && (
      <div id="Container" className="PostPageContainer">
        {/* 글 컨테이너 */}
        <Post post={post} setPost={setPost} commentsLength={commentsLength} />

        {/* 댓글 보기 */}
        {/* 전체 댓글들 컨테이너 */}
        <Comments
          comments={comments}
          setComments={setComments}
          setCommentsLength={setCommentsLength}
        />

        {/* 댓글 쓰기 입력 폼 */}
        <CommentInput setComments={setComments} />

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
    )
  );
}

export default withRouter(PostPage);
