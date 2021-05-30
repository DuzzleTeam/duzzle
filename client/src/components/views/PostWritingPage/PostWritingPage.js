import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

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
  useEffect(() => {
    if (isWezzle) {
      // Wezzle일때
      if (
        // 제목, 내용, 모집기간, 모집분야, 모집인원, 프로젝트예상기간에 값이 들어가 있을 경우
        String(inputContents.title) !== "" &&
        String(inputContents.contents.text) !== "" &&
        inputPeopleNum.peopleNum > 0
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
  }, [
    inputContents.title,
    inputContents.contents.text,
    inputPeopleNum.peopleNum,
  ]);

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
    <div className="PostWriteContainer">
      <form onSubmit={handlePostSubmit} method="post">
        <div>
          <input
            type="text"
            id="title"
            placeholder="제목"
            defaultValue={inputContents.title}
            onChange={onChangeCommon}
          />
          {/* isActive가 false일 때 버튼 비활성화(disabled=true) */}
          <button
            type="submit"
            value="submit"
            disabled={isActive ? false : true}
          >
            업로드
          </button>
        </div>

        <div>
          <hr />
        </div>

        {/* wezzle 일때만 보임 */}
        {isWezzle ? (
          <div>
            <div>
              <label>모집기간</label>
              <span>
                <input
                  size="4"
                  id="period"
                  name="0"
                  defaultValue={inputPeriods.period[0]}
                  onChange={onChangePeriod}
                />
                <label>년</label>
                <input
                  size="2"
                  id="period"
                  name="1"
                  defaultValue={inputPeriods.period[1]}
                  onChange={onChangePeriod}
                />
                <label>월</label>
                <input
                  size="2"
                  id="period"
                  name="2"
                  defaultValue={inputPeriods.period[2]}
                  onChange={onChangePeriod}
                />
                <label>일</label>
              </span>
              <span> - </span>
              <span>
                <input
                  size="4"
                  id="period"
                  name="3"
                  defaultValue={inputPeriods.period[3]}
                  onChange={onChangePeriod}
                />
                <label>년</label>
                <input
                  size="2"
                  id="period"
                  name="4"
                  defaultValue={inputPeriods.period[4]}
                  onChange={onChangePeriod}
                />
                <label>월</label>
                <input
                  size="2"
                  id="period"
                  name="5"
                  defaultValue={inputPeriods.period[5]}
                  onChange={onChangePeriod}
                />
                <label>일</label>
              </span>
            </div>

            <div>
              <label>모집분야</label>

              <input
                type="checkbox"
                id="field0"
                name="field"
                checked={inputField.field[0] ? true : false}
                onChange={onChangeField}
              />
              <label>개발</label>

              <input
                type="checkbox"
                id="field1"
                name="field"
                checked={inputField.field[1] ? true : false}
                onChange={onChangeField}
              />
              <label>디자인</label>
            </div>

            <div>
              <label>모집인원</label>
              <button onClick={onChangePeopleNumMinus} id="peopleNum">
                -
              </button>
              <span>{inputPeopleNum}</span>
              <button onClick={onChangePeopleNumPlus} id="peopleNum">
                +
              </button>
            </div>

            <div>
              <label>프로젝트 예상 기간</label>
              <span>
                <input
                  size="4"
                  id="projectPeriod"
                  name="0"
                  defaultValue={inputPeriods.projectPeriod[0]}
                  onChange={onChangePeriod}
                />
                <label>년</label>
                <input
                  size="2"
                  id="projectPeriod"
                  name="1"
                  defaultValue={inputPeriods.projectPeriod[1]}
                  onChange={onChangePeriod}
                />
                <label>월</label>
                <input
                  size="2"
                  id="projectPeriod"
                  name="2"
                  defaultValue={inputPeriods.projectPeriod[2]}
                  onChange={onChangePeriod}
                />
                <label>일</label>
              </span>
              <span> - </span>
              <span>
                <input
                  size="4"
                  id="projectPeriod"
                  name="3"
                  defaultValue={inputPeriods.projectPeriod[3]}
                  onChange={onChangePeriod}
                />
                <label>년</label>
                <input
                  size="2"
                  id="projectPeriod"
                  name="4"
                  defaultValue={inputPeriods.projectPeriod[4]}
                  onChange={onChangePeriod}
                />
                <label>월</label>
                <input
                  size="2"
                  id="projectPeriod"
                  name="5"
                  defaultValue={inputPeriods.projectPeriod[5]}
                  onChange={onChangePeriod}
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
              <label>미정</label>
            </div>

            <div>
              <hr />
            </div>
          </div>
        ) : (
          <></>
        )}

        <div>
          <input
            type="file"
            id="images"
            accept="image/png,image/jpeg"
            defaultValue={inputContents.contents.images}
          />
          <input
            type="file"
            id="images"
            accept=".doc, .docx, .xml, .hwp"
            defaultValue={inputContents.contents.files}
          />
        </div>

        <div>
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
          />
        </div>
      </form>
    </div>
  );
}

export default withRouter(PostWritingPage);
