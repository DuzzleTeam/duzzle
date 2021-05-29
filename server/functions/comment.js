const { getUser } = require("./auth");

const setCommentUser = async (comment) => {
  // user 정보 가져오기
  const user = await getUser(comment.user);

  // user 정보를 포함한 새로운 comment 객체
  const newComment = {
    ...comment._doc,
    user,
  };

  // user 정보 포함 댓글 리턴
  return newComment;
};

module.exports = { setCommentUser };
