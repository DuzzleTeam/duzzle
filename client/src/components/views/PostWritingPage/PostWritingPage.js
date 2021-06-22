import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
// custom hooks
import useInput from "../../../hooks/useInput";

import Loading from "../../Loading/Loading";

import "../../../utils/Common.css";
// import "./Sections/PostWritingPage.css";
import "./Sections/test.css";

function PostWritingPage() {
  // hadam
  const title = useInput("");
  // 본문 내용
  const text = useInput("");

  const [allChecked, setAllChecked] = useState(false);
  useEffect(() => {
    if (title.value !== "" && text.value !== "") {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [title, text]);

  // set textarea height to fit contents
  const setSizeTextarea = (e) => {
    const { target } = e;
    target.style.height = "";
    target.style.height = `${target.scrollHeight}px`;
  };

  // images
  const [images, setImages] = useState(null);
  const [previewImages, setPreviewImages] = useState(null);

  const onChangeImages = (e) => {
    const { files } = e.target;
    setImages(files);

    // preview images
    const previewImages = [];
    for (let i = 0; i < files.length; i++) {
      previewImages.push(URL.createObjectURL(files[i]));
    }
    setPreviewImages(previewImages);
  };

  const onSubmitImages = async () => {
    if (images) {
      const formData = new FormData();
      // 추가
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        formData.append("selectImages", image);
      }

      // request
      const res = await axios.post("/api/uploadposts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // result
      const filenames = [];
      res.data.filenames.forEach((filename) => {
        filenames.push(`/postImages/${filename}`);
      });
      return filenames;
    }
    return null;
  };

  const history = useHistory();

  // loading request
  const [loading, setLoading] = useState(false);

  const buttonSubmitRef = useRef();

  // request
  const onSubmitMezzle = async (e) => {
    e.preventDefault();
    // 요청 한 번만 보내지도록 설정
    buttonSubmitRef.current.disabled = true;

    // start loading
    setLoading(true);

    // image file names (array)
    const filenames = await onSubmitImages();

    const body = {
      title: title.value,
      contents: {
        text: text.value,
        ...(filenames && { images: filenames }),
      },
      isWezzle: false,
    };

    const url = `/api/mezzle/write`;
    const res = await axios.post(url, body);
    if (res.status === 200) {
      const { _id } = res.data.post;
      alert("✍🏻 게시글 작성이 완료되었습니다!");
      history.push(`/mezzle/post/${_id}`);
    }

    // stop loading
    setLoading(false);
  };

  // render
  return (
    <main className={"write-container__main"}>
      {/* loading */}
      {loading && <Loading />}

      <form className="write-form" onSubmit={onSubmitMezzle}>
        {/* 검증 warning 메시지 */}
        {!allChecked && (
          <p className={"write__text--warning"}>
            <img src="/images/warning.png" alt="warning" />
            {"모든 부분을 입력해주셔야 업로드 가능합니다."}
          </p>
        )}

        <section className="write-form__section--title">
          {/* 제목 input */}
          <input type="text" {...title} placeholder={"제목"} maxLength={40} />
          {/* submit button */}
          <button ref={buttonSubmitRef} type="submit" disabled={!allChecked}>
            {"업로드"}
          </button>
        </section>

        <section className="write-form__section--contents">
          {/* 사진 추가 button */}
          <article className="write-form__button--images">
            <label htmlFor="buttonAddImages">
              <img src="/images/camera.png" alt="icon" />
              사진 추가
            </label>
            <input
              type="file"
              id="buttonAddImages"
              multiple
              accept="image/png,image/jpeg"
              onChange={onChangeImages}
            />
          </article>

          {/* 본문 내용 textarea */}
          <textarea
            className={"write-form__textarea"}
            placeholder={"친구들과 나누고 싶은 이야기를 자유롭게 작성해주세요!"}
            {...text}
            onInput={setSizeTextarea}
            cols="80"
          ></textarea>
        </section>

        <section className="write-form__section--images">
          {/* images */}
          {previewImages &&
            previewImages.map((url, index) => (
              <img src={url} key={index} alt={"upload"} />
            ))}
        </section>
      </form>
    </main>
  );
}

export default withRouter(PostWritingPage);
