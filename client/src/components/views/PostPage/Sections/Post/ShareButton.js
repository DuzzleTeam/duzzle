import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import "./ShareButton.css";

function ShareButton() {
  const sharePostButtonRef = useRef();

  // 게시글 공유
  const onSharePost = (e) => {
    // 현 게시글 url
    const url = window.location.href;
    // 클립보드에 복사
    window.navigator.clipboard.writeText(url);

    // 토스트 메시지 출력
    toast.success("🔗 링크가 클립보드에 복사되었습니다!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // image preload
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // 공유 아이콘 회색, 흰색
    const images = [
      "/images/postPage/post_share_hover.png",
      "/images/postPage/post_share.png",
    ];

    images.forEach((src) => (new Image().src = src));

    // 로드된다면 렌더링
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <button
        className={"ButtonSharePost"}
        onClick={onSharePost}
        onMouseOver={() =>
          (sharePostButtonRef.current.src =
            "/images/postPage/post_share_hover.png")
        }
        onMouseOut={() =>
          (sharePostButtonRef.current.src = "/images/postPage/post_share.png")
        }
      >
        <img
          ref={sharePostButtonRef}
          src="/images/postPage/post_share.png"
          alt="sharebutton"
        />
        공유하기
      </button>
    )
  );
}

export default ShareButton;
