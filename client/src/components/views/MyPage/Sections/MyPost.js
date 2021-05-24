import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

function MyPost(props) {
    const [isPost, setIsPost] = useState(props.isPost);

    // 로그인한 유저 정보
    const [user, setUser] = useState({});
    const reduxUser = useSelector((state) => state.user.authPayload);
    useEffect(() => {
        if (reduxUser !== undefined) {
        setUser(reduxUser);
        }
    }, [reduxUser]);

    const onApplyHandler = (event) => {
        setIsPost(false)
    }
    const onPostHandler = (event) => {
        setIsPost(true)
        console.log(isPost)
    }

    const defaultBtn = {
        width: '90px', 
        height: '40px', 
        marginLeft: '1%', 
        marginTop: '2%', 
        border: '2px solid black', 
        cursor: 'pointer',
        borderRadius: '1000px',
        backgroundColor: 'white',
        color: '#ddd',
        borderColor: '#ddd'
    }
    const selectBtn = {
        backgroundColor: 'black', 
        color: 'white', 
        borderRadius: '1000px', 
        borderColor: '#ddd', 
        width: '90px', 
        height: '40px', 
        marginLeft: '1%', 
        marginTop: '2%', 
        border: '2px solid black', 
        cursor: 'pointer'
    }

    return (
        <div>
            {isPost ? (
                // 내 게시물 버튼 눌렸을 때
                <div>
                    <button className="btn apply" style={defaultBtn} onClick={onApplyHandler}>
                        <strong>지원목록</strong>
                    </button>
                    <button className="btn post" style={selectBtn} onClick={onPostHandler}>
                        <strong>내 게시물</strong>
                    </button>
                </div>
            ) : (
                // 지원목록 버튼 눌렸을 때
                <div>
                    <button className="btn apply" style={selectBtn} onClick={onApplyHandler}>
                        <strong>지원목록</strong>
                    </button>
                    <button className="btn post" style={defaultBtn} onClick={onPostHandler}>
                        <strong>내 게시물</strong>
                    </button>
                </div>
            )}
        </div>
    );
}

export default withRouter(MyPost);