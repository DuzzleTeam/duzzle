import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MyPost.css";

function MyPost(props) {
  const dispatch = useDispatch();
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

  const onApplyHandler = (event) => {
    setIsPost(false);
  };
  const onPostHandler = (event) => {
    setIsPost(true);
  };

  const defaultBtn = {
    width: "90px",
    height: "40px",
    marginLeft: "1%",
    marginTop: "2%",
    border: "2px solid #ddd",
    cursor: "pointer",
    borderRadius: "1000px",
    backgroundColor: "white",
    color: "#ddd",
  };
  const selectBtn = {
    backgroundColor: "black",
    color: "white",
    borderRadius: "1000px",
    borderColor: "black",
    width: "90px",
    height: "40px",
    marginLeft: "1%",
    marginTop: "2%",
    cursor: "pointer",
  };

  return (
    <div>
      {isPost ? (
        // 내 게시물 버튼 눌렸을 때
        <div>
          <button
            className="btn apply"
            style={defaultBtn}
            onClick={onApplyHandler}
          >
            <strong>지원목록</strong>
          </button>
          <button
            className="btn post"
            style={selectBtn}
            onClick={onPostHandler}
          >
            <strong>내 게시물</strong>
          </button>
        </div>
      ) : (
        // 지원목록 버튼 눌렸을 때
        <div>
          <button
            className="btn apply"
            style={selectBtn}
            onClick={onApplyHandler}
          >
            <strong>지원목록</strong>
          </button>
          <button
            className="btn post"
            style={defaultBtn}
            onClick={onPostHandler}
          >
            <strong>내 게시물</strong>
          </button>
        </div>
      )}
    </div>
  );
}

export default withRouter(MyPost);
