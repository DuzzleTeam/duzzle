// 1, 2, 3, 4, 5 중 랜덤하게 하나의 숫자를 리턴함
// 기본 이미지를 설정
const getRandomNumber = (N = 5) => {
  // 0 이상 1 미만 난수 * 5 => 0 이상 5 미만
  // + 1 => 1 이상 6 미만
  // parseInt => 1 이상 5 이하 정수
  const number = parseInt(Math.random() * N + 1);
  return number;
};

export default getRandomNumber;
