import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "../Sections/MyPage.css";

function EditLayout(props) {
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
      let body = {
        group: Group,
        email: Email,
        openChating: OpenChating,
      };

      setInfobtn("확인하기");
      setIsEdit(true);
    } else {
      setInfobtn("수정하기");
      setIsEdit(false);
    }
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
          <strong>소속</strong>
          <input
            type="text"
            name="group"
            value={Group}
            placeholder={user.group}
            onChange={onGroupHandler}
          />
          <p />
          <strong>메일</strong>
          <input
            type="text"
            name="email"
            value={Email}
            placeholder={user.email}
            onChange={onEmailHandler}
          />
          <p />
          <strong>오픈채팅</strong>
          <input
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
      ) : (
        <div>
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
      )}
    </div>
  );
}

export default withRouter(EditLayout);
