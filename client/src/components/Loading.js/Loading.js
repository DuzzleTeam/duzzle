import React from "react";

// CSS
import "./Loading.css";

function Loading() {
  return (
    // 화면 전체 컨테이너
    <div className={"LoadingModal"}>
      {/* 가운데 정렬해서 보여줄 컨텐츠 부분 */}
      <div className="LoadingContents">
        {/* 로딩 이미지 */}
        <img src="/images/loading.png" alt="loading" />
      </div>
    </div>
  );
}

export default Loading;
