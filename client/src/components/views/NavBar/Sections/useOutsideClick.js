import { useEffect } from "react";

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
