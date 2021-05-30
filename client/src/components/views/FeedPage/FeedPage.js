import React from "react";

// Components
import Banner from "./Section/Banner";
import Posts from "./Section/Posts";
import Footer from "../Footer/Footer";

// CSS
import "./Section/FeedPage.css";

// 메인 피드 페이지 (chohadam, 2021-05-31)
// /mezzle or /wezzle
function FeedPage() {
  return (
    <main className={"FeedContainer"}>
      {/* 최상단 메인 배너 영역 */}
      <Banner />

      {/* 중앙 게시글 영역 */}
      <Posts />

      {/* 하단 푸터 영역 */}
      <Footer />
    </main>
  );
}

export default FeedPage;
