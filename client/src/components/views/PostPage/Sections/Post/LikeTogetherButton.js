import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import "./LikeTogetherButton.css";

function LikeTogetherButton({ setPost, post }) {
  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // like or 협업 버튼 클릭 시
  const onClickLike = async (e) => {
    // 프론트 먼저 업데이트
    const like = post.like.slice();
    if (post.like.includes(user.email)) {
      // 좋아요 누른 적이 있다면
      // 좋아요 취소
      like.splice(post.like.indexOf(user.email), 1);
    } else {
      // 좋아요 등록
      like.push(user.email);
    }
    setPost({
      ...post,
      like,
    });

    // 요청 보낼 url
    const url = `/api/like/${post._id}`;
    // post 방식 요청
    const res = await axios.post(url, { like });

    if (res.status === 200) {
      // 요청 성공 시
      // setPost({ ...post, like: res.data.like });

      // (juhyun-noh) 알림 저장
      // 좋아요 저장을 했으면
      if (res.data.create) {
        // 알림 보내기
        await axios.get(`/api/notification/${post._id}/${user._id}`);
      }
    } else {
      // 좋아요 or 협업해요 실패 시
      // 초기화
      setPost(post);
    }
  };

  // 눌려있는지 체크
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    // 좋아요 눌렀었는지 판별
    setIsLiked(post.like.includes(user.email));
  }, [post, user]);

  // image preload
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // image url
    const images = post.isWezzle
      ? [
          "/images/postPage/post_together_sel.png",
          "/images/postPage/post_together.png",
        ]
      : [
          "/images/postPage/post_like_sel.png",
          "/images/postPage/post_like.png",
        ];
    images.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    // 로드 완료
    setLoaded(true);
  }, [post.isWezzle]);

  return (
    loaded && (
      <button
        className={
          isLiked ? "PostLikeButton PostLikedButton" : "PostLikeButton"
        }
        onClick={onClickLike}
      >
        {post.isWezzle ? (
          <>
            <img
              src={
                isLiked
                  ? "/images/postPage/post_together_sel.png"
                  : "/images/postPage/post_together.png"
              }
              alt="likebutton"
            />
            {"협업해요"}
          </>
        ) : (
          <>
            <img
              src={
                isLiked
                  ? "/images/postPage/post_like_sel.png"
                  : "/images/postPage/post_like.png"
              }
              alt="likebutton"
            />
            {"좋아요"}
          </>
        )}
      </button>
    )
  );
}

export default LikeTogetherButton;
