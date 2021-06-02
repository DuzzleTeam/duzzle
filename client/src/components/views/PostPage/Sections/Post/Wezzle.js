import React from "react";

// CSS
import "./Wezzle.css";

function Wezzle({ period, field, peopleNum, projectPeriod }) {
  // 프로젝트 모집 기간, 프로젝트 예상 기간 템플릿
  const periodTemplate = (period) => {
    const [start, end] = period.split("-");
    const $start = <span>{dateTemplate(start)}</span>;
    const $end = <span>{dateTemplate(end)}</span>;

    return (
      <span className={"PostTextPeriod"}>
        {$start} - {$end}
      </span>
    );
  };
  // 날짜 템플릿 (yyyy년 mm월 dd일)
  const dateTemplate = (date) => {
    return `${date.substring(0, 4)}년 ${date.substring(
      4,
      6
    )}월 ${date.substring(6)}일`;
  };

  // 모집분야 템플릿 (배열을 span 하나씩)
  const fieldTemplate = (field) => {
    return field.map((str, index) => (
      <span className={"WezzleRecruitField"} key={index}>
        {str}
      </span>
    ));
  };

  return (
    <div className={"PostWezzleContainer"}>
      {/* period, field, peopleNum, projectPeriod */}
      <div>
        <span>{"모집기간"}</span>
        {periodTemplate(period)}
      </div>
      <div>
        <span>{"모집분야"}</span>
        {fieldTemplate(field)}
      </div>
      <div>
        <span>{"모집인원"}</span>
        {peopleNum + "명"}
      </div>
      <div>
        <span>{"프로젝트 예상 기간"}</span>
        {periodTemplate(projectPeriod)}
      </div>
    </div>
  );
}

export default Wezzle;
