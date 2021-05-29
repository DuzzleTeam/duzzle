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
  const [peopleNum, setPeopleNum] = useState(0);

  /* 모집분야 */
  const [inputField, setInputField] = useState(["", "", ""]);

  /* 모집 기간, 프로젝트 예상 기간 */
  const [inputPeriods, setInputPeriods] = useState({
    period: {
      start: ["", "", ""],
      end: ["", "", ""],
    },
    projectPeriod: {
      start: ["", "", ""],
      end: ["", "", ""],
      yet: "",
    },
  });

  /* 업로드 버튼 활성화 및 비활성화 상태 */
  const [isActive, setIsActive] = useState(false);

  /* Wezzle인지 Mezzle인지 */
  const currentPageMenu = document.location.pathname.match(/wezzle|mezzle/);
  let isWezzle = false;
  if (currentPageMenu[0] === "wezzle") isWezzle = true;

  /* 공통 항목 (제목,내용,이미지,파일) */
  const onChange = (e) => {
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

  const onChangePeopleNum = (e) => {
    if (e.target.id === "M") {
      if (peopleNum > 0) setPeopleNum(peopleNum - 1);
    } else if (e.target.id === "P") {
      setPeopleNum(peopleNum + 1);
    }
  };

  /* 업로드 버튼 활성화를 위한 (모든 내용이 작성되어 있으면 활성화) */
  useEffect(() => {
    if (isWezzle) {
      // Wezzle일때
      if (
        // 제목, 내용, 모집기간, 모집분야, 모집인원, 프로젝트예상기간에 값이 들어가 있을 경우
        String(inputContents.title) !== "" &&
        String(inputContents.contents.text) !== "" &&
        peopleNum > 0
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
  }, [inputContents.title, inputContents.contents.text, peopleNum]);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const body = {
      title: inputContents.title,
      contents: {
        text: inputContents.contents.text,
        images: inputContents.contents.images,
        files: inputContents.contents.files,
      },
      isWezzle: isWezzle,
      peopleNum: peopleNum,
      if(isWezzle) {},
    };

    axios.post(`/api/${currentPageMenu}/write`, body).then((res) => {
      if (res.data.createPostSuccess) {
        setInputContents({
          title: "",
          contents: { text: "" },
        });
        setPeopleNum(0);
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
            value={inputContents.title}
            onChange={onChange}
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
                <input size="4" value={inputPeriods.period.start[0]} />
                <label>년</label>
                <input size="2" value={inputPeriods.period.start[1]} />
                <label>월</label>
                <input size="2" value={inputPeriods.period.start[2]} />
                <label>일</label>
              </span>
              <span> - </span>
              <span>
                <input size="4" value={inputPeriods.period.end[0]} />
                <label>년</label>
                <input size="2" value={inputPeriods.period.end[1]} />
                <label>월</label>
                <input size="2" value={inputPeriods.period.end[2]} />
                <label>일</label>
              </span>
            </div>

            <div>
              <label>모집분야</label>
              <label>
                <input type="checkbox" name="category" value="develop" /> 개발
              </label>
              <label>
                <input type="checkbox" name="category" value="design" /> 디자인
              </label>
            </div>

            <div>
              <label>모집인원</label>
              <button id="M" onClick={onChangePeopleNum}>
                -
              </button>
              <span>{peopleNum}</span>
              <button id="P" onClick={onChangePeopleNum}>
                +
              </button>
            </div>

            <div>
              <label>프로젝트 예상 기간</label>
              <span>
                <input size="4" value={inputPeriods.projectPeriod.start[0]} />
                <label>년</label>
                <input size="2" value={inputPeriods.projectPeriod.start[1]} />
                <label>월</label>
                <input size="2" value={inputPeriods.projectPeriod.start[2]} />
                <label>일</label>
              </span>
              <span> - </span>
              <span>
                <input size="4" value={inputPeriods.projectPeriod.end[0]} />
                <label>년</label>
                <input size="2" value={inputPeriods.projectPeriod.end[1]} />
                <label>월</label>
                <input size="2" value={inputPeriods.projectPeriod.start[2]} />
                <label>일</label>
              </span>
              <input
                type="checkbox"
                name="term"
                value="design"
                value={inputPeriods.projectPeriod.yet}
              />
              <label>미정</label>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div>
          <hr />
        </div>

        <div>
          <input
            type="file"
            id="images"
            accept="image/png,image/jpeg"
            value={inputContents.contents.images}
          />
          <input
            type="file"
            id="images"
            accept=".doc, .docx, .xml, .hwp"
            value={inputContents.contents.files}
          />
        </div>

        <div>
          <textarea
            rows="7"
            cols="80"
            id="text"
            value={inputContents.contents.text}
            onChange={onChange}
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
