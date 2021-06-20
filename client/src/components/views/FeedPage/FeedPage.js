import React from "react";
import { withRouter } from "react-router";

// Components
import Banner from "./Sections/Banner";
import Posts from "./Sections/Posts";
import Footer from "../Footer/Footer";

// CSS
import "./Sections/FeedPage.css";

// 메인 피드 페이지 (chohadam, 2021-05-31)
// /mezzle or /wezzle
function FeedPage() {
  // wezzle 혹은 mezzle
  const postType = document.location.pathname.match(/wezzle|mezzle/)[0];

  return (
    <main className={"FeedContainer"}>
      {/* 최상단 메인 배너 영역 */}
      <Banner postType={postType} />

      {/* 중앙 게시글 영역 */}
      <Posts postType={postType} />

      {/* 하단 푸터 영역 */}
      <Footer />
    </main>
  );
}

export default withRouter(FeedPage);
