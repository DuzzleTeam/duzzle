import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function PostWritingPage() {
  const [inputContents, setInputContents] = useState({
    title: "",
    contents: { text: "" },
  });

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
    console.log("handlePostSubmit이 실행은 되었음");
    event.preventDefault();
    console.log("preventDefault가 실행은 되었음");

    const currentPageMenu = document.location.pathname.match(/wezzle|mezzle/);
    console.log("currentPageMenu", currentPageMenu);
    let isWezzle = false;
    if (currentPageMenu[0] === "wezzle") isWezzle = true;

    const body = {
      title: inputContents.title,
      contents: { text: inputContents.contents.text },
      isWezzle: isWezzle,
    };
    console.log(body, "body도 실행은 되었음");

    axios.post(`/api/${currentPageMenu}/write/new`, body).then((res) => {
      if (res.data.createPostSuccess) {
        setInputContents({
          title: "",
          contents: { text: "" },
          isWezzle: false,
        });
      } else {
        alert("게시글 작성에 실패하였습니다.");
      }
    });
  };

  return (
    <div>
      <form onSubmit={handlePostSubmit} method="post">
        <input
          type="text"
          id="title"
          value={inputContents.title}
          onChange={onChange}
        />
        <input
          type="text"
          id="text"
          value={inputContents.contents.text}
          onChange={onChange}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default withRouter(PostWritingPage);
