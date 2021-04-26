import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { editUser } from "../../../../_actions/user_action";
import "../Sections/MyPage.css";

function EditLayout(props) {
  const dispatch = useDispatch();

  const [Introduction, setIntroduction] = useState("");
  const [Field, setField] = useState("");
  const [Name, setName] = useState("");
  const [Group, setGroup] = useState("");
  const [Email, setEmail] = useState("");
  const [OpenChating, setOpenChating] = useState("");

  // 로그인한 유저 정보
  const [user, setUser] = useState({});
  const reduxUser = useSelector((state) => state.user.authPayload);
  useEffect(() => {
    if (reduxUser !== undefined) {
      setUser(reduxUser);
    }
  }, [reduxUser]);

  // 04.21 / 수정하기 버튼
  const [isEdit, setIsEdit] = useState(props.isEdit);
  const [Infobtn, setInfobtn] = useState("수정하기");

  // 수정인지에 아닌지에 따라 버튼 이름 변경
  const onEditHandler = () => {
    if (Infobtn == "수정하기") {
      // let body = {
      //   group: Group,
      //   email: Email,
      //   openChating: OpenChating,
      // };
      // dispatch(editUser(body)).then((response) => {
      //   if (response.payload.editSuccess) {
      //     alert("수정되었습니다!");
      //   } else {
      //     alert("수정 오류");
      //   }
      // });

      setInfobtn("확인하기");
      setIsEdit(true);
    } else {
      setInfobtn("수정하기");
      setIsEdit(false);
    }
  };

  const onIntroHandler = (event) => {
    setIntroduction(event.currentTarget.value);
  };
  const onFieldHandler = (event) => {
    setField(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onGroupHandler = (event) => {
    setGroup(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onOpenChatingHandler = (event) => {
    setOpenChating(event.currentTarget.value);
  };

  return (
    <div>
      {isEdit ? (
        <div>
          <div className="box">
            <img className="profile" src="../images/profile-image.jpg" />
          </div>
          <div className="userInfo1">
            <h1>
              <input
                className="name"
                type="text"
                name="name"
                value={Name}
                placeholder={user.name}
                onChange={onNameHandler}
              />
            </h1>
            <font color="gray">
              <input
                className="field"
                type="text"
                name="field"
                value={Field}
                placeholder={user.field}
                onChange={onFieldHandler}
              />
            </font>
            <p>
              <textarea
                className="intro"
                name="introduction"
                rows="5"
                cols="30"
                value={Introduction}
                placeholder={user.introduction}
                onChange={onIntroHandler}
              />
            </p>
          </div>
          <hr className="hr" />
          <div className="userInfo2">
            <h2 className="level">Lv.3{/*{user.level}*/} 만렙 디자이너</h2>
            <div className="progress3">
              <progress value="50" max="100"></progress>
            </div>
            <p />
            <div id="editLayout">
              <strong>소속</strong>
              <input
                className="bottom"
                type="text"
                name="group"
                value={Group}
                placeholder={user.group}
                onChange={onGroupHandler}
              />
              <p />
              <strong>메일</strong>
              <input
                className="bottom"
                type="text"
                name="email"
                value={Email}
                placeholder={user.email}
                onChange={onEmailHandler}
              />
              <p />
              <strong>오픈채팅</strong>
              <input
                className="bottom"
                type="text"
                name="chating"
                value={OpenChating}
                placeholder={user.openChating}
                onChange={onOpenChatingHandler}
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
        <div>
          <div className="box">
            <img className="profile" src="../images/profile-image.jpg" />
          </div>
          <div className="userInfo1">
            <h1>{user.name}</h1>
            <font color="gray">{/*{user.field}*/}UI/UX</font>
            <p>{/*{user.introduction}*/}안녕하세요~</p>
          </div>
          <hr className="hr" />
          <div className="userInfo2">
            <h2 className="level">Lv.3{/*{user.level}*/} 만렙 디자이너</h2>
            <div className="progress3">
              <progress value="50" max="100"></progress>
            </div>
            <p />
            <div id="editLayout">
              <strong>소속</strong> <div className="font">{user.group}</div>
              <p />
              <strong>메일</strong>
              <div className="font">{user.email}</div>
              <p />
              <strong>오픈채팅</strong>{" "}
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
