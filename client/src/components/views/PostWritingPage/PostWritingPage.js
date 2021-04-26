import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function PostWritingPage() {
  const [inputContents, setInputContents] = useState({
    title: "",
    contents: { text: "" },
  });

  const [peopleNum, setPeopleNum] = useState(0);

  const currentPageMenu = document.location.pathname.match(/wezzle|mezzle/);
  let isWezzle = false;
  if (currentPageMenu[0] === "wezzle") isWezzle = true;

  const onChange = (e) => {
    if (e.target.id === "text") {
      setInputContents({
        ...inputContents,
        contents: { [e.target.id]: e.target.value },
      });
    } else {
      setInputContents({
        ...inputContents,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const body = {
      title: inputContents.title,
      contents: { text: inputContents.contents.text },
      isWezzle: isWezzle,
      peopleNum: peopleNum,
    };

    axios.post(`/api/${currentPageMenu}/write`, body).then((res) => {
      if (res.data.createPostSuccess) {
        setInputContents({
          title: "",
          contents: { text: "" },
          isWezzle: false,
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
          <button type="submit" value="submit">
            업로드
          </button>
        </div>

        {/* wezzle 일때만 보임 */}
        {isWezzle ? (
          <div>
            <div>
              <label>모집기간</label>
              <span>
                <input size="4" />
                <label>년</label>
                <input size="2" />
                <label>월</label>
                <input size="2" />
                <label>일</label>
              </span>
              <span> - </span>
              <span>
                <input size="4" />
                <label>년</label>
                <input size="2" />
                <label>월</label>
                <input size="2" />
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
              <button
                id="peopleNumM"
                onClick={() => setPeopleNum(peopleNum - 1)}
              >
                -
              </button>
              <span>{peopleNum}</span>
              <button
                id="peopleNumP"
                onClick={() => setPeopleNum(peopleNum + 1)}
              >
                +
              </button>
            </div>

            <div>
              <label>프로젝트 예상 기간</label>
              <span>
                <input size="4" />
                <label>년</label>
                <input size="2" />
                <label>월</label>
                <input size="2" />
                <label>일</label>
              </span>
              <span> - </span>
              <span>
                <input size="4" />
                <label>년</label>
                <input size="2" />
                <label>월</label>
                <input size="2" />
                <label>일</label>
              </span>
              <input type="checkbox" name="term" value="design" />
              <label>미정</label>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div>
          <input type="file" id="images" accept="image/png,image/jpeg" />
          <input type="file" id="images" accept=".doc, .docx, .xml, .hwp" />
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
