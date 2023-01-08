import React from "react";
import { withRouter } from "react-router";

import Banner from "./Sections/Banner";
import Posts from "./Sections/Posts";
import Footer from "../Footer/Footer";

import "./Sections/FeedPage.css";

function FeedPage() {
  const postType = document.location.pathname.match(/wezzle|mezzle/)[0];

  return (
    <main className={"FeedContainer"}>
      <Banner postType={postType} />
      <Posts postType={postType} />
      <Footer />
    </main>
  );
}

export default withRouter(FeedPage);
