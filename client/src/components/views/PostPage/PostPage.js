import React, { useState, useEffect } from "react";
import axios from "axios";

import Comment from "./Sections/Comment";

// 글 보기 페이지 (chohadam)
function PostPage() {
  // 현 포스트
  const [post, setPost] = useState(null);

  const getPost = () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    axios.get(`/api${url}`).then((res) => {
      // 받아오기에 성공했다면
      if (res.data.gettingPostSuccess) {
        // 포스트 셋팅
        setPost(res.data.post);
      }
    });
  };

  // 현 포스트에 포함된 댓글들 목록
  const [comments, setComments] = useState(null);

  // 현 포스트에 포함된 댓글들을 가져옴
  const getComments = () => {
    // 현재 주소 (postId값을 얻기 위함)
    const url = document.location.pathname;
    // get 방식으로 요청
    axios.get(`/api${url}`).then((res) => {
      // 받아오기에 성공했다면
      if (res.data.gettingPostSuccess) {
        // 댓글들 목록 셋팅
        setComments(res.data.comments);
      }
    });
  };

  const [stateLoaded, setStateLoaded] = useState(false);
  // componentDidmount
  useEffect(() => {
    // 현 포스트 가져오기
    getPost();
    // 댓글들 가져오기
    getComments();

    if (post !== null && comments !== null) {
      // state 값 다 셋팅 완료
      setStateLoaded(true);
    }
  }, [post, comments]);

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

  return stateLoaded ? (
    <div>
      {/* 글 컨테이너 */}
      <div className="PostContainer">
        {/* 상단 글쓴이 정보, 게시글 좋아요, 댓글 정보 */}
        <div className="PostTopContents">
          {/* 글쓴이 정보 */}
          <div className="PostUser">
            {/* 프로필 사진 */}
            <img src="" alt="profile" />
            {/* 이름, 게시날짜 */}
            <div className="PostUserText">
              <span className="PostUserName">{post.user}</span>
              <span>{post.createdAt}</span>
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
              <button>삭제</button>
            </div>
          </div>

          <span className="PostMainText">{post.contents.text}</span>

          {post.contents.images.length !== 0 ? (
            <img src="/images/profile-image.jpg" alt="postimage" />
          ) : (
            <></>
          )}

          <div className="PostLikeShareContainer">
            <button>
              <img src="" alt="likebutton" />
              좋아요
            </button>
            <button>
              <img src="" alt="sharebutton" />
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
      <form onSubmit={handleCommentSubmit} method="post">
        <img src="" alt="currentUserProfileImage" />
        <input
          type="text"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        {/* 전송 버튼 */}
        <button type="submit">
          <img src="" alt="submitIcon" />
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default PostPage;
