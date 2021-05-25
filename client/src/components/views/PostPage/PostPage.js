import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Comment from "./Sections/Comment";

// CSS
import "./Sections/PostPage.css";
import "../../../utils/Common.css";

// 글 보기 페이지 (chohadam)
function PostPage() {
  // 현 포스트
  const [post, setPost] = useState(null);

  const getPost = async () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    const res = await axios.get(`/api${url}`);
    // 받아오기에 성공했다면
    if (res.data.gettingPostSuccess) {
      // 포스트 셋팅
      setPost(res.data.post);
    }
  };

  // 현 포스트에 포함된 댓글들 목록
  const [comments, setComments] = useState(null);

  // 현 포스트에 포함된 댓글들을 가져옴
  const getComments = useCallback(async () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    const res = await axios.get(`/api${url}`);
    // 받아오기에 성공했다면
    if (res.data.gettingPostSuccess) {
      const newComments = await setCommentsUser(res.data.comments);
      // 댓글들 목록 셋팅
      setComments(newComments);
    }
  }, []);

  const setCommentsUser = async (comments) => {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const userId = comment.user._id ?? comment.user;
      const res = await axios.get(`/api/users/${userId}`);
      if (res.status === 200) {
        const { user } = res.data;
        comment.user = {
          ...user,
        };
      }
    }
    return comments;
  };

  const [stateLoaded, setStateLoaded] = useState(false);
  // componentDidmount
  useEffect(() => {
    const fetchData = async () => {
      // 현 포스트 가져오기
      await getPost();
      // 댓글들 가져오기
      await getComments();

      // state 값 다 셋팅 완료
      setStateLoaded(true);
    };
    fetchData();
  }, [getComments]);

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
    stateLoaded && (
      <div id="Container" className="PostPageContainer">
        {/* 글 컨테이너 */}
        <div className="PostContainer">
          {/* 상단 글쓴이 정보, 게시글 좋아요, 댓글 정보 */}
          <div className="PostTopContents">
            {/* 글쓴이 정보 */}
            <div className="PostUser">
              {/* 프로필 사진 */}
              <img src="/images/profile-image.jpg" alt="profile" />
              {/* 이름, 게시날짜 */}
              <div className="PostUserText">
                <span className="PostUserName">{"최다연"}</span>
                <span>{post.createdAt.slice(0, 10)}</span>
              </div>
            </div>

            {/* 좋아요, 댓글 */}
            <ul className="PostInfo">
              <li>
                좋아요
                <span className="PostInfoData">{post.likeCount}</span>
              </li>
              <li>
                댓글
                <span className="PostInfoData">{comments.length}</span>
              </li>
            </ul>
          </div>

          {/* 실제 본문 내용 */}
          <div className="PostMainContents">
            <div className="PostTitleContainer">
              <span className="PostTitle">{post.title}</span>
              <div className="PostControl">
                <button>수정하기</button>
                <button>
                  <img src="/images/post_delete.png" alt="delete" />
                </button>
              </div>
            </div>

            <span className="PostMainText">{post.contents.text}</span>

            {post.contents.images.length !== 0 && (
              <img
                className="PostContentsImage"
                src="/images/profile-image.jpg"
                alt="postimage"
              />
            )}

            <div className="PostLikeShareContainer">
              <button>
                <img src="/images/post_like.png" alt="likebutton" />
                좋아요
              </button>
              <button>
                <img src="/images/post_share.png" alt="sharebutton" />
                공유하기
              </button>
            </div>
          </div>
        </div>

        {/* 댓글 보기 */}
        {/* 전체 댓글들 컨테이너 */}
        <div className="CommentsContainer">
          {/* 댓글들 갯수만큼 반복하며 댓글을 하나씩 가져옴 */}
          {comments.map((comment, i) => (
            <Comment key={i} comment={comment} getComments={getComments} />
          ))}
        </div>

        {/* 댓글 쓰기 입력 폼 */}
        <form
          className="CommentInputContainer"
          onSubmit={handleCommentSubmit}
          method="post"
        >
          <img src="/images/profile-image.jpg" alt="currentUserProfileImage" />
          <input
            type="text"
            placeholder="지금 바로 친구들과 의견을 공유해보세요!"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          {/* 전송 버튼 */}
          <button type="submit">
            <img src="/images/comment_send.png" alt="submitIcon" />
          </button>
        </form>
      </div>
    )
  );
}

export default PostPage;
