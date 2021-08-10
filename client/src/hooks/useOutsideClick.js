import { useEffect } from "react";

// ref로 지정한 엘리먼트 외 다른 곳을 클릭 시 callback 실행
// (chohadam, 2021-04-02)
const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    // ref.current: 선택하고 싶은 DOM을 가르키게 됨
    // contains(node): node가 하위 항목인지 여부 (자식인지)
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;

// https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661
