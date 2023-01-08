import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import getRandomNumber from "../../utils/getRandomNumber";

import "./Post.css";

const DeleteButton = ({ ref, onClick }) => (
  <button className={"ButtonMypagePostDelete"} ref={ref} onClick={onClick}>
    <img src="/images/myPage/post_delete.png" alt="delete" />
  </button>
);

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const history = useHistory();
  const buttonDeleteRef = useRef(null);
  const isDefaultThumbnail = post.contents.images.length === 0;

  useEffect(() => {
    if (post._id !== props.post._id) {
      setPost(props.post);
    }
  }, [props.post, post._id]);

  const onPostClick = (e) => {
    if (buttonDeleteRef.current) {
      if (buttonDeleteRef.current.contains(e.target)) {
        return;
      }
    }

    const postType = post.isWezzle ? "wezzle" : "mezzle";
    history.push(`/${postType}/post/${post._id}`);
  };

  const onDeletePost = async (_e) => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      const url = `/api/post/${post._id}`;

      const res = await axios.delete(url);

      if (res.status === 200) {
        props.onRemovePost(post._id);
        alert("🗑 게시글이 삭제되었습니다!");
      }
    }
  };

  return (
    <article className="PreviewPostContainer" onClick={onPostClick}>
      {props.isMypage && <DeleteButton ref={buttonDeleteRef} onClick={onDeletePost} />}

      {isDefaultThumbnail ? (
        <div className="PostDefaultImage">
          <img src={`/images/default/post/${getRandomNumber()}.png`} alt="default" />
        </div>
      ) : (
        <img className={"PreviewPostImage"} src={post.contents.images[0]} alt="post-contents" />
      )}

      <span className="FeedPostTitle">{post.title}</span>

      <div className="PostInformation">
        <span className={"PreviewPostUser"}>{post.user.name}</span>
        <div className={"PreviewLikeComment"}>
          <img src="/images/feedPage/like_preview.png" alt="like" />
          <span>{post.like.length}</span>
          <img src="/images/feedPage/comment_preview.png" alt="like" />
          <span>{post.commentCount}</span>
        </div>
      </div>
    </article>
  );
};

export default Post;
