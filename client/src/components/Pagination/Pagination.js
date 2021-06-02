import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// CSS
import "./Pagination.css";

// 하단 게시물 번호
// 전체 페이지 번호 수, 현재 페이지 번호, 현재 페이지 번호 Setter
function Pagination({ postsPerPage, totalPosts, currentPage, setCurrentPage }) {
  // 페이지 번호들을 담음 (ex [1, 2, 3])
  const [numbers, setNumbers] = useState([]);
  // totalIndex가 변하면 실행
  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      // 1부터 전체 페이지 번호 수까지 배열 생성
      numbers.push(i);
    }
    setNumbers(numbers);
  }, [totalPosts, postsPerPage]);

  const history = useHistory();

  const onPreviousClick = (e) => {
    // 이전 페이지 버튼 클릭
    setCurrentPage(currentPage - 1);

    // anchor
    history.push({
      hash: `#${currentPage - 1}`,
      state: { scroll: true },
    });
  };

  const onNextClick = (e) => {
    // 다음 페이지 버튼 클릭
    setCurrentPage(currentPage + 1);

    // anchor
    history.push({
      hash: `#${currentPage + 1}`,
      state: { scroll: true },
    });
  };

  return (
    <div className={"Pagination"}>
      {/* left arrow button */}
      {currentPage === 1 ? (
        // 첫 번째 페이지라면
        <button className="ButtonArrow" disabled>
          <img src="/images/feedPage/left_arrow_disabled.png" alt="disabled" />
        </button>
      ) : (
        // 첫 번째 페이지 외에는 클릭 가능
        <button className="ButtonArrow" onClick={onPreviousClick}>
          <img src="/images/feedPage/left_arrow.png" alt="previous" />
        </button>
      )}

      {/* 페이지 번호들 span에 감싸 반환 */}
      {numbers.map((number) => (
        <span
          key={number}
          // 만약 현재 페이지 번호라면 Active 클래스명 추가
          className={
            number === currentPage
              ? "PaginationNumber ActivePaginationNumber"
              : "PaginationNumber"
          }
          onClick={() => {
            // 현재 페이지면 아무 액션 X
            if (currentPage === number) {
              return;
            }
            // 페이지 설정
            setCurrentPage(number);
          }}
        >
          <Link
            to={{
              state: {
                scroll: true,
              },
              hash: `#${number}`,
            }}
          >
            {number}
          </Link>
        </span>
      ))}

      {/* right arrow button */}
      {currentPage === Math.ceil(totalPosts / postsPerPage) ? (
        // 마지막 페이지라면 클릭 불가
        <button className="ButtonArrow" disabled>
          <img src="/images/feedPage/right_arrow_disabled.png" alt="disabled" />
        </button>
      ) : (
        // 마지막 페이지가 아니라면 클릭 가능
        <button className="ButtonArrow" onClick={onNextClick}>
          <img src="/images/feedPage/right_arrow.png" alt="next" />
        </button>
      )}
    </div>
  );
}

export default Pagination;
