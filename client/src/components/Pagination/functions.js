// 현재 화면에 표시할 게시물 구하기
const getCurrentPosts = (currentPage, postsPerPage, posts) => {
  const endIndex = currentPage * postsPerPage;
  const startIndex = endIndex - postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  return currentPosts;
};

const autoScroll = (location, scrollTargetRef) => {
  // location state가 있고 ref가 있다면
  if (location.state && scrollTargetRef.current) {
    // state에서 scroll을 가져옴
    const { scroll } = location.state;
    // scroll이 true이면 pagination에서 페이지 전환한 것
    if (scroll) {
      // 게시글 상단으로 자동 스크롤 (사용자 편의)
      scrollTargetRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
};

const saveCurrentPage = (location, setCurrentPage) => {
  // 페이지 전환을 한 적이 있다면
  if (location.hash !== "") {
    // 새로고침해도 현재 페이지이도록 설정
    const hashPage = location.hash.substring(1);
    setCurrentPage(Number(hashPage));
  }
};

const pagination = { getCurrentPosts, autoScroll, saveCurrentPage };

export default pagination;
