import React from "react";

import "./WriteWezzle.css";

function WriteWezzle({
  period,
  setPeriod,
  field,
  setField,
  peopleNum,
  setPeopleNum,
  projectPeriod,
  setProjectPeriod,
}) {
  // 다연 위즐
  /* 기간 state 변경 */
  const onChangePeriod = (e) => {
    if (e.target.id === "period") {
      const periodArr = period.slice();
      periodArr[e.target.name] = e.target.value;
      setPeriod(periodArr);
    } else if (parseInt(e.target.name) <= 5) {
      const projectPeriodArr = projectPeriod.slice();
      projectPeriodArr[e.target.name] = e.target.value;
      projectPeriodArr[6] = "";
      setProjectPeriod(projectPeriodArr);
    }
  };

  /* 모집분야 state 변경 */
  const onChangeField = (e) => {
    const fieldArr = field.slice();
    if (parseInt(e.target.id.replace("field", "")) === 0) {
      fieldArr[0] = fieldArr[0] ? "" : "개발";
    } else if (parseInt(e.target.id.replace("field", "")) === 1) {
      fieldArr[1] = fieldArr[1] ? "" : "디자인";
    }
    setField(fieldArr);
  };

  /* 모집 인원 state 변경 */
  const onChangePeopleNumMinus = (e) => {
    e.preventDefault();
    if (peopleNum > 0) {
      setPeopleNum((prev) => prev - 1);
    }
  };
  const onChangePeopleNumPlus = (e) => {
    e.preventDefault();
    setPeopleNum((prev) => prev + 1);
  };

  return (
    <section className={"write-form__section--wezzle"}>
      <ul className={"write-form__list-container"}>
        <li>
          <label className="KeyLable">모집기간</label>
          <span className="PeriodOutline">
            <input
              maxLength="4"
              id="period"
              name="0"
              defaultValue={period[0]}
              onChange={onChangePeriod}
              className="InputPeriodYear"
            />
            <label>년</label>
            <input
              maxLength="2"
              id="period"
              name="1"
              defaultValue={period[1]}
              onChange={onChangePeriod}
              className="InputPeriodMD"
            />
            <label>월</label>
            <input
              maxLength="2"
              id="period"
              name="2"
              defaultValue={period[2]}
              onChange={onChangePeriod}
              className="InputPeriodMD"
            />
            <label>일</label>
          </span>
          <span className="ForSpaceSpan"> - </span>
          <span className="PeriodOutline">
            <input
              maxLength="4"
              id="period"
              name="3"
              defaultValue={period[3]}
              onChange={onChangePeriod}
              className="InputPeriodYear"
            />
            <label>년</label>
            <input
              maxLength="2"
              id="period"
              name="4"
              defaultValue={period[4]}
              onChange={onChangePeriod}
              className="InputPeriodMD"
            />
            <label>월</label>
            <input
              maxLength="2"
              id="period"
              name="5"
              defaultValue={period[5]}
              onChange={onChangePeriod}
              className="InputPeriodMD"
            />
            <label>일</label>
          </span>
        </li>
        <li>
          <label className="KeyLable">모집분야</label>

          <input
            type="checkbox"
            id="field0"
            name="field"
            checked={field[0] ? true : false}
            onChange={onChangeField}
            className="PostWirtingCheckbox"
          />
          <label htmlFor="field0">
            {field[0] && <img src="/images/checkbox.png" alt="checked" />}
          </label>
          <label className="ForSpaceLabel">개발</label>

          <input
            type="checkbox"
            id="field1"
            name="field"
            checked={field[1] ? true : false}
            onChange={onChangeField}
            className="PostWirtingCheckbox"
          />
          <label htmlFor="field1">
            {field[1] && <img src="/images/checkbox.png" alt="checked" />}
          </label>
          <label className="ForSpaceLabel">디자인</label>
        </li>
        <li>
          <label className="KeyLable">모집인원</label>
          <span className="PeopleNumOutline">
            <button
              onClick={onChangePeopleNumMinus}
              id="peopleNum"
              className="PeopleNumButton"
            >
              -
            </button>
            <span className="PeopleNumText">{peopleNum}</span>
            <button
              onClick={onChangePeopleNumPlus}
              id="peopleNum"
              className="PeopleNumButton"
            >
              +
            </button>
          </span>
        </li>
        <li>
          <label className="KeyLable">프로젝트 예상 기간</label>
          <span className="PeriodOutline">
            <input
              maxLength="4"
              id="projectPeriod"
              name="0"
              defaultValue={projectPeriod[0]}
              onChange={onChangePeriod}
              className="InputPeriodYear"
            />
            <label>년</label>
            <input
              maxLength="2"
              id="projectPeriod"
              name="1"
              defaultValue={projectPeriod[1]}
              onChange={onChangePeriod}
              className="InputPeriodMD"
            />
            <label>월</label>
            <input
              maxLength="2"
              id="projectPeriod"
              name="2"
              defaultValue={projectPeriod[2]}
              onChange={onChangePeriod}
              className="InputPeriodMD"
            />
            <label>일</label>
          </span>
          <span className="ForSpaceSpan"> - </span>
          <span className="PeriodOutline">
            <input
              maxLength="4"
              id="projectPeriod"
              name="3"
              defaultValue={projectPeriod[3]}
              onChange={onChangePeriod}
              className="InputPeriodYear"
            />
            <label>년</label>
            <input
              maxLength="2"
              id="projectPeriod"
              name="4"
              defaultValue={projectPeriod[4]}
              onChange={onChangePeriod}
              className="InputPeriodMD"
            />
            <label>월</label>
            <input
              maxLength="2"
              id="projectPeriod"
              name="5"
              defaultValue={projectPeriod[5]}
              onChange={onChangePeriod}
              className="InputPeriodMD"
            />
            <label>일</label>
          </span>
          <div className="checkbox">
            <input
              type="checkbox"
              id="projectPeriod"
              name="6"
              checked={projectPeriod[6] === "미정" ? true : false}
              onChange={onChangePeriod}
              className="PostWirtingCheckbox"
            />
            <label
              htmlFor="6"
              className="ForSpaceCheckbox"
              onClick={() => {
                const projectPeriodArr = projectPeriod.slice();
                projectPeriodArr[6] = projectPeriod[6] === "미정" ? "" : "미정";
                setProjectPeriod(projectPeriodArr);
              }}
            >
              {projectPeriod[6] === "미정" && (
                <img src={"/images/checkbox.png"} alt={"yet"} />
              )}
            </label>
            <label className="ForSpaceLabel">미정</label>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default WriteWezzle;
