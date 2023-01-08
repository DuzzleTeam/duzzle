import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import pagination from "../../../Pagination/functions";

import Pagination from "../../../Pagination/Pagination";
import Post from "../../../Feed/Post";
import NonePosts from "../../../Feed/NonePosts";
import Loading from "../../../Loading/Loading";

import "./Posts.css";

const DEVELOPMENT = 0;
const DESIGN = 1;

const cache = {};
const fields = ["개발", "디자인"];

const WezzleCategorySelector = ({ postType, currentField, onButtonFieldClick }) => (
  <div className="PostsCategory">
    {postType === "wezzle" &&
      fields.map((field, index) => (
        <button
          key={field}
          className={index === currentField ? "ActivePostsCategory" : ""}
          onClick={() => onButtonFieldClick(field)}
        >
          {field}
        </button>
      ))}
  </div>
);

const filterCurrentCategory = (current) =>
  cache["wezzle"].filter((post) => post.recruit.field.includes(fields[current]));

const Posts = ({ postType }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentField, setCurrentField] = useState(DEVELOPMENT);
  // const dispatch = useDispatch();
  const newPost = useSelector((state) => state.post.newPostPayload);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollTargetRef = useRef();
  const location = useLocation();
  const history = useHistory();

  const postsPerPage = 12;

  const onButtonFieldClick = (field) => {
    if (field !== fields[currentField]) {
      if (field === "개발") {
        setCurrentField(DEVELOPMENT);
      } else {
        setCurrentField(DESIGN);
      }
    }
  };

  const getPosts = useCallback(async () => {
    if (!cache[postType]) {
      const url = `/api/${postType}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        cache[postType] = res.data.posts;
      }
    }
    return postType === "wezzle" ? filterCurrentCategory(currentField) : cache[postType];
  }, [postType, currentField]);

  useEffect(() => {
    (async () => {
      setCurrentPage(1);
      setIsLoading(true);
      const newPosts = await getPosts();
      setIsLoading(false);
      setPosts(newPosts);
    })();
  }, [getPosts]);

  // const onRefresh = async (e) => {
  //   cache[postType] = null;
  //   await getPosts();
  // };

  useEffect(() => {
    if (newPost && cache[postType]) {
      // const { post } = newPost;

      // const newPosts = [post, ...cache[postType]];
      // cache[postType] = newPosts;
      // setPosts(newPosts);

      // // redux reset
      // dispatch(updatedPost());
      window.location.reload();
    }
  }, [newPost, postType]);

  const onRemovePost = useCallback(
    (postId) => {
      const filteredPosts = cache[postType].filter((post) => post._id !== postId);
      cache[postType] = filteredPosts;
      setPosts(filteredPosts);
    },
    [postType]
  );

  useEffect(() => {
    if (location.state && cache[postType]) {
      // 게시글 삭제 시 postId가 넘어옴
      const { postId } = location.state;
      onRemovePost(postId);
    }
  }, [location, postType, onRemovePost]);

  useEffect(() => {
    pagination.autoScroll(location, scrollTargetRef);
    // 페이지 전환을 한 적이 있다면
    pagination.saveCurrentPage(location, setCurrentPage);
  }, [location]);

  const onWriteButtonClick = (e) => {
    history.push(`/${postType}/write`);
  };

  return (
    <section ref={scrollTargetRef} className={"FeedPostsContainer"}>
      {isLoading && <Loading />}

      <div className="FeedButtons">
        <WezzleCategorySelector
          postType={postType}
          currentField={currentField}
          onButtonFieldClick={onButtonFieldClick}
        />

        <div className="PostsRightButtons">
          {/* <button
            className="ButtonRefresh"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <img src="/images/feedPage/refresh.png" alt="refresh" />
          </button> */}
          <button className="ButtonWritePost" onClick={onWriteButtonClick}>
            <img src="/images/feedPage/post_write.png" alt="write" />
            {"글 작성"}
          </button>
        </div>
      </div>

      {posts.length !== 0 ? (
        <>
          <div className="PostsPostContainer">
            {pagination.getCurrentPosts(currentPage, postsPerPage, posts).map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <NonePosts type={postType} />
      )}
    </section>
  );
};

export default Posts;
