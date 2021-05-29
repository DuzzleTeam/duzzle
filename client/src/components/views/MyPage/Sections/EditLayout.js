import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { editUser } from "../../../../_actions/user_action";
import "../Sections/MyPage.css";
// 프로필 이미지 변경되었는지 check
let cnt = 0;

function EditLayout(props) {
  const dispatch = useDispatch();

  // 로그인한 유저 정보
  const [user, setUser] = useState({});
  const reduxUser = useSelector((state) => state.user.authPayload);
  useEffect(() => {
    if (reduxUser !== undefined) {
      setUser(reduxUser);
    }
  }, [reduxUser]);

  // 편집할 때 입력받는 값
  const [form, setValues] = useState("");

  // 04.21 / 수정하기 버튼
  const [isEdit, setIsEdit] = useState(props.isEdit);
  const [Infobtn, setInfobtn] = useState("수정하기");

  // 프로필 이미지
  const [Image, setImage] = useState("");
  // 프로필 이미지 파일명 담을 변수
  let imgName = '';


  // 수정인지에 아닌지에 따라 버튼 이름 변경
  const onEditHandler = () => {
    // input박스에 기존 값 적혀있도록 초기화하는 코드
    setImage(user.profileImage);
    setValues({
      ...form,
      name: user.name,
      field: user.field,
      introduction: user.introduction,
      group: user.group,
      openChating: user.openChating,
    });

    if (Infobtn === "수정하기") {
      setInfobtn("확인하기");
      setIsEdit(true);
    } else {
      onProfileHandler()
      .then(() => {
        let body = {
          profileImage: imgName,
          name: form.name,
          field: form.field,
          introduction: form.introduction,
          group: form.group,
          openChating: form.openChating,
        };
        dispatch(editUser(body)).then((response) => {
          if (response.payload.editSuccess) {
            alert("수정되었습니다!");
            window.location.replace("/users/:email");
          } else {
            alert("수정 오류");
          }
        });
        setInfobtn("수정하기");
        setIsEdit(false);

      });
    }
  };

  // 프로필 사진 변경 (제출 눌렀을 때)
  const onProfileHandler = async () => {
    // Image state가 변경되었을 떄
    if(cnt >= 1) {
      const formData = new FormData();
      formData.append('selectImg', Image);
      // 이미지 서버에 업로드
      const res = await axios.post("/api/upload", formData);
      // 기존 이미지 삭제
      axios.post('/api/delete', user.profileImage);
      // 새로운 이미지 파일 이름 저장
      imgName = "http://localhost:5000/"+(res.data.filename).toString();
    } else {
      imgName = user.profileImage;
    }
    console.log(imgName);
    
  }

  const profileOnChange = (event) => {
    setImage(event.target.files[0]);
    cnt += 1;
  }

  // input 입력
  const updateForm = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      {isEdit ? (
        // 수정화면 일 때
        <div>
          <div className="box">
            <input className="selectImg" type="file" onChange={profileOnChange}/>
            <img className="profileEdit" src="../images/myPage/profileEdit.png" alt="profileEdit"/>
            <img className="profile" src={user.profileImage} alt="profile"/>
          </div>
          <div className="userInfo1">
            <h2>
              <input
                className="name"
                type="text"
                name="name"
                value={form.name}
                onChange={updateForm}
              />
            </h2>
            <font color="gray">
              <input
                className="field"
                type="text"
                name="field"
                value={form.field}
                onChange={updateForm}
              />
            </font>
            <p>
              <textarea
                className="intro"
                name="introduction"
                rows="4"
                cols="30"
                value={form.introduction}
                onChange={updateForm}
              />
            </p>
          </div>
          <hr className="hr" />
          <div className="userInfo2">
          <h2 className="level">Lv.{user.level} 만렙 디자이너</h2>
            <div className="progress">
              <progress value={user.level} max="100"></progress>
            </div>
            <p />
            <div id="editLayout">
              <strong>소속</strong>
              <input
                className="bottom"
                type="text"
                name="group"
                value={form.group}
                onChange={updateForm}
              />
              <p />
              <strong>메일</strong>
              <input
                className="bottom"
                type="text"
                name="email"
                value={user.email}
                disabled
              />
              <p />
              <strong>오픈채팅</strong>
              <input
                className="bottom"
                type="text"
                name="openChating"
                value={form.openChating}
                onChange={updateForm}
              />
              <p />
              <div className="divEdit">
                <button className="edit" onClick={onEditHandler}>
                  {Infobtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 수정화면 아닐 때
        <div>
          <div className="box">
            <img className="profile" src={user.profileImage} alt="profile"/>
          </div>
          <div className="userInfo1">
            <h1>{user.name}</h1>
            <font color="gray">{user.field}</font>
            <p>{user.introduction}</p>
          </div>
          <hr className="hr" />
          <div className="userInfo2">
            <h2 className="level">Lv.{user.level} 만렙 디자이너</h2>
            <div className="progress">
              <progress value={user.level} max="100"></progress>
            </div>
            <p />
            <div id="editLayout">
              <strong>소속</strong>
              <div className="font">{user.group}</div>
              <p />
              <strong>메일</strong>
              <div className="font">{user.email}</div>
              <p />
              <strong>오픈채팅</strong>
              <div className="font">{user.openChating}</div>
              <p />
              <div className="divEdit">
                <button className="edit" onClick={onEditHandler}>
                  {Infobtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(EditLayout);
