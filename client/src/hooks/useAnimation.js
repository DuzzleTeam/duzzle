import { useEffect, useRef } from "react";

// effect
// {
//  opacity: true | false,
//  transform: '변화'
// }
const useAnimation = (effect, duration = 3, delay = 0) => {
  // ref랑 기본 style 리턴
  // 콜백 함수 리턴 (실행 시 애니메이션 start)
  const element = useRef();

  const onStartAnimation = () => {
    const { current } = element;
    if (effect.opacity) {
      current.style.opacity = 1;
    }
    if (effect.transform !== "") {
      current.style.transform = `translate(0)`;
    }
    current.style.transition = `all ${duration}s ease-out ${delay}s`;
  };

  const event = new CustomEvent("animation");
  useEffect(() => {
    document.addEventListener("animation", onStartAnimation);

    return () => document.removeEventListener("animation", onStartAnimation);
  }, []);

  const onStart = () => {
    document.dispatchEvent(event);
  };

  const style = {
    ...(effect.opacity && { opacity: 0 }),
    ...(effect.transform && { transform: effect.transform }),
  };

  const resetStyle = () => {
    // reset style
    const originalStyle = JSON.stringify(style).replace(/{|}|"/g, "");
    element.current.style = originalStyle;
  };
  return [{ ref: element, style }, onStart, resetStyle];
};

export default useAnimation;
