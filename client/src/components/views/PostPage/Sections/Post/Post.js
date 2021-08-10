import React, { useCallback, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

import PostInfo from "./PostInfo";
import Wezzle from "./Wezzle";
import LikeTogetherButton from "./LikeTogetherButton";
import ShareButton from "./ShareButton";
import Loading from "../../../../Loading/Loading";
import PreviewImages from "../../../../Preview/PreviewImages";
import ShowImage from "../../../../Preview/ShowImage";

// CSS
import "./Post.css";

function Post({ post, setPost }) {
  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  const [isLoading, setIsLoading] = useState(false);

  // 현재 포스트 가져오기
  const getPost = useCallback(async () => {
    // 로딩 중
    setIsLoading(true);

    // 현재 주소 (postId값을 얻기 위함)
    // post/postid
    const url = document.location.pathname
      .replace(/mezzle|wezzle/, "")
      .substring(2);

    // get 방식으로 요청
    const res = await axios.get(`/api/${url}`);
    // 받아오기에 성공했다면
    if (res.status === 200) {
      // 포스트 셋팅
      setPost(res.data.post);
    }

    // 로딩 종료
    setIsLoading(false);
  }, [setPost]);

  // componentDidmount
  useEffect(() => {
    const fetchData = async () => {
      // 현 포스트 가져오기
      await getPost();
    };
    fetchData();
  }, [getPost]);

  const [isRemovedPost, setIsRemovedPost] = useState(false);
  // 게시글 삭제 버튼 클릭시
  const onRemovePost = async (e) => {
    // 게시글 삭제 확인
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      // 취소 선택 시 게시글을 지우지 않음 (함수 종료)
      return;
    }

    // 삭제 요청
    const res = await axios.delete(`/api/post/${post._id}`);

    // 삭제 성공 시
    if (res.status === 200) {
      window.alert("게시글이 삭제되었습니다.");
      setIsRemovedPost(true);
    }
  };

  // 수정
  const history = useHistory();
  const onEditPost = (e) => {
    history.push({
      pathname: `/${post.isWezzle ? "wezzle" : "mezzle"}/write`,
      state: { isEdit: true, post },
    });
  };

  // 이미지 모달 보기
  const [showImage, setShowImage] = useState("");

  return (
    post &&
    (isRemovedPost ? (
      // 게시글 삭제 시 피드로 redirect
      // 피드 업데이트를 위해 post id를 넘겨줌
      <Redirect
        to={{
          pathname: `/${post.isWezzle ? "wezzle" : "mezzle"}`,
          state: { postId: post._id },
        }}
      />
    ) : (
      <section className="PostContainer">
        {/* 로딩 중이라면 모달 띄우기 */}
        {isLoading && <Loading />}

        {/* 상단 글쓴이 정보, 게시글 좋아요, 댓글 정보 */}
        <article className="PostTopContents">
          {/* 글쓴이 정보 */}
          <div className="PostUser">
            {/* 프로필 사진 (null이면 탈퇴한 사용자) */}
            {post.user.profileImage ? (
              <img src={post.user.profileImage} alt="profile" />
            ) : (
              <img src="/images/default/profile/1.png" alt="profile" />
            )}
            {/* 이름, 게시날짜 */}
            <div className="PostUserText">
              {/* _id null이면 탈퇴한 사용자 */}
              {post.user._id ? (
                <Link to={`/users/${post.user.email}`} className="PostUserName">
                  {post.user.name}
                </Link>
              ) : (
                // 탈퇴한 사용자
                // name: (탈퇴한 사용자)
                <Link className="PostUserName">{post.user.name}</Link>
              )}
              <span>{post.createdAt.slice(0, 10)}</span>
            </div>
          </div>

          {/* 좋아요, 댓글 */}
          <ul className="PostInfo">
            <PostInfo
              infoName={post.isWezzle ? "협업해요" : "좋아요"}
              info={post.like.length}
            />
            <PostInfo infoName={"댓글"} info={post.commentCount} />
          </ul>
        </article>

        {/* 실제 본문 내용 */}
        <article className="PostMainContents">
          <div className="PostTitleContainer">
            <span className="PostTitle">{post.title}</span>
            {/* 게시글 수정, 삭제 버튼 작성자여야 보이기 */}
            {user !== undefined && user._id === post.user._id && (
              <div className="PostControl">
                <button onClick={onEditPost}>수정하기</button>
                <button onClick={onRemovePost}>
                  <img src="/images/postPage/post_delete.png" alt="delete" />
                </button>
              </div>
            )}
          </div>

          {/* 위즐일 때 협업 관련 내용 */}
          {post.isWezzle && (
            <Wezzle
              period={post.recruit.period}
              field={post.recruit.field}
              peopleNum={post.recruit.peopleNum}
              projectPeriod={post.projectPeriod}
            />
          )}

          {/* 글 내용 */}
          <span className="PostMainText">{post.contents.text}</span>

          {/* 이미지 있다면 */}
          <div className="PostContentsImage">
            {post.contents.images.length !== 0 && (
              <PreviewImages
                images={post.contents.images}
                setShowImage={setShowImage}
              />
            )}
            {/* 이미지 모달 */}
            {showImage && (
              <ShowImage src={showImage} setShowImage={setShowImage} />
            )}
          </div>

          {/* 좋아요, 공유 버튼 */}
          <div className="PostLikeShareContainer">
            {/* 좋아요 버튼 */}
            <LikeTogetherButton setPost={setPost} post={post} />
            {/* 공유 버튼 */}
            <ShareButton />
          </div>
        </article>
      </section>
    ))
  );
}

export default Post;
