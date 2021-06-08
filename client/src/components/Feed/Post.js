import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import getRandomNumber from "../../utils/getRandomNumber";

import "./Post.css";

// 피드에 있는 게시글 미리보기 하나 하나의 컴포넌트
function Post(props) {
  // 현재 게시글
  const [post, setPost] = useState(props.post);

  // post가 달라지면 실행
  useEffect(() => {
    // post 자체가 다른 것이면 새로 post 셋팅
    if (post._id !== props.post._id) {
      setPost(props.post);
    }
  }, [props.post, post._id]);

  // 페이지 전환을 위한 Hook
  const history = useHistory();
  const onPostClick = (e) => {
    if (buttonDeleteRef.current.contains(e.target)) {
      return;
    }

    // 게시글 미리보기 클릭
    // wezzle 혹은 mezzle
    const postType = post.isWezzle ? "wezzle" : "mezzle";

    // 해당 게시글로 화면 전환
    history.push(`/${postType}/post/${post._id}`);
  };

  // 삭제 버튼 ref
  const buttonDeleteRef = useRef();
  // 게시글 삭제
  const onDeletePost = async (e) => {
    // 삭제 확인
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      // 삭제 취소 시 리턴
      return;
    }

    // 요청 url
    const url = `/api/post/${post._id}`;

    // 삭제 요청
    const res = await axios.delete(url);

    // 성공적으로 삭제되었다면
    if (res.status === 200) {
      // 게시글 목록 업데이트
      props.onRemovePost(post._id);
      alert("🗑 게시글이 삭제되었습니다!");
    }
  };

  return (
    <article className={"PreviewPostContainer"} onClick={onPostClick}>
      {/* Delete Button */}
      {props.isMypage && (
        <button
          className={"ButtonMypagePostDelete"}
          ref={buttonDeleteRef}
          onClick={onDeletePost}
        >
          <img src="/images/myPage/post_delete.png" alt="delete" />
        </button>
      )}

      {/* 이미지가 있는지 없는지에 따라 기본 이미지 or 이미지 출력 */}
      {post.contents.images.length === 0 ? (
        // 이미지 없음
        <div className="PostDefaultImage">
          <img
            src={`/images/default/post/${getRandomNumber()}.png`}
            alt="default"
          />
        </div>
      ) : (
        // 이미지 있음
        <img
          className={"PreviewPostImage"}
          src={post.contents.images[0]}
          alt="post-contents"
        />
      )}

      {/* 타이틀 */}
      <span className={"FeedPostTitle"}>{post.title}</span>

      <div className="PostInformation">
        {/* 작성자 */}
        <span className={"PreviewPostUser"}>{post.user.name}</span>
        {/* 하트, 댓글 수 preview */}
        <div className={"PreviewLikeComment"}>
          {/* 하트 수 */}
          <img src="/images/feedPage/like_preview.png" alt="like" />
          <span>{post.like.length}</span>
          {/* 댓글 수 */}
          <img src="/images/feedPage/comment_preview.png" alt="like" />
          <span>{post.commentCount}</span>
        </div>
      </div>
    </article>
  );
}

export default Post;
