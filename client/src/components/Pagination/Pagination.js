import React, { useMemo } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Pagination.css";

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const Pagination = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
  const history = useHistory();
  const lastPage = useMemo(() => Math.ceil(totalPosts / postsPerPage), [totalPosts, postsPerPage]);

  const onNextClick = (_e) => {
    setCurrentPage(currentPage + 1);

    history.push({
      hash: `#${currentPage + 1}`,
      state: { scroll: true },
    });
  };

  const onClickChangePage = (pageNum) => {
    if (pageNum === 0) {
      return;
    }
    setCurrentPage(pageNum);
    history.push({
      hash: `#${pageNum}`,
      state: { scroll: true },
    });
  };

  return (
    <div className={"Pagination"}>
      <button className="ButtonArrow" onClick={() => onClickChangePage(currentPage - 1)} disabled={currentPage === 1}>
        <img
          src={currentPage === 1 ? "/images/feedPage/left_arrow_disabled.png" : "/images/feedPage/left_arrow.png"}
          alt="previous"
        />
      </button>

      {[...range(1, lastPage)].map((number) => (
        <span
          key={number}
          className={"PaginationNumber " + (number === currentPage ? "ActivePaginationNumber" : "")}
          onClick={currentPage !== number ? () => setCurrentPage(number) : undefined}
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

      <button className="ButtonArrow" onClick={onNextClick} disabled={currentPage === lastPage}>
        <img
          src={
            currentPage === lastPage ? "/images/feedPage/right_arrow_disabled.png" : "/images/feedPage/right_arrow.png"
          }
          alt="next"
        />
      </button>
    </div>
  );
};

export default Pagination;
