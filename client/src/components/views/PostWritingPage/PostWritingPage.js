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
  /* post의 제목, 내용, 파일 (공통 항목 - 이미지 제외) */
  // const [inputContents, setInputContents] = useState({
  //   title: "",
  //   contents: { text: "" },
  // });

  // /* 이미지 */
  // const [inputImage, setInputImage] = useState([]);
  // // const [inputImage, setInputImage] = useState(null);

  // /* 모집 인원 */
  // const [inputPeopleNum, setInputPeopleNum] = useState(0);

  // /* 모집분야 */
  // const [inputField, setInputField] = useState({ field: ["", "디자인"] });

  // /* 모집 기간, 프로젝트 예상 기간 */
  // const [inputPeriods, setInputPeriods] = useState({
  //   period: ["", "", "", "", "", ""],
  //   projectPeriod: ["", "", "", "", "", "", "미정"],
  // });

  // /* 업로드 버튼 활성화 및 비활성화 상태 */
  // const [isActive, setIsActive] = useState(false);

  // /* Wezzle인지 Mezzle인지 */
  // const currentPageMenu = document.location.pathname.match(/wezzle|mezzle/);
  // let isWezzle = false;
  // if (currentPageMenu[0] === "wezzle") isWezzle = true;

  // /* 공통 항목 (제목,내용,파일) state 변경 */
  // const onChangeCommon = (e) => {
  //   if (e.target.id === "text") {
  //     setInputContents({
  //       ...inputContents,
  //       contents: { [e.target.id]: e.target.value },
  //     });
  //   } else {
  //     setInputContents({
  //       ...inputContents,
  //       [e.target.id]: e.target.value,
  //     });
  //   }
  // };

  // /* 이미지 미리보기를 위한 */
  // const [images, setImages] = useState([]);
  // // const postImageRef = useRef();
  // const handleImageUpload = (e) => {
  //   const fileArr = e.target.files;
  //   const reader = new FileReader();

  //   setInputImage(fileArr);
  //   let file;

  //   const images = [];
  //   for (let i = 0; i < fileArr.length; i++) {
  //     ((file) => {
  //       let reader = new FileReader();
  //       reader.onload = () => {
  //         console.log(reader.result);
  //         const image = (
  //           <img src={reader.result} key={i} className="postImage" alt="post" />
  //         );

  //         images.push(image);
  //       };
  //       reader.readAsDataURL(file);
  //     })(fileArr[i]);
  //   }
  //   setImages(images);
  // };

  // /* 이미지 업로드를 위한 */
  // const onImageHandler = async () => {
  //   if (inputImage) {
  //     let formData = new FormData();
  //     // let imageUrl = null; //single용

  //     // formData는 개체를 자원하지 않아 차례로 추가해주어야 함
  //     // inputImage.map((file) => formData.append("selectImages", file));
  //     formData.append("selectImages", inputImage);

  //     const imageUrls = [];
  //     const res = await axios.post("/api/uploadposts", {
  //       data: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     res.data.fileNames.forEach((fn) => {
  //       imageUrls.push("/postImages/" + fn.toString());
  //     });
  //     return imageUrls;
  //   }
  //   return [];
  // };

  // /* 기간 state 변경 */
  // const onChangePeriod = (e) => {
  //   if (e.target.id === "period") {
  //     let periodArr = inputPeriods.period;
  //     periodArr[e.target.name] = e.target.value;
  //     setInputPeriods({
  //       ...inputPeriods,
  //       [e.target.id]: periodArr,
  //     });
  //   } else if (parseInt(e.target.name) <= 5) {
  //     let projectPeriodArr = inputPeriods.projectPeriod;
  //     projectPeriodArr[e.target.name] = e.target.value;
  //     projectPeriodArr[6] = "";
  //     setInputPeriods({
  //       ...inputPeriods,
  //       [e.target.id]: projectPeriodArr,
  //     });
  //   } else if (e.target.name === "6") {
  //     let projectPeriodArr = ["", "", "", "", "", "", "미정"];
  //     setInputPeriods({
  //       ...inputPeriods,
  //       [e.target.id]: projectPeriodArr,
  //     });
  //   }
  // };

  // /* 모집분야 state 변경 */
  // const onChangeField = (e) => {
  //   if (parseInt(e.target.id.replace("field", "")) === 0) {
  //     let fieldArr = inputField.field;
  //     fieldArr[0] = fieldArr[0] ? "" : "개발";
  //     setInputField({ field: fieldArr });
  //   } else if (parseInt(e.target.id.replace("field", "")) === 1) {
  //     let fieldArr = inputField.field;
  //     fieldArr[1] = fieldArr[1] ? "" : "디자인";
  //     setInputField({ field: fieldArr });
  //   }
  // };

  // /* 모집 인원 state 변경 */
  // const onChangePeopleNumMinus = (e) => {
  //   e.preventDefault();
  //   if (inputPeopleNum > 0) {
  //     setInputPeopleNum((prev) => prev - 1);
  //   }
  // };
  // const onChangePeopleNumPlus = (e) => {
  //   e.preventDefault();
  //   setInputPeopleNum((prev) => prev + 1);
  // };

  // /* 업로드 버튼 활성화를 위한 (모든 내용이 작성되어 있으면 활성화) */
  // let now = new Date();
  // useEffect(() => {
  //   if (isWezzle) {
  //     // Wezzle일때
  //     let nowDay = Number(
  //       String(now.getFullYear()) +
  //         String(now.getMonth() + 1).padStart(2, "0") +
  //         String(now.getDate()).padStart(2, "0")
  //     );
  //     let startPeriod = Number(
  //       inputPeriods.period[0] +
  //         inputPeriods.period[1].padStart(2, "0") +
  //         inputPeriods.period[2].padStart(2, "0")
  //     );
  //     let endPeriod = Number(
  //       inputPeriods.period[3] +
  //         inputPeriods.period[4].padStart(2, "0") +
  //         inputPeriods.period[5].padStart(2, "0")
  //     );
  //     let startProjectPeriod = Number(
  //       inputPeriods.projectPeriod[0] +
  //         inputPeriods.projectPeriod[1].padStart(2, "0") +
  //         inputPeriods.projectPeriod[2].padStart(2, "0")
  //     );
  //     let endProjectPeriod = Number(
  //       inputPeriods.projectPeriod[3] +
  //         inputPeriods.projectPeriod[4].padStart(2, "0") +
  //         inputPeriods.projectPeriod[5].padStart(2, "0")
  //     );
  //     if (
  //       // 제목, 내용, 모집기간, 모집분야, 모집인원, 프로젝트예상기간에 값이 들어가 있을 경우
  //       String(inputContents.title) !== "" &&
  //       String(inputContents.contents.text) !== "" &&
  //       (inputField.field[0] !== "" || inputField.field[1] !== "") &&
  //       inputPeopleNum > 0 &&
  //       inputPeriods.period.indexOf("") === -1 &&
  //       startPeriod >= nowDay &&
  //       endPeriod >= startPeriod &&
  //       String(startPeriod).length === 8 &&
  //       String(endPeriod).length === 8 &&
  //       (inputPeriods.projectPeriod[6] === "미정" ||
  //         (startProjectPeriod >= nowDay &&
  //           endProjectPeriod >= startProjectPeriod &&
  //           String(startProjectPeriod).length === 8 &&
  //           String(endProjectPeriod).length === 8))
  //     ) {
  //       // isActive가 true -> 버튼 활성화
  //       setIsActive(true);
  //     } else {
  //       // 제목 입력 값 삭제 시 다시 비활성화 (isActive가 false -> 버튼 비활성화)
  //       setIsActive(false);
  //     }
  //   } else {
  //     // Mezzle일때
  //     if (
  //       // 제목과 내용에 값이 들어가 있을 경우
  //       String(inputContents.title) !== "" &&
  //       String(inputContents.contents.text) !== ""
  //     ) {
  //       setIsActive(true);
  //     } else {
  //       setIsActive(false);
  //     }
  //   }
  // }, [inputContents, inputPeopleNum, inputPeriods, inputField]);

  // const history = useHistory();
  // const HandlePostSubmit = async (event) => {
  //   event.preventDefault();
  //   let sortPeriod =
  //     inputPeriods.period[0] +
  //     inputPeriods.period[1].padStart(2, "0") +
  //     inputPeriods.period[2].padStart(2, "0") +
  //     "-" +
  //     inputPeriods.period[3] +
  //     inputPeriods.period[4].padStart(2, "0") +
  //     inputPeriods.period[5].padStart(2, "0");
  //   let sortProjectPeriod = "미정";
  //   if (inputPeriods.projectPeriod[6] !== "미정") {
  //     sortProjectPeriod =
  //       inputPeriods.projectPeriod[0] +
  //       inputPeriods.projectPeriod[1].padStart(2, "0") +
  //       inputPeriods.projectPeriod[2].padStart(2, "0") +
  //       "-" +
  //       inputPeriods.projectPeriod[3] +
  //       inputPeriods.projectPeriod[4].padStart(2, "0") +
  //       inputPeriods.projectPeriod[5].padStart(2, "0");
  //   }

  //   const imageUrlArr = await onImageHandler();

  //   let body = {
  //     title: inputContents.title,
  //     contents: {
  //       text: inputContents.contents.text,
  //       images: imageUrlArr,
  //       files: inputContents.contents.files,
  //     },
  //     isWezzle: isWezzle,
  //   };

  //   if (isWezzle) {
  //     body = {
  //       ...body,
  //       recruit: {
  //         period: sortPeriod,
  //         field: inputField.field,
  //         peopleNum: inputPeopleNum,
  //       },
  //       projectPeriod: sortProjectPeriod,
  //     };
  //   }

  //   axios.post(`/api/${currentPageMenu}/write`, body).then((res) => {
  //     if (res.data.createPostSuccess) {
  //       alert("게시글 작성이 완료되었습니다.");
  //       // 게시글의 생성된 id를 받아 페이지 이동
  //       history.push(`/${currentPageMenu}/post/${res.data.id}`);
  //     } else {
  //       alert("게시글 작성에 실패하였습니다.");
  //     }
  //   });
  // };

  // ////

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

  const onChangeImages = (e) => {
    console.log("files", e.target.files);
    setImages(e.target.files);
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

      console.log("res", res);
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
    console.log(filenames);

    const body = {
      title: title.value,
      contents: {
        text: text.value,
        ...(filenames && { images: filenames }),
      },
      isWezzle: false,
    };
    console.log("body", body);

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
        </section>
      </form>
    </main>
    // <div id="PostWritingPageContainer">
    //   <main className="PostWritingPage">
    //     <div className="FormContentsContainer">
    //       <form method="post" className="FormContainer">
    //         <div className="TopContainer">
    //           <input
    //             type="text"
    //             id="title"
    //             placeholder="제목"
    //             defaultValue={inputContents.title}
    //             onChange={onChangeCommon}
    //             className="WritingInputTitle"
    //           />
    //           {/* isActive가 false일 때 버튼 비활성화(disabled=true) */}
    //           <div className="UploadButtonContainer">
    //             <button
    //               type="submit"
    //               value="submit"
    //               disabled={isActive ? false : true}
    //               className="UploadButton"
    //               onClick={HandlePostSubmit}
    //             >
    //               업로드
    //             </button>
    //           </div>
    //         </div>

    //         <div className="LineContainer">
    //           <hr className="Line" />
    //         </div>

    //         {/* wezzle 일때만 보임 */}
    //         {isWezzle ? (
    //           <div className="IsWezzleContainer">
    //             <div className="Container">
    //               <label className="KeyLable">모집기간</label>
    //               <span className="PeriodOutline">
    //                 <input
    //                   maxLength="4"
    //                   id="period"
    //                   name="0"
    //                   defaultValue={inputPeriods.period[0]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodYear"
    //                 />
    //                 <label>년</label>
    //                 <input
    //                   maxLength="2"
    //                   id="period"
    //                   name="1"
    //                   defaultValue={inputPeriods.period[1]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodMD"
    //                 />
    //                 <label>월</label>
    //                 <input
    //                   maxLength="2"
    //                   id="period"
    //                   name="2"
    //                   defaultValue={inputPeriods.period[2]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodMD"
    //                 />
    //                 <label>일</label>
    //               </span>
    //               <span className="ForSpaceSpan"> - </span>
    //               <span className="PeriodOutline">
    //                 <input
    //                   maxLength="4"
    //                   id="period"
    //                   name="3"
    //                   defaultValue={inputPeriods.period[3]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodYear"
    //                 />
    //                 <label>년</label>
    //                 <input
    //                   maxLength="2"
    //                   id="period"
    //                   name="4"
    //                   defaultValue={inputPeriods.period[4]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodMD"
    //                 />
    //                 <label>월</label>
    //                 <input
    //                   maxLength="2"
    //                   id="period"
    //                   name="5"
    //                   defaultValue={inputPeriods.period[5]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodMD"
    //                 />
    //                 <label>일</label>
    //               </span>
    //             </div>

    //             <div className="Container">
    //               <label className="KeyLable">모집분야</label>

    //               <input
    //                 type="checkbox"
    //                 id="field0"
    //                 name="field"
    //                 checked={inputField.field[0] ? true : false}
    //                 onChange={onChangeField}
    //                 className="PostWirtingCheckbox"
    //               />
    //               <label htmlFor="field0">
    //                 {inputField.field[0] && (
    //                   <img src="/images/checkbox.png" alt="checked" />
    //                 )}
    //               </label>
    //               <label className="ForSpaceLabel">개발</label>

    //               <input
    //                 type="checkbox"
    //                 id="field1"
    //                 name="field"
    //                 checked={inputField.field[1] ? true : false}
    //                 onChange={onChangeField}
    //                 className="PostWirtingCheckbox"
    //               />
    //               <label htmlFor="field1">
    //                 {inputField.field[1] && (
    //                   <img src="/images/checkbox.png" alt="checked" />
    //                 )}
    //               </label>
    //               <label className="ForSpaceLabel">디자인</label>
    //             </div>

    //             <div className="Container">
    //               <label className="KeyLable">모집인원</label>
    //               <span className="PeopleNumOutline">
    //                 <button
    //                   onClick={onChangePeopleNumMinus}
    //                   id="peopleNum"
    //                   className="PeopleNumButton"
    //                 >
    //                   -
    //                 </button>
    //                 <span className="PeopleNumText">{inputPeopleNum}</span>
    //                 <button
    //                   onClick={onChangePeopleNumPlus}
    //                   id="peopleNum"
    //                   className="PeopleNumButton"
    //                 >
    //                   +
    //                 </button>
    //               </span>
    //             </div>

    //             <div className="Container">
    //               <label className="KeyLable">프로젝트 예상 기간</label>
    //               <span className="PeriodOutline">
    //                 <input
    //                   maxLength="4"
    //                   id="projectPeriod"
    //                   name="0"
    //                   defaultValue={inputPeriods.projectPeriod[0]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodYear"
    //                 />
    //                 <label>년</label>
    //                 <input
    //                   maxLength="2"
    //                   id="projectPeriod"
    //                   name="1"
    //                   defaultValue={inputPeriods.projectPeriod[1]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodMD"
    //                 />
    //                 <label>월</label>
    //                 <input
    //                   maxLength="2"
    //                   id="projectPeriod"
    //                   name="2"
    //                   defaultValue={inputPeriods.projectPeriod[2]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodMD"
    //                 />
    //                 <label>일</label>
    //               </span>
    //               <span className="ForSpaceSpan"> - </span>
    //               <span className="PeriodOutline">
    //                 <input
    //                   maxLength="4"
    //                   id="projectPeriod"
    //                   name="3"
    //                   defaultValue={inputPeriods.projectPeriod[3]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodYear"
    //                 />
    //                 <label>년</label>
    //                 <input
    //                   maxLength="2"
    //                   id="projectPeriod"
    //                   name="4"
    //                   defaultValue={inputPeriods.projectPeriod[4]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodMD"
    //                 />
    //                 <label>월</label>
    //                 <input
    //                   maxLength="2"
    //                   id="projectPeriod"
    //                   name="5"
    //                   defaultValue={inputPeriods.projectPeriod[5]}
    //                   onChange={onChangePeriod}
    //                   className="InputPeriodMD"
    //                 />
    //                 <label>일</label>
    //               </span>
    //               <input
    //                 type="checkbox"
    //                 id="projectPeriod"
    //                 name="6"
    //                 checked={inputPeriods.projectPeriod[6] ? true : false}
    //                 onChange={onChangePeriod}
    //                 className="PostWirtingCheckbox"
    //               />
    //               <label htmlFor="6" className="ForSpaceCheckbox"></label>
    //               <label className="ForSpaceLabel">미정</label>
    //             </div>

    //             <div className="LineContainer">
    //               <hr className="Line" />
    //             </div>
    //           </div>
    //         ) : (
    //           <></>
    //         )}

    //         <div className="Container">
    //           <label htmlFor="images" className="ImagesLabel">
    //             <img
    //               src="/images/camera.png"
    //               className="ImagesIcon"
    //               alt="icon"
    //             />
    //             사진 추가
    //           </label>
    //           <input
    //             type="file"
    //             id="images"
    //             multiple
    //             accept="image/png,image/jpeg"
    //             defaultValue={inputContents.contents.images}
    //             className="ImagesButton"
    //             onChange={handleImageUpload}
    //           />
    //         </div>

    //         <div className="Container">
    //           <textarea
    //             rows="7"
    //             cols="80"
    //             id="text"
    //             defaultValue={inputContents.contents.text}
    //             onChange={onChangeCommon}
    //             placeholder={
    //               isWezzle
    //                 ? "프로젝트에 대한 설명과 합류 시 담당하게 될 업무에 대해 자세히 작성해주세요!"
    //                 : "친구들과 나누고 싶은 이야기를 자유롭게 작성해주세요!"
    //             }
    //             className="TextArea"
    //           />
    //         </div>

    //         <div className="Container">
    //           {inputImage &&
    //             [inputImage].map((url, index) => (
    //               <div className="ImageDiv">{images}</div>
    //             ))}
    //         </div>
    //       </form>
    //     </div>
    //   </main>
    // </div>
  );
}

export default withRouter(PostWritingPage);
