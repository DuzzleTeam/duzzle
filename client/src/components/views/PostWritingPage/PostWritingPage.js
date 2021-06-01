import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import "../../../utils/Common.css";
import "./Sections/PostWritingPage.css";

function PostWritingPage() {
  /* post의 제목, 내용, 이미지, 파일 (공통 항목) */
  const [inputContents, setInputContents] = useState({
    title: "",
    contents: { text: "", images: [], files: [] },
  });

  /* 모집 인원 */
  const [inputPeopleNum, setInputPeopleNum] = useState(0);

  /* 모집분야 */
  const [inputField, setInputField] = useState({ field: ["", "디자인"] });

  /* 모집 기간, 프로젝트 예상 기간 */
  const [inputPeriods, setInputPeriods] = useState({
    period: ["", "", "", "", "", ""],
    projectPeriod: ["", "", "", "", "", "", "미정"],
  });

  /* 업로드 버튼 활성화 및 비활성화 상태 */
  const [isActive, setIsActive] = useState(false);

  /* Wezzle인지 Mezzle인지 */
  const currentPageMenu = document.location.pathname.match(/wezzle|mezzle/);
  let isWezzle = false;
  if (currentPageMenu[0] === "wezzle") isWezzle = true;

  /* 공통 항목 (제목,내용,이미지,파일) state 변경 */
  const onChangeCommon = (e) => {
    if (e.target.id === "text") {
      setInputContents({
        ...inputContents,
        contents: { [e.target.id]: e.target.value },
      });
    } else if (e.target.id === "images" || e.target.id === "files") {
      setInputContents({
        ...inputContents,
        contents: { [e.target.id]: [...this, e.target.value] },
      });
    } else {
      setInputContents({
        ...inputContents,
        [e.target.id]: e.target.value,
      });
    }
  };

  /* 기간 state 변경 */
  const onChangePeriod = (e) => {
    if (e.target.id === "period") {
      let periodArr = inputPeriods.period;
      periodArr[e.target.name] = e.target.value;
      setInputPeriods({
        ...inputPeriods,
        [e.target.id]: periodArr,
      });
    } else if (parseInt(e.target.name) <= 5) {
      let projectPeriodArr = inputPeriods.projectPeriod;
      projectPeriodArr[e.target.name] = e.target.value;
      projectPeriodArr[6] = "";
      setInputPeriods({
        ...inputPeriods,
        [e.target.id]: projectPeriodArr,
      });
    } else if (e.target.name === "6") {
      let projectPeriodArr = ["", "", "", "", "", "", "미정"];
      setInputPeriods({
        ...inputPeriods,
        [e.target.id]: projectPeriodArr,
      });
    }
  };

  /* 모집분야 state 변경 */
  const onChangeField = (e) => {
    if (parseInt(e.target.id.replace("field", "")) === 0) {
      let fieldArr = inputField.field;
      fieldArr[0] = fieldArr[0] ? "" : "개발";
      setInputField({ field: fieldArr });
      console.log(inputField, inputField.field);
    } else if (parseInt(e.target.id.replace("field", "")) === 1) {
      let fieldArr = inputField.field;
      fieldArr[1] = fieldArr[1] ? "" : "디자인";
      setInputField({ field: fieldArr });
      console.log(inputField, inputField.field[1]);
    }
  };

  /* 모집 인원 state 변경 */
  const onChangePeopleNumMinus = (e) => {
    e.preventDefault();
    if (inputPeopleNum > 0) {
      setInputPeopleNum((prev) => prev - 1);
    }
  };
  const onChangePeopleNumPlus = (e) => {
    e.preventDefault();
    setInputPeopleNum((prev) => prev + 1);
  };

  /* 업로드 버튼 활성화를 위한 (모든 내용이 작성되어 있으면 활성화) */
  let now = new Date();
  useEffect(() => {
    if (isWezzle) {
      // Wezzle일때
      let nowDay = Number(now.getFullYear() + now.getMonth() + now.getDate());
      let startPeriod = Number(
        inputPeriods.period[0] + inputPeriods.period[1] + inputPeriods.period[2]
      );
      let endPeriod = Number(
        inputPeriods.period[3] + inputPeriods.period[4] + inputPeriods.period[5]
      );
      let startProjectPeriod = Number(
        inputPeriods.projectPeriod[0] +
          inputPeriods.projectPeriod[1] +
          inputPeriods.projectPeriod[2]
      );
      let endProjectPeriod = Number(
        inputPeriods.projectPeriod[3] +
          inputPeriods.projectPeriod[4] +
          inputPeriods.projectPeriod[5]
      );
      console.log(
        inputPeriods.projectPeriod[6] === "미정" ||
          (startProjectPeriod >= nowDay &&
            endProjectPeriod >= startProjectPeriod)
      );
      if (
        // 제목, 내용, 모집기간, 모집분야, 모집인원, 프로젝트예상기간에 값이 들어가 있을 경우
        String(inputContents.title) !== "" &&
        String(inputContents.contents.text) !== "" &&
        inputPeopleNum > 0 &&
        inputPeriods.period.indexOf("") === -1 &&
        startPeriod >= nowDay &&
        endPeriod >= startPeriod &&
        (inputPeriods.projectPeriod[6] === "미정" ||
          (startProjectPeriod >= nowDay &&
            endProjectPeriod >= startProjectPeriod))
      ) {
        // isActive가 true -> 버튼 활성화
        setIsActive(true);
      } else {
        // 제목 입력 값 삭제 시 다시 비활성화 (isActive가 false -> 버튼 비활성화)
        setIsActive(false);
      }
    } else {
      // Mezzle일때
      if (
        // 제목과 내용에 값이 들어가 있을 경우
        String(inputContents.title) !== "" &&
        String(inputContents.contents.text) !== ""
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [inputContents, inputPeopleNum, inputPeriods]);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    let body = {
      title: inputContents.title,
      contents: {
        text: inputContents.contents.text,
        images: inputContents.contents.images,
        files: inputContents.contents.files,
      },
      isWezzle: isWezzle,
    };

    if (isWezzle) {
      body = {
        ...body,
        recruit: {
          period: inputPeriods.period,
          field: inputField.field,
          peopleNum: inputPeopleNum.peopleNum,
        },
        projectPeriod: inputPeriods.projectPeriod,
      };
    }

    axios.post(`/api/${currentPageMenu}/write`, body).then((res) => {
      if (res.data.createPostSuccess) {
        setInputContents({
          title: "",
          contents: { text: "" },
        });
        setInputPeopleNum(0);
      } else {
        alert("게시글 작성에 실패하였습니다.");
      }
    });
  };

  return (
    <div id="PageContainer">
      <main className="PostWritingPage">
        <div className="FormContentsContainer">
          <form onSubmit={handlePostSubmit} method="post">
            <div className="TopContainer">
              <input
                type="text"
                id="title"
                placeholder="제목"
                defaultValue={inputContents.title}
                onChange={onChangeCommon}
                className="InputTitle"
              />
              {/* isActive가 false일 때 버튼 비활성화(disabled=true) */}
              <div className="UploadButtonContainer">
                <button
                  type="submit"
                  value="submit"
                  disabled={isActive ? false : true}
                  className="UploadButton"
                >
                  업로드
                </button>
              </div>
            </div>

            <div className="LineContainer">
              <hr className="Line" />
            </div>

            {/* wezzle 일때만 보임 */}
            {isWezzle ? (
              <div className="IsWezzleContainer">
                <div className="Container">
                  <label className="KeyLable">모집기간</label>
                  <span className="PeriodOutline">
                    <input
                      maxLength="4"
                      id="period"
                      name="0"
                      defaultValue={inputPeriods.period[0]}
                      onChange={onChangePeriod}
                      className="InputPeriodYear"
                    />
                    <label>년</label>
                    <input
                      maxLength="2"
                      id="period"
                      name="1"
                      defaultValue={inputPeriods.period[1]}
                      onChange={onChangePeriod}
                      className="InputPeriodMD"
                    />
                    <label>월</label>
                    <input
                      maxLength="2"
                      id="period"
                      name="2"
                      defaultValue={inputPeriods.period[2]}
                      onChange={onChangePeriod}
                      className="InputPeriodMD"
                    />
                    <label>일</label>
                  </span>
                  <span> - </span>
                  <span className="PeriodOutline">
                    <input
                      maxLength="4"
                      id="period"
                      name="3"
                      defaultValue={inputPeriods.period[3]}
                      onChange={onChangePeriod}
                      className="InputPeriodYear"
                    />
                    <label>년</label>
                    <input
                      maxLength="2"
                      id="period"
                      name="4"
                      defaultValue={inputPeriods.period[4]}
                      onChange={onChangePeriod}
                      className="InputPeriodMD"
                    />
                    <label>월</label>
                    <input
                      maxLength="2"
                      id="period"
                      name="5"
                      defaultValue={inputPeriods.period[5]}
                      onChange={onChangePeriod}
                      className="InputPeriodMD"
                    />
                    <label>일</label>
                  </span>
                </div>

                <div className="Container">
                  <label className="KeyLable">모집분야</label>

                  <input
                    type="checkbox"
                    id="field0"
                    name="field"
                    checked={inputField.field[0] ? true : false}
                    onChange={onChangeField}
                  />
                  <label htmlFor="field0"></label>
                  <label>개발</label>

                  <input
                    type="checkbox"
                    id="field1"
                    name="field"
                    checked={inputField.field[1] ? true : false}
                    onChange={onChangeField}
                  />
                  <label htmlFor="field1"></label>
                  <label>디자인</label>
                </div>

                <div className="Container">
                  <label className="KeyLable">모집인원</label>
                  <span className="PeopleNumOutline">
                    <button
                      onClick={onChangePeopleNumMinus}
                      id="peopleNum"
                      className="PeopleNumButton"
                    >
                      -
                    </button>
                    <span className="PeopleNumText">{inputPeopleNum}</span>
                    <button
                      onClick={onChangePeopleNumPlus}
                      id="peopleNum"
                      className="PeopleNumButton"
                    >
                      +
                    </button>
                  </span>
                </div>

                <div className="Container">
                  <label className="KeyLable">프로젝트 예상 기간</label>
                  <span className="PeriodOutline">
                    <input
                      maxLength="4"
                      id="projectPeriod"
                      name="0"
                      defaultValue={inputPeriods.projectPeriod[0]}
                      onChange={onChangePeriod}
                      className="InputPeriodYear"
                    />
                    <label>년</label>
                    <input
                      maxLength="2"
                      id="projectPeriod"
                      name="1"
                      defaultValue={inputPeriods.projectPeriod[1]}
                      onChange={onChangePeriod}
                      className="InputPeriodMD"
                    />
                    <label>월</label>
                    <input
                      maxLength="2"
                      id="projectPeriod"
                      name="2"
                      defaultValue={inputPeriods.projectPeriod[2]}
                      onChange={onChangePeriod}
                      className="InputPeriodMD"
                    />
                    <label>일</label>
                  </span>
                  <span> - </span>
                  <span className="PeriodOutline">
                    <input
                      maxLength="4"
                      id="projectPeriod"
                      name="3"
                      defaultValue={inputPeriods.projectPeriod[3]}
                      onChange={onChangePeriod}
                      className="InputPeriodYear"
                    />
                    <label>년</label>
                    <input
                      maxLength="2"
                      id="projectPeriod"
                      name="4"
                      defaultValue={inputPeriods.projectPeriod[4]}
                      onChange={onChangePeriod}
                      className="InputPeriodMD"
                    />
                    <label>월</label>
                    <input
                      maxLength="2"
                      id="projectPeriod"
                      name="5"
                      defaultValue={inputPeriods.projectPeriod[5]}
                      onChange={onChangePeriod}
                      className="InputPeriodMD"
                    />
                    <label>일</label>
                  </span>
                  <input
                    type="checkbox"
                    id="projectPeriod"
                    name="6"
                    checked={inputPeriods.projectPeriod[6] ? true : false}
                    onChange={onChangePeriod}
                  />
                  <label for="6"></label>
                  <label>미정</label>
                </div>

                <div className="LineContainer">
                  <hr className="Line" />
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="Container">
              <input
                type="file"
                id="images"
                accept="image/png,image/jpeg"
                defaultValue={inputContents.contents.images}
              />
            </div>

            <div className="Container">
              <textarea
                rows="7"
                cols="80"
                id="text"
                defaultValue={inputContents.contents.text}
                onChange={onChangeCommon}
                placeholder={
                  isWezzle
                    ? "프로젝트에 대한 설명과 합류 시 담당하게 될 업무에 대해 자세히 작성해주세요!"
                    : "친구들과 나누고 싶은 이야기를 자유롭게 작성해주세요!"
                }
                className="TextArea"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withRouter(PostWritingPage);
