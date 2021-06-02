import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./MyPost.css";

function MyPost(props) {
  const [isPost, setIsPost] = useState(props.isPost);

  // 보고있는 마이페이지 유저의 포스트 정보
  const [post, setPost] = useState();
  const myPageEmail = window.location.href.substr(28);
  useEffect(() => {
    const fetchData = async () => {
      const post = await axios.get(`/api/users/post/${myPageEmail}`);
      setPost(post.data.postInfo);
    };
    fetchData();
    console.log(post);
  }, [myPageEmail]);

  return <div></div>;
}

export default withRouter(MyPost);
