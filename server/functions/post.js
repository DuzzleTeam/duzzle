const { getUser } = require("./auth");

const setPostUser = async (post) => {
  // user 정보 가져오기
  const user = await getUser(post.user);

  // user 정보를 포함한 새로운 post 객체
  const newPost = {
    ...post,
    user,
  };

  // user 정보 포함 댓글 리턴
  return newPost;
};

module.exports = { setPostUser };
