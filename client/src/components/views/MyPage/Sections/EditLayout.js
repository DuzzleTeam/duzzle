import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { editUser } from "../../../../_actions/user_action";
import "../Sections/MyPage.css";

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
  const [form, setValues] = useState({
    name: user.name,
    field: user.field,
    introduction: user.introduction,
    group: user.group,
    email: user.email,
    openChating: user.openChating,
  });

  // 04.21 / 수정하기 버튼
  const [isEdit, setIsEdit] = useState(props.isEdit);
  const [Infobtn, setInfobtn] = useState("수정하기");

  // 수정인지에 아닌지에 따라 버튼 이름 변경
  const onEditHandler = () => {
    if (Infobtn === "수정하기") {
      setInfobtn("확인하기");
      setIsEdit(true);
    } else {
      let body = {
        name: form.name,
        field: form.field,
        introduction: form.introduction,
        group: form.group,
        email: form.email,
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
    }
  };

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
            <img className="profile" src="../images/profile-image.jpg" alt="profile"/>
          </div>
          <div className="userInfo1">
            <h2>
              <input
                className="name"
                type="text"
                name="name"
                value={form.name}
                placeholder={user.name}
                onChange={updateForm}
              />
            </h2>
            <font color="gray">
              <input
                className="field"
                type="text"
                name="field"
                value={form.field}
                placeholder={user.field}
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
                placeholder={user.introduction}
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
                placeholder={user.group}
                onChange={updateForm}
              />
              <p />
              <strong>메일</strong>
              <input
                className="bottom"
                type="text"
                name="email"
                value={form.email}
                placeholder={user.email}
                onChange={updateForm}
              />
              <p />
              <strong>오픈채팅</strong>
              <input
                className="bottom"
                type="text"
                name="openChating"
                value={form.openChating}
                placeholder={user.openChating}
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
            <img className="profile" src="../images/profile-image.jpg" alt="profile"/>
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
