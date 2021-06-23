import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory, useLocation, withRouter } from "react-router-dom";
// custom hooks
import useInput from "../../../hooks/useInput";

import Loading from "../../Loading/Loading";
import WriteWezzle from "./Sections/WriteWezzle";
import PreviewImages from "../../Preview/PreviewImages";
import ShowImage from "../../Preview/ShowImage";

import "../../../utils/Common.css";
import "./Sections/PostWritingPage.css";

function PostWritingPage() {
  // wezzle or mezzle
  const POST_TYPE = document.location.pathname.match(/mezzle|wezzle/)[0];

  // 제목
  const title = useInput("");
  // 본문 내용
  const text = useInput("");

  // wezzle, 다연
  const [period, setPeriod] = useState(["", "", "", "", "", ""]);
  const [field, setField] = useState([]);
  const [peopleNum, setPeopleNum] = useState(0);
  const [projectPeriod, setProjectPeriod] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "미정",
  ]);
  const wezzle = {
    period,
    setPeriod,
    field,
    setField,
    peopleNum,
    setPeopleNum,
    projectPeriod,
    setProjectPeriod,
  };

  const [allChecked, setAllChecked] = useState(false);
  useEffect(() => {
    if (title.value !== "" && text.value !== "") {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [title, text]);

  // 수정 시
  const getDate = (date, type) => {
    if (type === "yyyy") {
      return date.substring(0, 4);
    } else if (type === "mm") {
      return date.substring(4, 6);
    } else if (type === "dd") {
      return date.substring(6, 8);
    } else {
      return "check type";
    }
  };
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [originalPost, setOriginalPost] = useState(null);
  useEffect(() => {
    if (location.state) {
      const { isEdit, post } = location.state;
      if (isEdit && post) {
        // 원래 포스트 내용으로 셋팅
        title.onChange({ target: { value: post.title } });
        text.onChange({ target: { value: post.contents.text } });

        setOriginalPost(post);
        setIsEdit(isEdit);

        if (post.isWezzle) {
          // set period, project period
          [post.recruit.period, post.projectPeriod].forEach(
            (entirePeriod, index) => {
              const period = [];
              if (index === 0 || !entirePeriod[6] === "미정") {
                entirePeriod.split("-").forEach((yyyymmdd) => {
                  period.push(getDate(yyyymmdd, "yyyy"));
                  period.push(getDate(yyyymmdd, "mm"));
                  period.push(getDate(yyyymmdd, "dd"));
                });
                if (index === 0) {
                  setPeriod(period);
                } else {
                  setProjectPeriod(period);
                }
              }
            }
          );

          // set field
          setField(post.recruit.field);

          // set people num
          setPeopleNum(post.recruit.peopleNum);
        }
      }
    }
  }, [location]);

  /* 업로드 버튼 활성화를 위한 (모든 내용이 작성되어 있으면 활성화) */
  // 다연 위즐
  useEffect(() => {
    if (POST_TYPE === "mezzle") return;

    const now = new Date();
    // Wezzle일때
    const nowDay = Number(
      String(now.getFullYear()) +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0")
    );
    const startPeriod = Number(
      period[0] + period[1].padStart(2, "0") + period[2].padStart(2, "0")
    );
    const endPeriod = Number(
      period[3] + period[4].padStart(2, "0") + period[5].padStart(2, "0")
    );
    let passedProjectPeriod = false;
    if (projectPeriod !== "미정") {
      const startProjectPeriod = Number(
        projectPeriod[0] +
          projectPeriod[1].padStart(2, "0") +
          projectPeriod[2].padStart(2, "0")
      );
      const endProjectPeriod = Number(
        projectPeriod[3] +
          projectPeriod[4].padStart(2, "0") +
          projectPeriod[5].padStart(2, "0")
      );

      passedProjectPeriod =
        startProjectPeriod >= 20210101 &&
        endProjectPeriod >= startProjectPeriod &&
        String(startProjectPeriod).length === 8 &&
        String(endProjectPeriod).length === 8;
    }
    if (
      // 제목, 내용, 모집기간, 모집분야, 모집인원, 프로젝트예상기간에 값이 들어가 있을 경우
      title.value !== "" &&
      text.value !== "" &&
      (field[0] !== "" || field[1] !== "") &&
      peopleNum > 0 &&
      period.indexOf("") === -1 &&
      startPeriod >= 20210101 &&
      endPeriod >= startPeriod &&
      String(startPeriod).length === 8 &&
      String(endPeriod).length === 8 &&
      (projectPeriod[6] === "미정" || passedProjectPeriod)
    ) {
      // isActive가 true -> 버튼 활성화
      setAllChecked(true);
    } else {
      // 제목 입력 값 삭제 시 다시 비활성화 (isActive가 false -> 버튼 비활성화)
      setAllChecked(false);
    }
  }, [POST_TYPE, field, peopleNum, period, projectPeriod, title, text]);

  // set textarea height to fit contents
  const setSizeTextarea = (e) => {
    const { target } = e;
    target.style.height = "";
    target.style.height = `${target.scrollHeight}px`;
  };

  // images
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const onChangeImages = (e) => {
    const { files } = e.target;
    setImages((prev) => [...prev, ...files]);

    // preview images
    const previewImages = [];
    for (let i = 0; i < files.length; i++) {
      previewImages.push(URL.createObjectURL(files[i]));
    }
    setPreviewImages((prev) => [...prev, ...previewImages]);
  };

  const onSubmitImages = async () => {
    if (images.length !== 0) {
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
      if (originalPost) {
        filenames.push(...originalPost.contents.images);
      }
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
  const onSubmit = async (e) => {
    e.preventDefault();
    // 요청 한 번만 보내지도록 설정
    buttonSubmitRef.current.disabled = true;

    // start loading
    setLoading(true);

    // image file names (array)
    const filenames = await onSubmitImages();

    let body = {
      title: title.value,
      contents: {
        text: text.value,
        images: filenames || [],
      },
      isWezzle: false,
    };

    if (POST_TYPE === "wezzle") {
      // 다연 위즐
      const sortPeriod =
        period[0] +
        period[1].padStart(2, "0") +
        period[2].padStart(2, "0") +
        "-" +
        period[3] +
        period[4].padStart(2, "0") +
        period[5].padStart(2, "0");

      let sortProjectPeriod = "미정";
      if (projectPeriod[6] !== "미정") {
        sortProjectPeriod =
          projectPeriod[0] +
          projectPeriod[1].padStart(2, "0") +
          projectPeriod[2].padStart(2, "0") +
          "-" +
          projectPeriod[3] +
          projectPeriod[4].padStart(2, "0") +
          projectPeriod[5].padStart(2, "0");
      }

      body = {
        ...body,
        recruit: {
          period: sortPeriod,
          field: field,
          peopleNum: peopleNum,
        },
        projectPeriod: sortProjectPeriod,
        isWezzle: true,
      };
    }

    if (isEdit) {
      const url = `/api/post/${originalPost._id}`;
      const res = await axios.patch(url, body);
      if (res.status === 200) {
        alert("💚 게시글 수정이 완료되었습니다!");
        history.push(`/${POST_TYPE}/post/${originalPost._id}`);
      }
    } else {
      const url = `/api/${POST_TYPE}/write`;
      const res = await axios.post(url, body);
      if (res.status === 200) {
        const { _id } = res.data.post;
        alert("✍🏻 게시글 작성이 완료되었습니다!");
        history.push(`/${POST_TYPE}/post/${_id}`);
      }
    }

    // stop loading
    setLoading(false);
  };

  // show image modal
  const [showImage, setShowImage] = useState("");

  // remove image
  const onRemoveImage = (index) => {
    // remove preview
    const removedPreview = previewImages.slice();
    removedPreview.splice(index, 1);
    setPreviewImages(removedPreview);

    // remove input filelist
    const removedImages = images.slice();
    removedImages.splice(index, 1);
    setImages(removedImages);
  };

  // render
  return (
    <main className={"write-container__main"}>
      {/* loading */}
      {loading && <Loading />}

      <form className="write-form" onSubmit={onSubmit}>
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

        {POST_TYPE === "wezzle" && <WriteWezzle {...wezzle} />}

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
            placeholder={
              POST_TYPE === "mezzle"
                ? "친구들과 나누고 싶은 이야기를 자유롭게 작성해주세요!"
                : "프로젝트에 대한 설명과 합류 시 담당하게 될 업무에 대해 자세히 작성해주세요!"
            }
            {...text}
            onInput={setSizeTextarea}
            style={{
              ...(location.state && {
                height: Math.ceil(text.value.length / 50) * 30,
              }),
            }}
            cols="80"
          ></textarea>
        </section>

        {/* original images */}
        {originalPost && (
          <PreviewImages
            images={originalPost.contents.images}
            setShowImage={setShowImage}
          />
        )}

        {/* images */}
        {previewImages && (
          <section className="write-form__section--images">
            {previewImages.map((img, index) => (
              <button
                key={index}
                className={"image-preview__button--show"}
                onClick={(e) => {
                  e.preventDefault();
                  setShowImage(img);
                }}
              >
                <button
                  className={"image-preview__button--cancel"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemoveImage(index);
                  }}
                >
                  <img src="/images/image_cancel.png" alt="cancel" />
                </button>
                <img
                  className={"write-form__image--preview"}
                  src={img}
                  alt={"upload"}
                />
              </button>
            ))}
          </section>
        )}

        {/* 이미지 모달 */}
        {showImage !== "" && (
          <ShowImage src={showImage} setShowImage={setShowImage} />
        )}
      </form>
    </main>
  );
}

export default withRouter(PostWritingPage);
