const { User } = require("../models/User");

// user의 값을 가져오기 (chohadam, 2021-05-25)
// _id, name, email, profileImage
const getUserInfo = async (userId) => {
  // id로 해당 유저 찾기
  const user = await User.findById(userId);

  if (user) {
    // 있다면 정보 리턴
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    };
  } else {
    // 없다면 존재하지 않는 사용자
    return {
      _id: null,
      name: "(없는 사용자)",
      email: null,
      profileImage: null,
    };
  }
};

const getUser = async (userId) => {
  const user = await getUserInfo(userId);
  return user;
};

module.exports = { getUser };
